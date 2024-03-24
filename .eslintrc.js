module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    semi: ['error', 'never'],
    'arrow-parens': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-alert': 'off',
    'object-curly-spacing': 'off',
    quotes: 'off',
    'import/extensions': ['error', 'always'],
  },
  ignorePatterns: ['cypress/plugins/index.js'],
}
