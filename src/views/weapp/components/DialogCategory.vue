<script setup lang="ts">
import { ref, reactive, toRefs } from "vue"
import { themeColorOpts } from '@/config/setting'
import { formCateState, rulesCate as rules } from '../params'
import SvgIconList from '@/components/SvgIcon/SvgIconList.vue'
import Color from '@/components/Color/index.vue'
import useElement from "@/hooks/useElement"

import FormBase from '@/components/base/FormBase.vue'
import type { MyFormExpose } from '@/components/base/FormBase.vue'
import { useStore } from "@/store"
import { ProductActionTypes } from "@/store/modules/product/action-types"

const title = '新增自定义类别'
const store = useStore()
const emit = defineEmits(['on:reload'])

const { success, error } = useElement()
const formRef = ref<InstanceType<typeof FormBase> & MyFormExpose>()
const visibleDialog = ref(false)

const state = reactive({
  form: formCateState(),
  loading: false,
  colorList: themeColorOpts,
  colorIndex: 0,
})

const { form } = toRefs(state)

const show = () => {
  visibleDialog.value = true
}

const hide = () => {
  visibleDialog.value = false
  state.form = formCateState()
}

const selectIcon = (val) => {
  state.form.icon = val
}

const selectColor = (val) => {
  state.form.color = val
}

const handleConfirm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_SET, state.form).then(() => {
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
      <FormItemBase prop="name" label="标签名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="color" label="背景颜色">
        <Color :value="form.color" @on:select="selectColor" />
        <!-- <div class="color-wrap">
          <span
            v-for="(item, index) in colorList"
            :key="item"
            :style="'background: ' + item"
            :class="index === colorIndex ? 'is-active' : ''"
            @click="selectColor(item, index)"
          />
          <el-color-picker v-model="form.color" @change="customColor" />
        </div> -->
      </FormItemBase>

      <FormItemBase prop="number" label="类别图标">
        <SvgIconList @on:select="selectIcon" />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss">

</style>