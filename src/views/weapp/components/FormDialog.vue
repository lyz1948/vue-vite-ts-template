<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ISelectItem } from '@/types'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'

const visibleDialog = ref(false)
const title = '新增角色'
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
  remark: '',
  role: '', // 角色名字
  isEnable: true,
})

const state = reactive({
  form: formState(),
  loading: false,
  rules: {
    name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
    role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
  },
})

const changeRole = (val: ISelectItem) => {
  state.form.role = val.value
}

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formState()
}

const edit = (row: any) => {
  show()
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

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    @on:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :form="state.form"
      :rules="state.rules"
      label-width="100px"
    >
      <FormItemBase prop="name" label="角色名称">
        <InputBase v-model:value="state.form.name" />
      </FormItemBase>

      <FormItemBase prop="role" label="审核角色">
        <SelectBase
          v-model:value="state.form.role"
          type="role"
          @on:select="changeRole"
        />
      </FormItemBase>

      <FormItemBase label="备注">
        <InputBase
          v-model:value="state.form.remark"
          :rows="4"
          type="textarea"
        />
      </FormItemBase>

      <FormItemBase label="启用状态">
        <SwitchBase v-model:value="state.form.isEnable" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>
