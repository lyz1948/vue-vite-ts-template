module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    process: true,
    defineEmits: 'readonly',
    defineProps: 'readonly',
    defineExpose: 'readonly',
    InstanceType: 'readonly',
    ReturnType: 'readonly',
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}
