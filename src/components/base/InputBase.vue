<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InputBase',
})
</script>

<script setup="{ attrs }" lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:value'])
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  tip: {
    type: String,
    default: '',
  },
})

const changeInput = $event => {
  emit('update:value', $event)
}
</script>

<template>
  <div class="input-base" :class="{ vertical: vertical }">
    <el-input
      :model-value="value"
      :placeholder="'请输入' + tip ? tip : label"
      @input="changeInput"
    />
  </div>
</template>
