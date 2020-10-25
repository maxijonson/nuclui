/**
 * Removes dependencies before publishing that are only used for docs, so they are not included in the final npm package
 */

import path from "path";
import fs from "fs";
import { DIR } from "./config";

const PKG_PATH = path.resolve(DIR, "../package.json");
const PKG_RESTORE_PATH = path.resolve(DIR, "package.restore.json");
const pkg = require(PKG_PATH);

// Create a restore file of package.json
fs.copyFileSync(PKG_PATH, PKG_RESTORE_PATH);

const deps = ["express", "express-sslify", "ts-node", "react-router-dom"];

deps.forEach((dep) => delete pkg.dependencies[dep]);

fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, undefined, 2));
