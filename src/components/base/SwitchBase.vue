<script setup lang="ts" name="SwitchBase">
const emit = defineEmits(['on:update'])

const changeValue = event => {
  emit('on:update', event)
}
</script>

<template>
  <div class="switch-base">
    <el-switch v-bind="$attrs" @change="changeValue" />
  </div>
</template>
