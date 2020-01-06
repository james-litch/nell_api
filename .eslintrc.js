module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "class-methods-use-this": "off",
    "no-console":"off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "func-names": "off",
    "no-param-reassign": "off",
    "newline-per-chained-call": "off",
  },
};
