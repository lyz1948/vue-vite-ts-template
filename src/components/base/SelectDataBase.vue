<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SelectDataBase',
})
</script>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { isChineseCharacter } from '@/utils/validate'

const emit = defineEmits(['on:select', 'on:reload', 'on:focus', 'update:value'])
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },

  data: {
    type: Array,
    default: () => [],
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
  emit('update:value', state.curVal)
  emit('on:select', findItem)
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

const resetOptions = () => {
  state.options = [...props.list] as any
}

const handleFocus = () => {
  emit('on:focus')
}

const loadMore = () => {
  emit('on:reload')
}

watch(
  () => props.list,
  list => {
    initData(list)
  },
  { immediate: true, deep: true }
)

</script>

<template>
  <div class="select-base">
    <el-select
      v-loadmore="loadMore"
      clearable
      filterable
      placeholder="请选择"
      v-bind="$attrs"
      :filter-method="dataFilter"
      @visible-change="resetOptions"
      @clear="resetOptions"
      @change="handleChange"
      @focus="handleFocus"
    >
      <el-option
        v-for="(item, index) in state.options"
        :key="(item as any).value + '' + index"
        :label="(item as any).label"
        :value="(item as any).value + ''"
      />
    </el-select>
  </div>
</template>
