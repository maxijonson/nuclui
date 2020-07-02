import path from "path";
import simpleGit from "simple-git";
import _ from "lodash";

export interface Severity {
    /** Unique ID */
    id: string;
    /** Display name */
    name: string;
    /** Given a version, the next version of the package */
    getNextVersion: (version: string) => string;
    /** Given a version, if the severity can be chosen */
    disabled?: (version: string) => boolean;
}

export interface Version {
    /** Unique ID */
    id: string;
    /** Display name */
    name: string;
    /** NPM release channel (--tag of "npm version") */
    channel: string;
    /** Version Regex pattern */
    pattern: RegExp;
    /** Which branch is allowed to make this version */
    branch: RegExp;
    /** Available severities for this version */
    severities: { [name: string]: Severity };
    /** If true, no git tag should be made for this version */
    noGitTag?: boolean;
    /** Given a version, if the version can be chosen */
    disabled?: (version: string) => boolean;
}

export const versions: { [name: string]: Version } = {
    latest: {
        id: "latest",
        name: "Latest",
        channel: "latest",
        branch: /^master$/,
        pattern: /^[0-9]+\.[0-9]+\.[0-9]+$/,
        severities: {
            release: {
                id: "release",
                name: "Release",
                getNextVersion: (v) => v.substring(0, v.indexOf("-")),
                disabled: (v) => v.indexOf("-") == -1,
            },
            patch: {
                id: "patch",
                name: "Patch",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M, m, p] = version.split(".");
                    return `${M}.${m}.${Number(p) + 1}`;
                },
            },
            minor: {
                id: "minor",
                name: "Minor",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M, m] = version.split(".");
                    return `${M}.${Number(m) + 1}.0`;
                },
            },
            major: {
                id: "major",
                name: "Major",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M] = version.split(".");
                    return `${Number(M) + 1}.0.0`;
                },
            },
        },
    },
    beta: {
        id: "beta",
        name: "Beta",
        channel: "next",
        branch: /^develop$/,
        pattern: /^[0-9]+\.[0-9]+\.[0-9]+-beta\.[0-9]+$/,
        severities: {
            beta: {
                id: "beta",
                name: "Beta",
                getNextVersion: (v) => {
                    // Already a beta. bump build
                    if (/^[0-9]+\.[0-9]+\.[0-9]+-beta\.[0-9]+$/.test(v)) {
                        return (
                            v.substring(0, v.lastIndexOf(".") + 1) +
                            (Number(v.substring(v.lastIndexOf(".") + 1)) + 1)
                        );
                    }
                    // Convert version to beta
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));
                    return `${version}-beta.0`;
                },
                disabled: (v) => v.indexOf("-") == -1,
            },
            patch: {
                id: "patch",
                name: "Patch",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M, m, p] = version.split(".");
                    return `${M}.${m}.${Number(p) + 1}-beta.0`;
                },
            },
            minor: {
                id: "minor",
                name: "Minor",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M, m] = version.split(".");
                    return `${M}.${Number(m) + 1}.0-beta.0`;
                },
            },
            major: {
                id: "major",
                name: "Major",
                getNextVersion: (v) => {
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));

                    const [M] = version.split(".");
                    return `${Number(M) + 1}.0.0-beta.0`;
                },
            },
        },
    },
    dev: {
        id: "dev",
        name: "Dev",
        branch: /^((?!^master$)(?!^develop$).)*$/,
        channel: "dev",
        noGitTag: true,
        pattern: /^[0-9]+\.[0-9]+\.[0-9]+-dev[0-9]+\.[0-9]+$/,
        severities: {
            dev: {
                id: "dev",
                name: "Dev",
                getNextVersion: (v) => {
                    // Already a dev. bump build
                    if (/^[0-9]+\.[0-9]+\.[0-9]+-dev[0-9]+\.[0-9]+$/.test(v)) {
                        return (
                            v.substring(0, v.lastIndexOf(".") + 1) +
                            (Number(v.substring(v.lastIndexOf(".") + 1)) + 1)
                        );
                    }
                    // Convert version to dev
                    const version =
                        v.indexOf("-") == -1
                            ? v
                            : v.substring(0, v.indexOf("-"));
                    return `${version}-dev${Date.now()}.0`;
                },
            },
        },
    },
};

// Path of script relative to the compiled scripts
export const DIR = path.resolve(__dirname, "..");
