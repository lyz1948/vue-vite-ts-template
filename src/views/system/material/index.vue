<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import ImageList from '@/components/business/ImageList.vue'
import Upload from '@/components/Uploader/index.vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'
import { getUploadFileName } from '@/config/upload'
import { useRoute } from 'vue-router'

const store = useStore()
const currentRoute = useRoute()
const state = reactive({
  loading: false,
  curIndex: 0,
  curTypeId: '',
  curTabPics: [],
  tabName: '',
})

const isBatch = ref(false)
const hasBatch = computed(() => isBatch.value)

const getBatchType = computed(() => (hasBatch.value ? 'success' : 'danger'))
const getBatchText = computed(() => (hasBatch.value ? '取消操作' : '批量操作'))

// 图片分类
const picTypeList = computed(() => {
  return store.state.source.picTypeList
})

// 图片分类下的图片
const picTypeImagesData = computed(() => {
  return store.state.source.picByTypeList
})

const getCurTabPics = (id) => {
  const list = picTypeImagesData.value[id]

  return list.map(it => {
    return { check: false, src: it }
  })
}

const getCurPic = computed(() => {
  return state.curTabPics
})

const fetchPicTypeList = () => {
  return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST)
}

const fetchPic = typeId => {
  return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE, typeId).then(() => {
    state.curTabPics = getCurTabPics(typeId)
  })
}

const changeTag = tabIndex => {
  state.curTypeId = picTypeList.value[tabIndex].id
  state.curIndex = tabIndex

  if (!picTypeImagesData.value[state.curTypeId]) {
    fetchPic(picTypeList.value[state.curIndex].id)
  } else {
    state.curTabPics = getCurTabPics(state.curTypeId)
  }

}

const handleUpload = (data) => {
  const { url } = data
  if (url !== '') {
    store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD, {
      path: getUploadFileName(url),
      picTypeId: state.curTypeId,
    }).then(() => {
      fetchPicTypeList().then((data) => {
        fetchPic(data[state.curIndex].id)
      })
    })
  } 
}

onBeforeMount(() => {
  if (!picTypeList.value) {
    fetchPicTypeList()
  }
})

onMounted(() => {
  const { id } = currentRoute.query
  const typeList = picTypeList.value
  if (id && typeList) {
    const fIndex = typeList.findIndex(it => it.id == id)
    changeTag(fIndex)
    state.curIndex = fIndex
    state.tabName = typeList[fIndex].name
  }
})

watch(
  () => picTypeList.value,
  data => {
    if (data && data.length) {
      fetchPic(data[state.curIndex].id)
    }
  },
)

</script>

<template>
  <div class="material">
    <!-- <DialogMaterial ref="dialogRef" /> -->
    <ModTitle title="素材管理">
      <div class="tag-wrap">
        <Upload @on:success="handleUpload">
          <BtnBase type="primary">
            上传素材
          </BtnBase>
        </Upload>
        <span class="ml5" />
        <BtnBase :type="getBatchType" @click="isBatch = !isBatch">
          {{ getBatchText }}
        </BtnBase>
      </div>
    </ModTitle>
    <div class="content">
      <div class="container">
        <el-tabs v-model="state.tabName" @tab-change="changeTag">
          <el-tab-pane
            v-for="(item, index) in picTypeList"
            :key="index"
            :label="item.name"
            :name="item.name"
          />
        </el-tabs>
        <ImageList v-if="getCurPic.length" :list="getCurPic" :is-batch="hasBatch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tag-wrap {
  display: flex;
  justify-content: flex-end;
  .tag-item {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
