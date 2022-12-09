<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'

const store = useStore()
const visibleDialog = ref(false)
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
})

const rules = {
  name: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
}

const state = reactive({
  form: formState(),
  loading: false,
  isUpdate: false,
})

const { form } = toRefs(state)

const getTitle = computed(() => {
  return state.isUpdate ? '更新图片类型' : '新增图片类型'
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
  state.form = row
}

const handleConfirm = () => {
  formRef.value?.validate().then(() => {
    let { code } = state.form
    code = code.toUpperCase()
    store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_SET, { ...state.form, code }).then(() => {
      success()
      hide()
    })
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
      <FormItemBase prop="name" label="图片类型">
        <InputBase v-model="form.name" />
      </FormItemBase>
      <FormItemBase prop="code" label="类型编码">
        <InputBase v-model="form.code" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss">

</style>