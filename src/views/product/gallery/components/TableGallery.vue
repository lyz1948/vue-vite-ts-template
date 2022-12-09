<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ProductImage as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { PageDefault } from '@/config'
import { useRouter } from 'vue-router'
import useElement from '@/hooks/useElement'

const store = useStore()
const router = useRouter()
const emit = defineEmits(['on:edit', 'on:reload'])
const { confirm } = useElement()

const state = reactive({
  tableData: [],
  total: 0,
  pageNum: PageDefault.pageNum,
  pageSize: PageDefault.pageSize,
})

const tableData = computed(() => {
  return store.state.source.picList
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  confirm().then(() => {
    store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_DEL, row.id).then(() => {
      emit('on:reload')
    })
  })
}

const handleUpload = (row: any) => {
  console.log(row)
}

const handleDetail = (row: any) => {
  router.push({ path: '/system/material', query: { id: row.id } })
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
    <template #isEnable="{ row }">
      <TagBase :name="row.isEnable" />
    </template>

    <template #role="{ row }">
      <el-tag type="info">
        {{ row.role === 'admin' ? '管理员' : '游客' }}
      </el-tag>
    </template>

    <template #action="{ row }">
      <BtnLinkPermission type="success" @click="handleUpdate(row)">
        编辑
      </BtnLinkPermission>
      <BtnLinkPermission type="primary" @click="handleUpload(row)">
        上传
      </BtnLinkPermission>
      <BtnLinkPermission type="info" @click="handleDetail(row)">
        查看
      </BtnLinkPermission>
      <BtnLinkPermission type="danger" @click="handleDelete(row)">
        删除
      </BtnLinkPermission>
    </template>
  </TableBase>
</template>

<style scoped></style>
