<script setup lang="ts" name="InputNumBase">
const emit = defineEmits(['update:value'])

const changeInput = $event => {
  emit('update:value', $event)
}
</script>

<template>
  <div class="input-base">
    <el-input
      v-bind="$attrs"
      onkeyup="value=value.replace(/[^\d-|.]/g,'')"
      @input="changeInput"
    />
  </div>
</template>
