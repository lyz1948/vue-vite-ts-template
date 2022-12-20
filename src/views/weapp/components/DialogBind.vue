<script setup lang="ts">
import { ref, reactive, toRefs } from "vue"
import { formWeappState, rulesWeapp as rules } from '../params'
import useElement from "@/hooks/useElement"

import FormBase from '@/components/base/FormBase.vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import { useStore } from "@/store"
import { AppActionTypes } from "@/store/modules/app/action-types"

const title = '小程序绑定'
const store = useStore()
const emit = defineEmits(['on:reload'])

const { success, error } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()
const visibleDialog = ref(false)

const state = reactive({
  form: formWeappState(),
  loading: false,
})

const { form } = toRefs(state)

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formWeappState()
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      store.dispatch(AppActionTypes.ACTION_MALL_MINIAPP_SET, state.form).then(() => {
        success()
        hide()
        emit('on:reload')
      })
    })
    .catch(err => {
      error(err)
    })
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <DialogBase
    :title="title"
    :visible="visibleDialog"
    width="760px"
    @on:visible="visibleDialog = $event"
    @on:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <FormItemBase prop="appId" label="appId">
        <InputBase v-model="form.appId" />
      </FormItemBase>

      <FormItemBase prop="appSecret" label="app秘钥">
        <InputBase v-model="form.appSecret" />
      </FormItemBase>

      <FormItemBase prop="mchId" label="商户号">
        <InputBase v-model="form.mchId" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss">

</style>