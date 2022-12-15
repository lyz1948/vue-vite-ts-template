<script setup lang="ts" name="SelectDataBase">
import { ref, reactive, watch } from 'vue'
import { isChineseCharacter } from '@/utils/validate'

const emit = defineEmits(['on:select', 'on:reload', 'on:focus', 'on:update'])
const props = defineProps({
  list: {
    type: Array,
    default: () => ([]),
  },

  data: {
    type: Array,
    default: () => ([]),
  },
})

const state = reactive({
  options: ref<never[]>([]),
  curVal: ref(''),
})

const initData = (list: any) => {
  state.options = list
  state.curVal = props.value
}

const handleChange = (val: string) => {
  let findItem: any = { label: '', value: '' }
  if (val) {
    const data = props.data.length ? props.data : props.list
    findItem = data.find((it: any) => it.id == val || it.label == val)
  }
  state.curVal = findItem ? findItem?.label : ''
  emit('on:update', state.curVal)
  emit('on:select', findItem)
}

const handleFilter = (data: any, val: string) => {
  data = props.data.length ? props.data : data
  const result = data.filter((item: any) => {
    const isChiness = isChineseCharacter(val)
    if (!isChiness) {
      return item.slug.toLowerCase().indexOf(val.toLowerCase()) > -1
    } else {
      return item.label.indexOf(val) > -1
    }
  })
  return result
}

const dataFilter = (val: string) => {
  const data = [...props.list]

  if (val) {
    const filterData = handleFilter(data, val)

    state.options = filterData
  } else {
    state.options = data as any
  }
}


const resetOptions = () => {
  state.options = [...props.list] as any
}

const handleFocus = () => {
  emit('on:focus')
}

// const loadMore = () => {
//   emit('on:reload')
// }

watch(
  () => props.list,
  list => {
    initData(list)
  },
  { immediate: true, deep: true }
)

// watch(
//   () => props.data,
//   list => {
//     initData(list)
//   },
//   { immediate: true, deep: true }
// )

</script>

<template>
  <div class="select-base">
    <el-select
      v-bind="$attrs"
      :filter-method="dataFilter"
      clearable
      filterable
      placeholder="请选择"
      @visible-change="resetOptions"
      @clear="resetOptions"
      @change="handleChange"
      @focus="handleFocus"
    >
      <el-option
        v-for="(item) in state.options"
        :key="item.value"
        :label="item.label"
        :value="item.value + ''"
      />
    </el-select>
  </div>
</template>
