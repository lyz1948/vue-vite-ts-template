<script setup lang="ts" name="InputBase">
const emit = defineEmits(['update:value'])

const changeInput = $event => {
  emit('update:value', $event)
}
</script>

<template>
  <div class="input-base">
    <el-input
      clearable
      v-bind="$attrs"
      @input="changeInput"
    />
  </div>
</template>
