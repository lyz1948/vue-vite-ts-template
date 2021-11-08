<script setup lang="ts">
import { useStore } from '@/store/index'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { computed } from 'vue'
const store = useStore()

import logPng from '@/assets/logo.png'

const toggle = () => {
  store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
}
</script>

<template>
  <div class="logo" @click="toggle">
    <el-image class="logo-image" :src="logPng" fit="contain"></el-image>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $base-logo-width;
  height: $base-logo-height;
}
</style>
