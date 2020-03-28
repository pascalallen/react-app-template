module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      diagnostics: true
    }
  },

  moduleDirectories: ['src', 'node_modules'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },

  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  preset: 'ts-jest/presets/js-with-ts',

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  collectCoverage: true,

  coverageReporters: ['html'],

  coverageDirectory: '<rootDir>/../var/reports/client-coverage'
};
