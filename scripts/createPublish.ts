import path from "path";
import { DIR, getKinds, parseVersionKind } from "./config";
import yargs from "yargs";
import { execSync } from "child_process";

const main = async () => {
    const pkg = require(path.resolve(DIR, "../package.json"));
    const version: string = pkg.version;
    const kinds = await getKinds();
    const parsedKind = parseVersionKind(version, kinds);

    const argv = yargs
        .option("dry", {
            alias: "d",
            boolean: true,
            description: "Runs the command without executing 'npm publish'",
        })
        .help().argv;

    const command = `npm publish --tag ${
        parsedKind ? `${parsedKind.kind.tag}` : "latest"
    } ${argv.dry ? "--dry-run" : ""}`;

    console.info(`[INFO] ${command}`);
    execSync(command);
};

main();
