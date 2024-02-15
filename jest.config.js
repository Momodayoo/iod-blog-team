module.exports = {
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 75,
        functions: 90,
        lines: 80,
      },
    },
    coverageReporters: ["lcov", "text"],
    coverageDirectory: "./coverage-report/",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/__tests__/fixtures/", "/__tests__/integration/"],
    testRegex: "(/__tests__/unit/.*|(\\.|/)(test|spec))\\.jsx?$",
    testTimeout: 10000,
    globals: {
      globalVar: "a global variable",
    },
    setupFiles: ["<rootDir>/test/jest-unit-setup.js"],
  };
  