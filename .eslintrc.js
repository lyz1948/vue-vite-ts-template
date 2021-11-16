module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    process: true,
    defineProps: true,
    defineEmits: true,
    defineExpose: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/standard', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'comma-dangle': 'always',
  },
}
