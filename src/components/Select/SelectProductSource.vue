<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import useLoadmore from '@/hooks/useLoadmore'
import { ProductActionTypes } from '@/store/modules/product/action-types'

const store = useStore()

const selectData = computed(() => {
  return store.state.product.productResourceAll
})

const { list, fetchData, lazyLoad, loadMoreData } = useLoadmore({
  url: ProductActionTypes.ACTION_PRODUCT_RESOURCE_ALL,
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
