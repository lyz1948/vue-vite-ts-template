<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import Horizontal from './horizontal/index.vue'
import MobileMode from './mobileMode/index.vue'
import Vertical from './vertical/index.vue'
import useResize from '@/utils/useResize'
import useDevice from '@/utils/useSetting'

const { isMobile, isHorizonal } = useDevice()
const { watchRouter, resizeMounted, addEventListenerOnResize, removeEventListenerResize } = useResize()

watchRouter()
onBeforeMount(() => {
  addEventListenerOnResize()
})

onMounted(() => {
  resizeMounted()
})

onBeforeUnmount(() => {
  removeEventListenerResize()
})
</script>

<template>
  <MobileMode v-if="isMobile" />
  <Horizontal v-else-if="isHorizonal" />
  <Vertical v-else />
</template>
