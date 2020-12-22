module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "node",
    verbose: true,
    preset: "ts-jest",
    collectCoverageFrom: [
      '**/*.ts',
      '!**/node_modules/**',
      '!__tests__/**'
    ],
    reporters: ['default'],
    coverageReporters: ['text'],
    verbose: true
  };
  