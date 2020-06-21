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
        "^components(.*)$": "<rootDir>/src/components$1",
        "nuclui": ["<rootDir>/src/index.ts"],
        "^nuclui(.*)$": ["<rootDir>/src$1"],
    },
};
