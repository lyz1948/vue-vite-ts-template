
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnBase',
})
</script>

<script setup lang="ts">
// import { computed } from 'vue'

// const defaultState = {
//   search: {
//     icon: 'el-icon-search',
//     text: '搜索',
//     type: 'default',
//   },
//   create: {
//     icon: 'el-icon-plus',
//     text: '创建',
//     type: 'success',
//   },
//   save: {
//     icon: 'el-icon-check',
//     text: '保存',
//     type: 'success',
//   },
//   close: {
//     icon: 'el-icon-close',
//     text: '关闭',
//     type: 'info',
//   },
//   delete: {
//     icon: 'el-icon-delete',
//     text: '删除',
//     type: 'danger',
//   },
//   reset: {
//     icon: 'el-icon-switch-button',
//     text: '重置',
//     type: 'danger',
//   },
//   export: {
//     icon: 'el-icon-notbook',
//     text: '导出',
//     type: 'success',
//   },
//   back: {
//     icon: 'info',
//     text: '返回',
//     type: 'default',
//   },
// }

// const props = defineProps({
//   name: {
//     type: String,
//     default: '',
//   },
//   type: {
//     type: String,
//     default: 'search',
//   },
// })

// const getName = computed(() => {
//   return props.name || defaultState[props.type].text
// })

// const getPlain = computed(() => {
//   return defaultState[props.type].plain
// })

// const getType = computed(() => {
//   return defaultState[props.type].type
// })

</script>

<template>
  <el-button
    v-bind="$attrs"
  >
    <slot />
  </el-button>
</template>
