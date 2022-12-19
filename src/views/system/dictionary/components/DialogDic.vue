<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'
import { formState, rules } from '../params'
import { useStore } from '@/store'
import { DictionaryActionTypes } from '@/store/modules/system/dictionary/action-types'

const emit = defineEmits(['on:reload'])
const store = useStore()
const visibleDialog = ref(false)
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const state = reactive({
  form: formState(),
  loading: false,
  isUpdate: false,
})

const getTitle = computed(() => {
  return state.isUpdate ? '更新字典' : '新增字典'
})

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formState()
}

const edit = (row: any) => {
  console.log('row:', row)
  show()
  state.isUpdate = true
  state.form = { ...row }
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      store.dispatch(DictionaryActionTypes.ACTION_DICTIONARY_CREATE, state.form).then(() => {
        success()
        hide()
        emit('on:reload')
      })
    })
    .catch(() => {
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
    @on:confirm="handleConfirm"
  >
    <FormBase
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <FormItemBase prop="name" label="字典名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="number" label="序号">
        <InputNumBase v-model="form.orderNumber" />
      </FormItemBase>

      <FormItemBase prop="remarks" label="内容">
        <InputBase v-model="form.remarks" type="textarea" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>
