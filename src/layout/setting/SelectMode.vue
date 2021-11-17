<script setup lang="ts">
import { ref, computed } from 'vue'
import { modeOpts } from './data'
import { useStore } from '@/store'

const emit = defineEmits(['on:change'])
const store = useStore()
const modeOptList = ref(modeOpts)

const modeVal = computed(() => {
  return store.state.setting.menuMode
})
</script>

<template>
  <SelectBase :list="modeOptList" v-model:value="modeVal" />
</template>
