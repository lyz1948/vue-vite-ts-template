module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    process: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  plugins: ['babel', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    'no-console': 'off',
    indent: ['error', 2],
  },
}
