<script setup lang="ts">
import { useStore } from '@/store/index'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { settingConfig } from '@/config/setting'
import logPng from '@/assets/logo.png'
import useSetting from '@/hooks/useSetting'

const store = useStore()
const { isOpen } = useSetting()

const toggle = () => {
  store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
}

</script>

<template>
  <a class="title" @click="toggle">
    <el-image class="logo" :src="logPng" fit="contain" />
    <span v-if="isOpen">{{ settingConfig.title }}</span>
  </a>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  height: $base-logo-height;
  padding: 0 12px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #7e9cff;
  }

  .logo {
    width: 30px;
    height: 30px;
    padding: 5px;
  }
}

.is-vertical{
  .title {
    border-bottom: 1px solid rgba(#eaebf3, .4);
  }
}

.is-verticle {
  border-bottom: 1px solid rgba(#fff, .4);
}
.is-horizonal {

}

</style>
