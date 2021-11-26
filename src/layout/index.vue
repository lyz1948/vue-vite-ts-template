<script setup lang="ts">
import { computed, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { DeviceType } from '@/store/modules/app/state'
import Horizontal from './Horizontal/index.vue'
import MobileMode from './MobileMode/index.vue'
import Vertical from './Vertical/index.vue'
import useResize from '@/utils/useResize'

const store = useStore()
const { watchRouter, resizeMounted, addEventListenerOnResize, removeEventListenerResize } = useResize()

const isMobie = computed(() => {
  return store.state.app.device == DeviceType.Mobile
})

const isHorizonal = computed(() => {
  return store.state.setting.menuMode === 'horizontal'
})

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
  <MobileMode v-if="isMobie" />
  <Horizontal v-else-if="isHorizonal" />
  <Vertical v-else />
</template>
