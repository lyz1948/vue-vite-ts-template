module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    process: true,
    defineEmits: 'readonly',
    defineProps: 'readonly',
    // defineProps: true,
    // defineEmits: true,
    defineExpose: true,
    InstanceType: true,
    ReturnType: 'readonly',
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}
