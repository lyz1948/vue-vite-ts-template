<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnPermission',
})
</script>

<script setup lang="ts">
defineProps({
  auth: {
    type: String,
    default: 'create',
  },
})
</script>

<template>
  <el-button v-permission="auth">
    <slot />
  </el-button>
</template>

<style lang="scss" scoped>
.btn-link-box {
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
