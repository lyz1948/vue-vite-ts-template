<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormBase',
})
</script>

<script setup lang="ts">
import { ref, unref, defineExpose } from 'vue'
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },

  rules: {
    type: Object,
    default: () => ({}),
  },
})

const validateForm = ref(null)

const handleValidate = async (): boolean => {
  const form = unref(validateForm)
  if (!form) return false
  return await form.validate()
}

defineExpose({
  handleValidate,
})
</script>

<template>
  <el-form
    ref="validateForm"
    :model="props.form"
    :rules="props.rules"
    class="form-wrapper"
  >
    <slot />
  </el-form>
</template>
