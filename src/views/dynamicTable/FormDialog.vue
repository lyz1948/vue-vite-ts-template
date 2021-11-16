<script setup lang="ts">
import { useStore } from '@/store'
import { ref, reactive, defineExpose, onMounted } from 'vue'
import Tips from '@/utils/useMessage'

const store = useStore()
const visibleDialog = ref(false)
const title = '新增角色'

const formRef = ref(null)
const state = reactive({
  form: {
    name: '',
    remarks: '',
    auditRole: '', // 角色名字
    singleGroupAuditRole: '', //  角色id
    showCustomerInfo: true,
    isEnable: true,
  },
  loading: false,
  rules: {
    name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
    auditRole: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
  },
})

const changeRole = (val: string) => {
  state.form.singleGroupAuditRole = val.value
}

const show = () => {
  visibleDialog.value = true
}

const edit = row => {
  const role = getAuditRole(row.singleGroupAuditRole)

  show()
  state.form = { ...row, auditRole: role.label }
}

const handleConfirm = async () => {
  const valid = await formRef.value.handleValidate()

  if (!valid) {
    Tips.error()
    return
  }
  saveOrUpdate(state.form)
}

const saveOrUpdate = params => {}

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    @update:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :form="state.form"
      :rules="state.rules"
      label-width="160px"
    >
      <FormItemBase prop="name" label="角色名称">
        <InputBase v-model:value="state.form.name" />
      </FormItemBase>

      <FormItemBase prop="singleGroupAuditRole" label="单团审核角色">
        <SelectBase
          v-model:value="state.form.singleGroupAuditRole"
          type="auditRole"
          @on:select="changeRole"
        />
      </FormItemBase>

      <FormItemBase label="备注">
        <InputBase
          v-model:value="state.form.remarks"
          :rows="4"
          type="textarea"
        />
      </FormItemBase>

      <FormItemBase label="启用状态">
        <SwitchBase v-model:value="state.form.isEnable" />
      </FormItemBase>

      <FormItemBase label="是否有权查看客户信息">
        <SwitchBase v-model:value="state.form.showCustomerInfo" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>
