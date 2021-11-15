<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormItemBase',
})
</script>

<script setup lang="ts">
defineProps({
  isRequire: {
    type: Boolean,
    default: false,
  },
})
</script>


<template>
  <el-form-item >
    <slot />
  </el-form-item>
</template>

