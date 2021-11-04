<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
const drawer = ref(false)

defineProps({
  direction: {
    type: String,
    default: 'rtl',
  },
})

const store = useStore()

const settingStatus = computed(() => {
  return store.state.setting.visibleSetting
})

const handleClose = () => {
  store.dispatch(SettingActionTypes.ACTION_TOGGLE_SETTING, false)
}
</script>

<template>
  <el-drawer
    v-model="settingStatus"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>
