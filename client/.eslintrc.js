module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
  ],
  parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      }
  },
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'after-used',
      ignoreRestSiblings: true,
      vars: 'all'
    }],
    '@typescript-eslint/no-empty-function': 0
  },
  ignorePatterns: [
    'node_modules/'
  ],
  settings: {
      react: {
          version: 'detect'
      }
  }
};