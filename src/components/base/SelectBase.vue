<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SelectBase',
})
</script>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'
import { SELECTOR } from '@/config/selector'
import { ISelectItem } from '@/types'
import type { SelectProps } from '@/types'

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
  vertical: {
    type: Boolean,
    default: false,
  },
  isRequire: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  tip: {
    type: String,
    default: '',
  },
})

let isFirst = ref(true)
const state = reactive({
  tempData: ref<Array<ISelectItem>>([]),
  data: [],
})

const handleChange = (val: string) => {
  const item = state.data.find((it: ISelectItem) => it.value === val)
  emit('on:select', item)
}

const lazyLoad = () => {
  if (!isFirst.value) return
  isFirst.value = false
  state.tempData = props.list.length > 0 ? props.list : (SELECTOR[props.type as SelectProps] as any)
}

watch(
  () => state.tempData,
  (list: any) => {
    state.data = list
  }
)
</script>

<template>
  <div class="select-base" :class="{ vertical: vertical }">
    <el-select :model-value="value" :placeholder="tip" @focus="lazyLoad" @change="handleChange">
      <el-option
        v-for="(item, index) in state.tempData"
        :key="item.value + '' + index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
