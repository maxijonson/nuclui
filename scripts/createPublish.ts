import path from "path";
import _ from "lodash";
import { DIR, versions } from "./config";
import yargs from "yargs";
import { execSync } from "child_process";
import simpleGit from "simple-git";

const main = async () => {
    const currentVersion: string = require(path.resolve(DIR, "../package.json"))
        .version;
    const branch = (await simpleGit().branch()).current;
    const version = (() => {
        const matches = _.filter(versions, (v) =>
            v.pattern.test(currentVersion)
        );

        if (matches.length == 0) {
            throw new Error(`Found no matching versions for ${currentVersion}`);
        }
        if (matches.length > 1) {
            throw new Error(
                `Found more than 1 matching versions for ${currentVersion}`
            );
        }

        return matches[0];
    })();

    if (!version.branch.test(branch) && branch != `v${currentVersion}`) {
        throw new Error(
            `The current branch (${branch}) is not allowed to execute a publish for a ${version.name.toLowerCase()} version. Switch to an eligible branch to publish the version`
        );
    }

    const argv = yargs
        .option("dry", {
            alias: "d",
            boolean: true,
            description: "Runs the command without executing 'npm publish'",
        })
        .help().argv;

    const command = `npm publish --tag ${version.channel} ${
        argv.dry ? "--dry-run" : ""
    }`;

    console.info(`[INFO] ${command}`);
    execSync(command);
};

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
