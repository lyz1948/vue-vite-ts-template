<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ProductList as columns } from '@/config/productTable'

import Search from './components/Search.vue'
import DialogTag from './components/DialogTag.vue'

const dialogRef = ref(null)
const state = reactive({
  tableData: [
    {
      orderNumber: '13123131',
      category: '一日游',
      productName: '桂林古东瀑布一日游'
    }
  ]
})

const showDialog = () => {
  dialogRef.value?.show()
}

</script>

<template>
  <div class="category-tag">
    <div class="container">
      <div class="content">
        <Search />
        <TableBase :data="state.tableData" :columns="columns">
          <template #action="">
            <BtnBase type="primary" link @click="showDialog">
              关联
            </BtnBase>
          </template>
        </TableBase>
      </div>
    </div>
    <DialogTag ref="dialogRef" />
  </div>
</template>

<style lang="scss">

</style>
