import yargs from "yargs";
import inquirer from "inquirer";
import path from "path";
import {
    DIR,
    severities,
    Params,
    Kind,
    getKinds,
    parseVersionKind,
} from "./config";
import simpleGit from "simple-git";
import _ from "lodash";
import Choice from "inquirer/lib/objects/choice";
import { execSync } from "child_process";

const main = async () => {
    const git = simpleGit();
    const branch = await git.branch();

    const pkg = require(path.resolve(DIR, "../package.json"));
    const version: string = pkg.version;
    const isPreRelease = version.indexOf("-") != -1;
    const mainVersion: string = isPreRelease
        ? version.substring(0, version.indexOf("-"))
        : version;

    const kinds = await getKinds();

    const argv = yargs
        .option("keepPreRelease", {
            alias: "p",
            boolean: true,
            description:
                "If the current version is detected as a pre-release, specify if the build number should be bumped. If it is a pre-release and this is set to true, all other questions (except confirmation) are bypassed.",
        })
        .option("severity", {
            alias: "s",
            choices: _.map(severities, (s) => s.value),
            description: "The severity of the new version.",
        })
        .option("kind", {
            alias: "k",
            choices: _.map(kinds, (k) => k.value),
            description: "The kind of the release.",
        })
        .option("yes", {
            alias: "y",
            boolean: true,
            description: "If set to true, confirms the changes without asking.",
        })
        .option("dry", {
            alias: "d",
            boolean: true,
            description: "Runs the command without executing 'npm version'",
            default: false,
        })
        .help().argv;

    const getNextVersion = (params: Params) => {
        if (isPreRelease && params.keepPreRelease) {
            const parsedKind = parseVersionKind(version, kinds);
            if (!parsedKind) throw new Error("Version is not in pre-release");

            const { kind, build } = parsedKind;
            return `${mainVersion}-${kind}.${Number(build) + 1}`;
        }

        const severity = severities[params.severity];
        const kind = kinds[params.kind];

        return `${severity.apply(mainVersion)}${
            kind.preRelease ? `-${kind.value}.0` : ""
        }`;
    };

    let params: Partial<Params> = {
        keepPreRelease: argv.keepPreRelease,
        severity: argv.severity,
        kind: argv.kind,
        confirm: argv.yes,
    };

    console.info(`Nuclui v${version}\nOn branch ${branch.current}\n`);

    const answers = await inquirer.prompt<Params>([
        {
            name: "keepPreRelease",
            message: `The package is currently in pre-release version ${version}. Do you wish to keep this version and increment the build number?`,
            type: "confirm",
            when: isPreRelease && !_.isBoolean(params.keepPreRelease),
        },
        {
            name: "severity",
            message: "What is the severity of the version?",
            type: "list",
            when: (ans) =>
                !ans.keepPreRelease &&
                (!params.severity || !severities[params.severity]),
            choices: _.map(
                severities,
                (s): Partial<Choice> => ({
                    name: s.name,
                    value: s.value,
                })
            ),
        },
        {
            name: "kind",
            message: "What is the kind of this version?",
            type: "list",
            when: (ans) =>
                !ans.keepPreRelease &&
                (!params.kind ||
                    !kinds[params.kind] ||
                    kinds[params.kind].disabled),
            choices: _.map(
                kinds,
                (k): Partial<Choice> => ({
                    name: `${k.name} (@${k.tag})`,
                    value: k.value,
                    disabled: k.disabled,
                })
            ),
        },
        {
            name: "confirm",
            message: (ans) => {
                const nextVersion = getNextVersion({ ...params, ...ans });
                return `v${nextVersion} -> Is this correct?`;
            },
            when: !params.confirm,
            type: "confirm",
        },
    ]);

    params = { ...params, ...answers };

    if (!params.confirm) return;

    const next = getNextVersion(params as Params);
    const command = `npm version ${next}`;

    if (argv.dry) {
        console.info(`${version} -> ${next}`);
        console.info(command);
    } else {
        execSync(command);
    }
};

// Can't use TS top-level await as target is 'es5'
main();
