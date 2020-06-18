/**
 * Removes dependencies before publishing that are only used for docs, so they are not included in the final npm package
 */

const path = require("path");
const fs = require("fs");

const PKG_PATH = path.resolve(__dirname, "../package.json");
const PKG_RESTORE_PATH = path.resolve(__dirname, "package.restore.json");
const pkg = require(PKG_PATH);

// Create a restore file of package.json
fs.copyFileSync(PKG_PATH, PKG_RESTORE_PATH);

const deps = ["express", "express-sslify", "ts-node"];

for (dep of deps) {
    delete pkg.dependencies[dep];
}

fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, undefined, 2));
