<script setup lang="ts" name="DateBase">
import { computed } from "vue"


const props = defineProps({
  shortcuts: {
    type: Boolean,
    default: true,
  }
})

const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const hasShowShort = computed(() => {
  return props.shortcuts ? shortcuts : []
})
</script>

<template>
  <el-date-picker
    type="daterange"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :shortcuts="hasShowShort"
  />
</template>