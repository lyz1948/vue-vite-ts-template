<script setup lang="ts">
import { ref, reactive, toRefs, computed } from 'vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import FormBase from '@/components/base/FormBase.vue'
import useElement from '@/hooks/useElement'
import { themeColorOpts } from '@/config/setting'
const visibleDialog = ref(false)
const { error, success } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()

const formState = () => ({
  name: '',
  number: '',
  color: themeColorOpts[0]
})

const rules = {
  name: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
}

const state = reactive({
  form: formState(),
  loading: false,
  isUpdate: false,
  colorList: themeColorOpts,
  colorIndex: 0,
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

const selectColor = (color: string, index: number) => {
  state.form.color = color
  state.colorIndex = index || 0
}

const customColor = () => {
  state.colorIndex = -1
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

const { form, colorList, colorIndex } = toRefs(state)

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
      <FormItemBase prop="name" label="标签名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="name" label="标签颜色">
        <div class="color-wrap">
          <span
            v-for="(item, index) in colorList"
            :key="item"
            :style="'background: ' + item"
            :class="index === colorIndex ? 'is-active' : ''"
            @click="selectColor(item, index)"
          />
          <el-color-picker v-model="form.color" @change="customColor" />
        </div>
      </FormItemBase>

      <FormItemBase prop="number" label="序号">
        <InputNumBase v-model="form.number" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss">
.color-wrap {
  display: flex;
  flex-wrap: wrap;
  > span {
    display: inline-block;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    cursor: pointer;
    &.is-active {
      border: 1px solid #ddd;
      padding: 2px;
    }
  }
}
</style>