<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'

const visibleDialog = ref(false)
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
  number: '',
})

const rules = {
  name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
}

const state = reactive({
  form: formState(),
  loading: false,
  isUpdate: false,
})

const getTitle = computed(() => {
  return state.isUpdate ? '更新分类' : '新增分类'
})

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formState()
}

const edit = (row: any) => {
  show()
  state.isUpdate = true
  state.form = { ...row }
}

const handleConfirm = () => {
  formRef.value?.validate().then(() => {
    success()
    hide()
  }).catch((err) => {
    console.log('err:', err)
    error()
  })
}

const { form } = toRefs(state)

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="getTitle"
    :visible="visibleDialog"
    width="500px"
    @on:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :form="form"
      :rules="rules"
      label-width="100px"
    >
      <FormItemBase prop="name" label="分类名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="number" label="序号">
        <InputNumBase v-model="form.number" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>
