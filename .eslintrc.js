module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'import/prefer-default-export': 'off',
    semi: ['error', 'never'],
    'no-restricted-globals': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
  },
}
