module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts'
  ]
};
