module.exports = {
    roots: ["<rootDir>", "<rootDir>/src"],
    modulePaths: ["<rootDir>"],
    moduleDirectories: ["node_modules"],
    preset: "ts-jest",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: [
        "<rootDir>/src/config/setupTests.ts",
        "jest-mock-console/dist/setupTestFramework.js",
    ],
    moduleNameMapper: {
        // Regex: https://regexr.com/57fm3
        "^@config((?=/).*|(?!/))$": "<rootDir>/src/config$1",
        "^@utils((?=/).*|(?!/))$": "<rootDir>/src/utils$1",
        "^@components((?=/).*|(?!/))$": "<rootDir>/src/components$1",
        "^@theme((?=/).*|(?!/))$": "<rootDir>/src/theme$1",
        "^@fonts((?=/).*|(?!/))$": "<rootDir>/src/fonts$1",
        "^@hooks((?=/).*|(?!/))$": "<rootDir>/src/hooks$1",
    },
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!**/index.{ts,tsx,js,jsx}",
        "!**/*.d.ts",
    ],
    globals: {
        "ts-jest": {
            tsConfig: "./src/tsconfig.json",
        },
    },
};
