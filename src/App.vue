<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { reactive, toRefs } from 'vue'

const state = reactive({
  size: 'default',
  zIndex: 3000,
})

const { size, zIndex } = toRefs(state)

</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view />
  </el-config-provider>
</template>

<style></style>
