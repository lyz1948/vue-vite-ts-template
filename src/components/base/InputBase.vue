<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InputBase',
})
</script>

<script setup lang="ts">
const emit = defineEmits(['update:value'])

const changeInput = $event => {
  emit('update:value', $event)
}
</script>

<template>
  <div class="input-base">
    <el-input
      v-bind="$attrs"
      @input="changeInput"
    />
  </div>
</template>
