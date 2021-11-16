<script setup lang="ts">
import Select from '@/components/Select/index.vue'
import { reactive, ref } from 'vue'
import { themeColorOpts } from './data'

const state = reactive({
  color: '',
  customerColor: '',
  curIndex: 0
})

const colorOptList = ref(themeColorOpts)

const selectColor = (val, index) => {
  state.color = val
  state.curIndex = index
}

const chooseColor = val => {
  state.customerColor = val
}
</script>

<template>
  <div class="theme-picker">
    <span
      v-for="(item, index) in colorOptList"
      :key="item"
      :style="'background: ' + item"
      :class="index === state.curIndex ? 'is-active' : ''"
      @click="selectColor(item, index)"
    />
    <el-color-picker
      v-model="state.customerColor"
      @change="chooseColor"
    />
  </div>
</template>

<style lang="scss" scoped>
.theme-picker {
  display: flex;
  > span {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    &.is-active {
      border: 1px solid #ddd;
      padding: 2px;
    }
  }
}
</style>
