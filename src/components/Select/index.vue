<script setup lang="ts">

defineProps({
  value: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <el-select
    v-model="value"
    placeholder="Select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
