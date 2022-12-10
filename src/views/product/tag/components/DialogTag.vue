<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'
import Color from '@/components/Color/index.vue'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { useStore } from '@/store'
import { formState } from '../params'

const emit = defineEmits(['on:reload'])
const store = useStore()
const visibleDialog = ref(false)
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const rules = {
  name: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
}

const state = reactive({
  form: formState(),
  isUpdate: false,
})

const getTitle = computed(() => {
  return state.isUpdate ? '更新标签' : '新增标签'
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

const changeColor = (val: string) => {
  state.form.color = val
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      store.dispatch(ProductActionTypes.ACTION_PRODUCT_TAG_SET, state.form).then(() => {
        success()
        hide()
        emit('on:reload')
      })
    })
    .catch(err => {
      error(err)
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
    @on:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <FormItemBase prop="name" label="标签名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="color" label="标签颜色">
        <Color :value="form.color" @on:click="changeColor" />
      </FormItemBase>

      <FormItemBase prop="orderNumber" label="序号">
        <InputNumBase v-model="form.orderNumber" />
      </FormItemBase>

      <FormItemBase prop="remarks" label="备注">
        <InputBase v-model="form.remarks" type="textarea" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss"></style>
