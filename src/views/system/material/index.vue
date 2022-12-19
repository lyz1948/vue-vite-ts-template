<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import ModTitle from '@/components/Title/index.vue'
import ImageList from '@/components/business/ImageList.vue'
import Upload from '@/components/Uploader/index.vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { SourcMutationTypes } from '@/store/modules/system/source/mutation-types'

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
    return { check: false, ...it }
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

const changeTag = ({ index }) => {
  state.curTypeId = picTypeList.value[index].id
  state.curIndex = index

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
      path: url,
      picTypeId: state.curTypeId,
    }).then(() => {
      fetchPicTypeList().then((res) => {
        fetchPic(res[state.curIndex].id)
      })
    })
  } 
}

const handleDelete = item => {
  const { id } = item

  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_DEL, id)
    .then(() => {
      const curList = getCurTabPics(state.curTypeId)
      curList.splice(curList.findIndex(it => it.id == id), 1)

      state.curTabPics = curList

      store.commit(SourcMutationTypes.SOURCE_PIC_BY_TYPE, { id: state.curTypeId, data: curList })
    })
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
    changeTag({ index: fIndex })
    state.curIndex = fIndex
    state.tabName = typeList[fIndex].name
  } else {
    // changeTag({ index: state.curIndex })
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
        <el-tabs v-model="state.tabName" @tab-click="changeTag">
          <el-tab-pane
            v-for="(item, index) in picTypeList"
            :key="index"
            :label="item.name"
            :name="item.name"
          />
        </el-tabs>
        <ImageList
          v-if="getCurPic.length"
          :list="getCurPic"
          :is-batch="hasBatch"
          @on:delete="handleDelete"
        />
        <el-empty v-else />
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
