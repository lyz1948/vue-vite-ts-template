<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from '@/store'
import { ISelectItem } from '@/types'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { modeOpts } from '@/config/setting'

const emit = defineEmits(['on:change'])
const store = useStore()
const modeOptList = ref(modeOpts)
const modeVal = ref(store.state.setting.menuMode)

const menuMode = computed(() => {
  return store.state.setting.menuMode
})

const changeMenuMode = (item: ISelectItem) => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, { type: 'menuMode', val: item.value })
}

watch(
  () => menuMode.value,
  (val) => {
    modeVal.value = val
  }
)
</script>

<template>
  <SelectBase :list="modeOptList" v-model:value="modeVal" @on:select="changeMenuMode" />
</template>
