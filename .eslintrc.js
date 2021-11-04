module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    process: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: ['babel', 'prettier', "@typescript-eslint"],
  parserOptions: {
    parser: 'babel-eslint',
  },
  parser: "@typescript-eslint/parser",

  rules: {
    'no-console': 'off',
    'indent': [ 'error', 2 ],
  }
}