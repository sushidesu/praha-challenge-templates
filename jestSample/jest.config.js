module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  verbose: true,
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2345, 2322]
      }
    }
  }
};
