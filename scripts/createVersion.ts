import yargs from "yargs";
import inquirer from "inquirer";
import path from "path";
import { DIR, versions, Version } from "./config";
import simpleGit from "simple-git";
import _ from "lodash";
import Choice from "inquirer/lib/objects/choice";
import { execSync } from "child_process";

export interface Params {
    version: Version["id"];
    severity: Version["severities"][0]["id"];
    confirm: boolean;
}

const main = async () => {
    const branch = (await simpleGit().branch()).current;
    const currentVersion: string = require(path.resolve(
        DIR,
        "../package.json"
    )).version;

    const argv = await yargs
        .version(false)
        .option("version", {
            alias: "v",
            describe: "Version kind of the bump",
            type: "string",
        })
        .option("severity", {
            alias: "s",
            describe: "The severity of the bump",
            type: "string",
        })
        .option("dry", {
            alias: "d",
            describe: "Run without npm version",
            type: "boolean",
        })
        .check((args) => {
            if (args.version) {
                const version = versions[args.version];

                if (!version) {
                    throw new Error(
                        `Invalid version: ${
                            args.version
                        }. Valid versions are: ${_.map(
                            versions,
                            (v) => v.id
                        ).join(", ")}`
                    );
                }
                if (!version.branch.test(branch)) {
                    throw new Error(
                        `Branch ${branch} is not allowed to create the version kind: ${args.version}`
                    );
                }
                if (version.disabled && version.disabled(currentVersion)) {
                    throw new Error(
                        `${args.version} is disabled for version: ${currentVersion}`
                    );
                }
            }

            if (args.severity) {
                if (!args.version) {
                    throw new Error(
                        `Cannot specify a severity without a version`
                    );
                }
                const severity =
                    versions[args.version].severities[args.severity];

                if (!severity) {
                    throw new Error(
                        `Invalid severity for version ${args.version}: ${
                            args.severity
                        }. Valid severities are: ${_.map(
                            versions[args.version].severities,
                            (s) => s.id
                        ).join(", ")}`
                    );
                }
                if (severity.disabled && severity.disabled(currentVersion)) {
                    throw new Error(
                        `Severity ${severity.name.toLowerCase()} is disabled for version: ${currentVersion}`
                    );
                }
            }

            return true;
        })
        .help().argv;

    const answers = await inquirer.prompt<Params>([
        {
            name: "version",
            message: "What kind of version is this?",
            type: "list",
            choices: _.map(versions, (v) => ({
                name: v.name,
                value: v.id,
                disabled:
                    !branch.match(v.branch) ||
                    (v.disabled ? v.disabled(currentVersion) : false),
            })),
            when: !argv.version,
        },
        {
            name: "severity",
            message: "What is the severity of the version?",
            type: "list",
            choices: (a) => {
                const version = argv.version ?? a.version;
                return _.map(versions[version].severities, (s) => {
                    const disabled = s.disabled
                        ? s.disabled(currentVersion)
                        : false;
                    return {
                        name: `${s.name} ${
                            disabled
                                ? ""
                                : `(${s.getNextVersion(currentVersion)})`
                        }`.trim(),
                        value: s.id,
                        disabled,
                    };
                });
            },
            when: !argv.severity,
        },
        {
            name: "confirm",
            message: (ans) => {
                const version = argv.version ?? ans.version;
                const severity = argv.severity ?? ans.severity;
                const next =
                    versions[version].severities[severity].getNextVersion(
                        currentVersion
                    );
                return `Is this correct? ${currentVersion} -> ${next}`;
            },
            type: "confirm",
            when: !argv.version || !argv.severity,
        },
    ]);

    if ((!argv.version || !argv.severity) && !answers.confirm) return;

    const version = versions[argv.version ?? answers.version];
    const severity = version.severities[argv.severity ?? answers.severity];
    const next = severity.getNextVersion(currentVersion);
    const command = `npm version ${next} ${
        version.noGitTag ? "--no-git-tag-version" : ""
    }`.trim();

    if (argv.dry) {
        console.info(`${currentVersion} -> ${next}`);
        console.info(command);
    } else {
        console.info(`[INFO] ${command}`);
        execSync(command);
    }
};

// Can't use TS top-level await as target is 'es5'
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
