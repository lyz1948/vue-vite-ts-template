<script setup lang="ts">
import { computed, ref } from 'vue';
import ImageList from './imageList.vue'

const imageList = [
  { src: '/src/assets/cover.jpeg', name: 'abc.jpeg', check: false },
  { src: '/src/assets/cover.jpeg', name: '123.jpeg', check: false },
]

const isVisible = ref(false)

const getImageList = computed(() => {
  return Array.from({ length: 100 }).reduce((acc) => {
    acc = [...acc, ...imageList]
    return acc
  }, [])
})

const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}

const handleConfirm = () => {
  // TODO:
  hide()
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <DialogBase
    title="素材图片"
    :visible="isVisible"
    @on:visible="isVisible = $event"
    @on:confirm="handleConfirm"
    @on:cancel="hide"
  >
    <ImageList :list="getImageList" is-operate :size="6" />
  </DialogBase>
</template>

<style lang="scss" scoped>
.el-dialog .material-image {
  max-height: 600px;
  overflow-y: auto;
}
</style>