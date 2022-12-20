<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import ImageList from '@/components/business/ImageList.vue'
import { SourceActionTypes } from '@/store/modules/system/source/action-types'
import { useStore } from '@/store'

const emit = defineEmits(['on:choose'])
const store = useStore()
const isVisible = ref(false)
const state = reactive({
  curIndex: 0,
  curTypeId: '',
  curTabPic: [],
})

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

const fetchPicTypeList = () => {
  store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST)
}

const fetchPic = typeId => {
  console.log('typeId:', typeId)

  return store.dispatch(SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE, typeId)
}

const show = () => {
  isVisible.value = true
  if (!picTypeList.value) {
    fetchPicTypeList()
  }
}

const hide = () => {
  isVisible.value = false
}

const getCurTabPics = () => {
  const list = getCurTypeIdData.value || []

  return list.map(it => {
    return { check: false, ...it }
  })
}

const changeTag = tabIndex => {
  state.curTypeId = picTypeList.value[tabIndex].id
  state.curTabPic = getCurTabPics(state.curTypeId)

  // 如果还未请求过
  !getCurTypeIdData.value && fetchPic(state.curTypeId)
}

const handleConfirm = () => {
  const checkList = getCurPic.value.filter(it => !!it.check)
  // const picIds = checkList.map(it => ({ picId: it.id }))
  // const pics = checkList.map(it => ({ path: it.path }))
  emit('on:choose', checkList)

  hide()
}

watch(
  () => picTypeList.value,
  data => {
    if (data && data.length) {

      fetchPic(data[state.curIndex].id).then(() => {
        changeTag(state.curIndex)
      })
    }
  },
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
  >
    <el-tabs type="border-card" @tab-change="changeTag">
      <el-tab-pane v-for="(item, index) in picTypeList" :key="index" :label="item.name">
        <ImageList
          v-if="getCurPic.length"
          :list="getCurPic"
          :is-batch="true"
          :size="6"
        />
        <el-empty v-else />
      </el-tab-pane>
    </el-tabs>
  </DialogBase>
</template>

<style lang="scss" scoped>
.el-dialog .material-image {
  height: 500px;
  overflow-y: auto;
}
</style>
