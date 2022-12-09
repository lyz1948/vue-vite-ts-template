<script setup lang="ts">
import { ref, reactive, toRefs } from "vue"
import { themeColorOpts } from '@/config/setting'
import { formCateState, rulesCate as rules } from '../params'
import SvgIconList from '@/components/SvgIcon/SvgIconList.vue'
import Color from '@/components/Color/index.vue'

const title = '新增自定义类别'
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
}

// const selectColor = (val, index) => {
//   state.form.color = val
//   state.colorIndex = index
// }

// const customColor = (val) => {
//   state.form.color = val
// }

const handleConfirm = () => {
  visibleDialog.value = false
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
      :form="form"
      :rules="rules"
      label-width="100px"
    >
      <FormItemBase prop="name" label="标签名称">
        <InputBase v-model="form.name" />
      </FormItemBase>

      <FormItemBase prop="name" label="背景颜色">
        <Color />
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
        <SvgIconList />
      </FormItemBase>
    </FormBase>
  </DialogBase>
</template>

<style lang="scss">

</style>