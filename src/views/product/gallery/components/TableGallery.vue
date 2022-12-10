<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ProductImage as columns } from '@/config/productTable'
import { useStore } from '@/store'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { PageDefault } from '@/config'
import { useRouter } from 'vue-router'
import useElement from '@/hooks/useElement'
import Upload from '@/components/Uploader/index.vue'
import { getUploadFileName } from '@/config/upload'

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
  return store.state.source.picTypeList
})

const handlePage = ({ pageNum, pageSize }) => {
  state.pageNum = pageNum
  state.pageSize = pageSize
}

const handleDelete = (row: any) => {
  confirm().then(() => {
    store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_DEL, row.id).then(() => {
      emit('on:reload')
    })
  })
}

const handleUpload = (id, data: any) => {
  const { url } = data
  if (url !== '') {
    store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD, {
      path: getUploadFileName(url),
      picTypeId: id,
    }).then(() => {
      emit('on:reload')
    })
  } 
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

    <template #action="{ row }">
      <div class="flex">
        <BtnLinkPermission type="success" @click="handleUpdate(row)">
          编辑
        </BtnLinkPermission>
        <Upload @on:success="handleUpload(row.id, $event)">
          <BtnLinkPermission type="primary">
            上传
          </BtnLinkPermission>
        </Upload>
        <BtnLinkPermission type="info" @click="handleDetail(row)">
          查看
        </BtnLinkPermission>
        <BtnLinkPermission type="danger" @click="handleDelete(row)">
          删除
        </BtnLinkPermission>
      </div>
    </template>
  </TableBase>
</template>

<style scoped></style>
