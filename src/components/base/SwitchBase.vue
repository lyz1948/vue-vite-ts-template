<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SwitchBase',
})
</script>

<script setup lang="ts">
const emit = defineEmits(['update:value'])

const changeValue = event => {
  emit('update:value', event)
}
</script>

<template>
  <div class="switch-base">
    <el-switch :model-value="value" v-bind="$attrs" @change="changeValue" />
  </div>
</template>
