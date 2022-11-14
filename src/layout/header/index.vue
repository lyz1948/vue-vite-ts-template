<script setup lang="ts">
import { useStore } from '@/store'
import Boardcrumb from '../components/Breadcrumb/index.vue'
import RightPane from '../components/RightPane/index.vue'
import useSetting from '@/hooks/useSetting'
import { SettingActionTypes } from '@/store/modules/setting/action-types'

const store = useStore()
const { isMobile, isHorizonal, isOpen } = useSetting()

const toggleSidebar = () => {
  store.dispatch(SettingActionTypes.ACTION_UPDATE_SETTING, {
    type: 'visibleSidebar',
    val: !isOpen.value,
  })
}
</script>

<template>
  <div v-if="!isHorizonal" class="header-container">
    <div class="left">
      <el-link class="menu-icon" @click="toggleSidebar">
        <icon-menu-fold class="icon" size="16" />
      </el-link>
      <Boardcrumb v-if="!isMobile" />
    </div>

    <RightPane />
  </div>
</template>

<style lang="scss">
.layout {
  &.is-mobile {
    .header-container {
      flex: 1 !important;
    }
  }
}
</style>
<style lang="scss" scoped>

.header-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaebf3;
  padding: 0 20px;
  z-index: $base-z-index-max;

  .left {
    display: flex;
    align-items: center;
    .menu-icon {
      margin-right: 20px;
    }
  }
}
</style>
