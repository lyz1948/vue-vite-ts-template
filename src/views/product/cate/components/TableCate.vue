<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ProductCategory as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { PageDefault } from '@/config'
import useElement from '@/hooks/useElement'

const store = useStore()
const emit = defineEmits(['on:edit', 'on:reload'])
const { confirm, success }  = useElement()

const state = reactive({
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  let list = store.state.product.productCateList || []
  if (list && list.length) {
    list = list.sort((a, b) => a.orderNumber - b.orderNumber)
  }
  return list
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  confirm().then(() => {
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_CATE_DEL, row.id)
    .then(() => {
      success()
      emit('on:reload')
    })
  })
}

const handleUpdate = (row: any) => {
  emit('on:edit', row)
}

</script>

<template>
  <TableBase
    :data="tableData"
    :columns="columns"
    :total-count="state.total"
    @update:page="handlePage"
  >
    <template #isEnable="scope">
      <TagBase :name="scope.row.isEnable" />
    </template>

    <template #role="scope">
      <el-tag type="info">
        {{ scope.row.role === 'admin' ? '管理员' : '游客' }}
      </el-tag>
    </template>

    <template #action="scope">
      <BtnPermission type="success" auth="edit" @click="handleUpdate(scope.row)">
        编辑
      </BtnPermission>
      <BtnPermission type="danger" auth="delete" @click="handleDelete(scope.row)">
        删除
      </BtnPermission>
    </template>
  </TableBase>
</template>

<style scoped></style>
