import path from "path";
import simpleGit from "simple-git";
import _ from "lodash";

export interface Severity {
    name: string;
    value: "patch" | "minor" | "major";
    apply: (version: string) => string;
}

export interface Kind {
    name: string;
    preRelease: boolean;
    value: "latest" | "beta" | "dev"; // Version pre-id (except latest)
    tag: "latest" | "next" | "dev"; // Release channel
    disabled: boolean;
}

export interface Params {
    keepPreRelease: boolean;
    severity: Severity["value"];
    kind: Kind["value"];
    confirm: boolean;
}

// Path of script relative to the compiled scripts
export const DIR = path.resolve(__dirname, "..");

export const severities: { [name in Severity["value"]]: Severity } = {
    patch: {
        name: "Patch",
        value: "patch",
        apply: (version: string) => {
            const [M, m, p] = version.split(".");
            return `${M}.${m}.${Number(p) + 1}`;
        },
    },
    minor: {
        name: "Minor",
        value: "minor",
        apply: (version: string) => {
            const [M, m] = version.split(".");
            return `${M}.${Number(m) + 1}.0`;
        },
    },
    major: {
        name: "Major",
        value: "major",
        apply: (version: string) => {
            const [M] = version.split(".");
            return `${Number(M) + 1}.0.0`;
        },
    },
};

export const getKinds = async (): Promise<
    { [name in Kind["value"]]: Kind }
> => {
    const git = simpleGit();
    const branch = await git.branch();

    return {
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
};

export const parseVersionKind = (
    version: string,
    availableKinds: { [key: string]: Kind }
): { kind: Kind; build: number } | null => {
    const dashIndex = version.indexOf("-");
    if (dashIndex == -1) return null;

    const [k, n] = version.substring(dashIndex + 1).split(".");
    const kind = availableKinds[k as Kind["value"]];

    if (!kind) throw new Error(`Unsupported version kind: ${k}`);

    return {
        kind,
        build: Number(n),
    };
};
