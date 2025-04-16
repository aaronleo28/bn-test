module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/config/jest.setup.ts'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  roots: ['<rootDir>/test'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};
