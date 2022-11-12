<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store/index'

import Profile from './components/Profile.vue'
import Notice from './components/Notice.vue'
import Translate from './components/Translate.vue'
import Refresh from './components/Refresh.vue'
import Setting from './components/Setting.vue'

import SettingPane from '../SettingPane/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import useDevice from '@/utils/useSetting';

const { isHorizonal } = useDevice()

const store = useStore()

const color = computed(() => isHorizonal.value ? '#fff' : store.state.setting.theme)
</script>

<template>
  <div class="right-pane">
    <div class="item">
      <Notice :color="color" />
    </div>

    <div class="item">
      <ScreenFull :color="color" />
    </div>

    <div class="item">
      <Translate :color="color" />
    </div>

    <div class="item">
      <Setting :color="color" />
    </div>

    <div class="item">
      <Refresh :color="color" />
    </div>

    <div class="item">
      <Profile />
    </div>

    <SettingPane />
  </div>
</template>

<style lang="scss">
.right-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    cursor: pointer;
  }
}
.message-box {
  width: 300px;
  padding: 5px 15px;
  .el-tabs__content {
    margin-bottom: 10px;
  }
  :deep(.el-tabs__active-bar) {
    width: 80px !important;
  }
}
</style>
