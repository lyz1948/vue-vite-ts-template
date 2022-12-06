<script setup lang="ts">
import { reactive } from 'vue'
import { ProductList as columns } from '@/config/productTable'

import Search from './components/Search.vue'

const state = reactive({
  tableData: [
    {
      orderNumber: '13123131',
      category: '一日游',
      productName: '桂林古东瀑布一日游'
    }
  ]
})

</script>

<template>
  <div class="category-tag">
    <div class="container">
      <div class="content">
        <Search />
        <TableBase :data="state.tableData" :columns="columns">
          <template #action="row">
            <el-checkbox v-model="row.isRecommend" label="推荐" />
            <el-checkbox v-model="row.isHot" label="热卖" />
          </template>
        </TableBase>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
