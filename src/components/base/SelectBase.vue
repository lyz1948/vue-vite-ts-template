<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SelectBase',
})
</script>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'
import { ISelectItem } from '@/types'
import SELECTOR from '@/config/selector'

const emit = defineEmits(['on:select'])
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'yesNo',
  },
})

const isFirst = ref(true)
const state = reactive({
  tempData: ref<Array<ISelectItem>>([]),
  data: [],
})

const handleChange = (val: string) => {
  let item = { label: '', value: '' }

  if (val) {
    item = state.data.find((it: ISelectItem) => it.value === val)
  }
  emit('on:select', item)
}

const lazyLoad = () => {
  if (!isFirst.value) return
  isFirst.value = false
  state.tempData = props.list.length > 0 ? props.list : SELECTOR[props.type]
}

watch(
  () => state.tempData,
  (list: any) => {
    state.data = list
  }
)
</script>

<template>
  <el-select
    clearable
    v-bind="$attrs"
    @focus="lazyLoad"
    @change="handleChange"
  >
    <el-option
      v-for="(item) in state.tempData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
