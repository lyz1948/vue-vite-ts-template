<script setup lang="ts" name="FormBase">
import { ref } from 'vue'
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
    class="form-wrap"
    v-bind="$attrs"
  >
    <div class="content">
      <slot />
    </div>
  </el-form>
</template>

<style>
.form-wrap {
  padding-top: 20px;
}
</style>
