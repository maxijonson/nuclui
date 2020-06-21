/**
 * Restores dependencies that were removed during prepublish
 */
const path = require("path");
const fs = require("fs");

const PKG_PATH = path.resolve(__dirname, "../package.json");
const PKG_RESTORE_PATH = path.resolve(__dirname, "package.restore.json");

fs.copyFileSync(PKG_RESTORE_PATH, PKG_PATH);
fs.unlinkSync(PKG_RESTORE_PATH);
