module.exports = {
    roots: ["<rootDir>", "<rootDir>/src"],
    modulePaths: ["<rootDir>"],
    moduleDirectories: ["node_modules"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: ["<rootDir>/src/config/setupEnzyme.ts"],
    moduleNameMapper: {
        // Regex: https://regexr.com/57flk
        "^@config(?:(?=/).*|(?!/))$": "<rootDir>/src/config",
        "^@utils(?:(?=/).*|(?!/))$": "<rootDir>/src/utils",
        "^@components(?:(?=/).*|(?!/))$": "<rootDir>/src/components",
    },
    collectCoverage: true,
    globals: {
        "ts-jest": {
            tsConfig: "./src/tsconfig.json",
        },
    },
};
