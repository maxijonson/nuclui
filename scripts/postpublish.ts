/**
 * Restores dependencies that were removed during prepublish
 */
import path from "path";
import fs from "fs";
import { DIR } from "./config";

const PKG_PATH = path.resolve(DIR, "../package.json");
const PKG_RESTORE_PATH = path.resolve(DIR, "package.restore.json");

fs.copyFileSync(PKG_RESTORE_PATH, PKG_PATH);
fs.unlinkSync(PKG_RESTORE_PATH);
