<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ProductTag as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { PageDefault } from '@/config'
import useElement from '@/hooks/useElement'

const store = useStore()
const emit = defineEmits(['on:edit', 'on:reload'])
const { confirm, success } = useElement()

const state = reactive({
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  return store.state.product.productTagList
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  confirm().then(() => {
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_TAG_DEL, row.id)
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
    <template #name="{ row }">
      <span class="tag-name" :style="{background: row.color}">
        {{ row.name }}
      </span>
    </template>

    <template #role="{ row }">
      <el-tag type="info">
        {{ row.role === 'admin' ? '管理员' : '游客' }}
      </el-tag>
    </template>

    <template #action="{ row }">
      <BtnLinkPermission type="success" auth="edit" @click="handleUpdate(row)">
        编辑
      </BtnLinkPermission>
      <BtnLinkPermission type="danger" auth="delete" @click="handleDelete(row)">
        删除
      </BtnLinkPermission>
    </template>
  </TableBase>
</template>

<style lang="scss" scope>
.tag-name {
  display: inline-block;
  color: #fff;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
}
</style>
