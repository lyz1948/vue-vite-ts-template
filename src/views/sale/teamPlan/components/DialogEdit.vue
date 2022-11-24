<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import { SalePrice as columns } from '@/config/saleTable'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'

const visibleDialog = ref(false)
const title = '编辑计划'
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
  remark: '',
  role: '', // 角色名字
  isEnable: true,
})

// const rules = {
//   name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
//   role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
// }

// const customerRules = {
//   name: [{ required: true, message: '客户名字不能为空', trigger: 'change' }],
//   contact: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
// }

const state = reactive({
  loading: false,
  form: formState(),
  customer: {},
  tableData: [],
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
  state.form = { ...row }
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      success()
      hide()
    })
    .catch(err => {
      console.log('err:', err)
      error()
    })
}

const { tableData } = toRefs(state)

defineExpose({
  show,
  edit,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    custom-class="dialog-edit"
    @on:visible="visibleDialog = $event"
    @update:confirm="handleConfirm"
  >
    <div class="order-info">
      <div class="order-info--item">
        <span class="text">订单号</span>
        <span class="text">线路名称</span>
      </div>
      <div class="order-info--item">
        <div>
          <span class="label">发团日期：</span>
          <span class="text">2022-12-01</span>
        </div>
      </div>
    </div>

    <div class="flex container">
      <span>每日计划人数：</span>
      <InputBase />
      <el-checkbox>可超售</el-checkbox>
      <span>与位数：100</span>
    </div>

    <TableBase :columns="columns" :data="tableData">
      <template #adult="row">
        <InputBase v-model="row.adule" />
      </template>
      <template #children="row">
        <InputBase v-model="row.children" />
      </template>
      <template #room="row">
        <InputBase v-model="row.room" />
      </template>
    </TableBase>
  </DialogBase>
</template>

<style lang="scss" scoped>
.dialog-edit {
  
}
</style>
