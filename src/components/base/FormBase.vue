<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'FormBase',
})
</script>

<script setup lang="ts" name="FormBase">
import { ElForm } from 'element-plus'

type ELEForm = InstanceType<typeof ElForm>

export interface MyFormExpose {
  validate: ELEForm['validate']
}

const validateForm = ref<ELEForm>()
const validate = (callback: Function) => validateForm?.value?.validate(callback)

defineExpose({
  validate,
})
</script>

<template>
  <el-form
    ref="validateForm"
    class="form-wrapper"
    v-bind="$attrs"
  >
    <slot />
  </el-form>
</template>

<style>
.form-wrapper {
  padding: 0 20px;
}
</style>
