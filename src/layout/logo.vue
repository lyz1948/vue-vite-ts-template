<script setup lang="ts">
import { useStore } from '@/store/index'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { settingConfig } from '@/config/setting'
import logPng from '@/assets/logo.png'
import useSetting from '@/utils/useSetting'

const store = useStore()
const { isOpen } = useSetting()
const toggle = () => {
  store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
}

</script>

<template>
  <div class="logo" @click="toggle">
    <el-image class="logo-image" :src="logPng" fit="contain" />
    <span v-if="isOpen" class="logo-text">{{ settingConfig.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: $base-logo-height;

  &-image {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
  &-text {
    font-size: 18px;
  }
}
</style>
