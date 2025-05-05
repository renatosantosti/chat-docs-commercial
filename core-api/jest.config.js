/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFiles: ['module-alias/register'],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,js}", "!**/index.ts", "!**/types/**"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleDirectories: ['node_modules', 'src']
};
