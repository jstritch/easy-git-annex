/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: '50%',
  testTimeout: 60000,
  extensionsToTreatAsEsm: [
    '.ts'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig-jest.json',
        useESM: true
      }
    ]
  },
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json-summary',
    'text'
  ]
};

module.exports = config;
