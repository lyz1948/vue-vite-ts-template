<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  ref,
  reactive,
} from 'vue'
</script>

<script setup lang="ts">
import SELECTOR from '@/config/selector'
export default defineComponent({
  name: 'SelectBase'
})

const emit = defineEmits(['on:select'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'yesNo'
  },
  vertical: {
    type: Boolean,
    default: false
  },
  isRequire: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  }
})

let isFirst = ref(true)
const state = reactive({
  tempData: [],
  data: []
})

const handleChange = val => {
  const item = state.data.find(it => it.value === val)
  emit('on:select', item)
}

const lazyLoad = () => {
  if (!isFirst.value) return
  isFirst = false
  state.tempData = props.list.length > 0 ? props.list : SELECTOR[props.type]
}

watch(
  () => state.tempData,
  (list, oldList) => {
    state.data = list
  }
)
</script>

<template>
  <div
    class="select-base"
    :class="{ vertical: vertical }"
  >
    <el-select
      :model-value="value"
      :placeholder="tip"
      @focus="lazyLoad"
      @change="handleChange"
    >
      <el-option
        v-for="(item, index) in state.tempData"
        :key="item.value + '' + index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
