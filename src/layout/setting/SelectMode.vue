<script setup lang="ts">
import Select from '@/components/Select/index.vue'
import { ref, computed } from 'vue'
import { modeOpts } from './data'
import { useStore } from '@/store'

const store = useStore()
const modeOptList = ref(modeOpts)

const modeVal = computed(() => {
  return store.state.setting.menuMode
})
</script>

<template>
  <Select :options="modeOptList" :value="modeVal" />
</template>
