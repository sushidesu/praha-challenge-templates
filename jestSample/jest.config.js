module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["**/functions.ts"],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2345]
      }
    }
  }
};
