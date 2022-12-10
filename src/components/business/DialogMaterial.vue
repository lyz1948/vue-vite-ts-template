<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import ImageList from '@/components/business/ImageList.vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'

const store = useStore()
const isVisible = ref(false)
const state = reactive({
  curIndex: 0,
  curTypeId: '',
  curTabPic: [],
})

const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}

// 图片分类
const picTypeList = computed(() => {
  return store.state.source.picTypeList
})

// 图片分类下的图片
const picTypeImagesData = computed(() => {
  return store.state.source.picByTypeList
})

const getCurTypeIdData = computed(() => {
  return picTypeImagesData.value[state.curTypeId]
})

const getCurPic = computed(() => {
  return state.curTabPic
})

const getCurTabPics = () => {
  const list = getCurTypeIdData.value || []

  return list.map(it => {
    return { check: false, src: it }
  })
}

const fetchPicTypeList = () => {
  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST)
}

const fetchPic = typeId => {
  return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE, typeId)
}

const changeTag = tabIndex => {
  state.curTypeId = picTypeList.value[tabIndex].id
  state.curTabPic = getCurTabPics(state.curTypeId)

  // 如果还未请求过
  !getCurTypeIdData.value && fetchPic(state.curTypeId)
}

onBeforeMount(() => {
  if (!picTypeList.value) {
    fetchPicTypeList()
  }
})

watch(
  () => picTypeList.value,
  data => {
    if (data && data.length) {
      fetchPic(data[state.curIndex].id).then(() => {
        changeTag(state.curIndex)
      })
    }
  },
  { immediate: true }
)

defineExpose({
  show,
  hide,
})
</script>

<template>
  <DialogBase
    title="素材图片"
    :visible="isVisible"
    width="1280px"
    @on:visible="isVisible = $event"
    @on:confirm="handleConfirm"
    @on:cancel="hide"
  >
    <el-tabs type="border-card" @tab-change="changeTag">
      <el-tab-pane v-for="(item, index) in picTypeList" :key="index" :label="item.name">
        <ImageList v-if="getCurPic.length" :list="getCurPic" :is-batch="hasBatch" />
        <el-empty v-else />
      </el-tab-pane>
    </el-tabs>
  </DialogBase>
</template>

<style lang="scss" scoped>
.el-dialog .material-image {
  max-height: 600px;
  overflow-y: auto;
}
</style>
