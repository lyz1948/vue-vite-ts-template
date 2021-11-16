<script lang="ts">
import { defineComponent, computed } from 'vue'
</script>

<script setup="{ attrs }" lang="ts">
export default defineComponent({
  name: 'InputBase'
})

const emit = defineEmits(['update:value'])
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  }
})

const changeInput = $event => {
  emit('update:value', $event)
}
</script>

<template>
  <div
    class="input-base"
    :class="{ vertical: vertical }"
  >
    <el-input
      :model-value="value"
      :placeholder="'请输入' + tip ? tip : label"
      @input="changeInput"
    />
  </div>
</template>
