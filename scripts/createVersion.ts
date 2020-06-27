import yargs from "yargs";
import inquirer from "inquirer";
import path from "path";
import { DIR } from "./config";
import simpleGit from "simple-git";
import _ from "lodash";
import Choice from "inquirer/lib/objects/choice";
import { execSync } from "child_process";

interface Severity {
    name: string;
    value: "patch" | "minor" | "major";
    apply: () => string;
}

interface Kind {
    name: string;
    preRelease: boolean;
    value: "latest" | "beta" | "dev"; // Version pre-id (except latest)
    tag: "latest" | "next" | "dev"; // Release channel
    disabled: boolean;
}

interface Params {
    keepPreRelease: boolean;
    severity: Severity["value"];
    kind: Kind["value"];
    confirm: boolean;
}

const main = async () => {
    const git = simpleGit();
    const branch = await git.branch();

    const pkg = require(path.resolve(DIR, "../package.json"));
    const version: string = pkg.version;
    const isPreRelease = version.indexOf("-") != -1;
    const mainVersion: string = isPreRelease
        ? version.substring(0, version.indexOf("-"))
        : version;
    const [M, m, p] = mainVersion.split("."); // [Major, minor, patch]

    const severities: { [name in Severity["value"]]: Severity } = {
        patch: {
            name: "Patch",
            value: "patch",
            apply: () => `${M}.${m}.${Number(p) + 1}`,
        },
        minor: {
            name: "Minor",
            value: "minor",
            apply: () => `${M}.${Number(m) + 1}.0`,
        },
        major: {
            name: "Major",
            value: "major",
            apply: () => `${Number(M) + 1}.0.0`,
        },
    };

    const kinds: { [name in Kind["value"]]: Kind } = {
        latest: {
            name: "Latest",
            value: "latest",
            tag: "latest",
            preRelease: false,
            disabled: branch.current != "master",
        },
        beta: {
            name: "Next",
            value: "beta",
            tag: "next",
            preRelease: true,
            disabled: branch.current != "develop",
        },
        dev: {
            name: "Dev",
            value: "dev",
            tag: "dev",
            preRelease: true,
            disabled: _.includes(["master", "develop"], branch.current),
        },
    };

    const argv = yargs
        .option("keepPreRelease", {
            alias: "preserve",
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
        .help().argv;

    const getNextVersion = (params: Params) => {
        if (isPreRelease && params.keepPreRelease) {
            const [kind, n] = version
                .substring(version.indexOf("-") + 1)
                .split(".");

            return `${mainVersion}-${kind}.${Number(n) + 1}`;
        }

        const severity = severities[params.severity];
        const kind = kinds[params.kind];

        return `${severity.apply()}${
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
                    name: k.name,
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

    execSync(`npm version ${getNextVersion(params as Params)}`);
};

// Can't use TS top-level await as target is 'es5'
main();
