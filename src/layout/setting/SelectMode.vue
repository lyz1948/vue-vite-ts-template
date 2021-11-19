<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { ISelectItem } from '@/types'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { modeOpts } from '@/config/setting'

const emit = defineEmits(['on:change'])
const store = useStore()
const modeOptList = ref(modeOpts)

const modeVal = computed(() => {
  return store.state.setting.menuMode
})

const changeMenuMode = (item: ISelectItem) => {
  store.dispatch(SettingActionTypes.ACTION_MENU_MODE, item.value)
}
</script>

<template>
  <SelectBase :list="modeOptList" :value="modeVal" @on:select="changeMenuMode" />
</template>
