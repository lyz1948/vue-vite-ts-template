<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SwitchBase'
})
</script>

<script setup lang="ts">
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: {
    type: Boolean,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const changeValue = event => {
  emit('update:value', event)
}
</script>

<template>
  <div class="switch-base">
    <el-switch
      :model-value="value"
      @change="changeValue"
    />
  </div>
</template>
