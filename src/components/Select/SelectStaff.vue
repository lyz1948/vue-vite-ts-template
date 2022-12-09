<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { StaffActionTypes } from '@/store/modules/system/staff/action-types'
import useLoadmore from '@/hooks/useLoadmore'

const store = useStore()

const selectData = computed(() => {
  return store.state.staff.staffSelectData || []
})

const { list, fetchData, lazyLoad, loadMoreData } = useLoadmore({
  url: StaffActionTypes.ACTION_STAFF_SELECT_FETCH,
  data: selectData.value,
})

defineExpose({
  fetchData,
})
</script>

<template>
  <SelectDataBase
    :data="selectData"
    :list="list"
    @on:focus="lazyLoad"
    @on:reload="loadMoreData"
  />
</template>
