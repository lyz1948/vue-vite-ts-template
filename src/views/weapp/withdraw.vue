<script setup lang="ts">
import { reactive } from 'vue'
import { WithDrow as columns } from '@/config/weappTable'

import SearchWithdraw from './components/SearchWithdraw.vue'

const state = reactive({
  tableData: [

  ]
})

</script>

<template>
  <div class="withdraw">
    <SearchWithdraw />
    <div class="content">
      <TableBase :data="state.tableData" :columns="columns">
        <template #action="row">
          <el-checkbox v-model="row.isRecommend" label="推荐" />
          <el-checkbox v-model="row.isHot" label="热卖" />
        </template>
      </TableBase>
    </div>
  </div>
</template>

<style lang="scss">

</style>
