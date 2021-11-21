<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import VLogo from './logo.vue'
import VHeader from './header/index.vue'
import AppMain from './appMain/index.vue'
import VSidebar from './sidebar/index.vue'
import TagViews from './tagViews/index.vue'
import RightPane from './components/RightPane/index.vue'

const store = useStore()

const isHorizonal = computed(() => {
  return store.state.setting.menuMode === 'horizontal'
})

const isOpen = computed(() => {
  return store.state.app.sidebar.open
})
</script>

<template>
  <div :class="['layout', { 'is-horizonal': isHorizonal, 'is-collapse': !isOpen }]">
    <div class="layout-sidebar">
      <div class="layout-sidebar-wrapper">
        <VLogo />
        <VSidebar />
        <RightPane v-if="isHorizonal" />
      </div>
    </div>
    <div class="layout-body">
      <div class="layout-body-wrapper">
        <VHeader />
        <TagViews />
      </div>
      <div class="layout-main">
        <AppMain />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;

  // 左右布局侧栏收起
  &.is-collapse {
    .layout-sidebar {
      width: $base-unfold-width;
    }
    .layout-body {
      width: calc(100vw - $base-unfold-width);
    }
  }

  // 上下布局
  &.is-horizonal {
    flex-direction: column;
    .layout-body {
      width: 100%;
      &-wrapper {
        padding: 0 100px;

        .tabs-bar-container {
          padding: 0;
        }
      }

      .layout-main {
        padding: 20px 100px;
      }
    }

    .layout-sidebar {
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: auto;
      border-right: none;
      border-bottom: 1px solid #f6f6f6;

      &-wrapper {
        padding: 0 100px;
        display: flex;
        width: 100%;
        min-height: auto;
        border-right: none;

        .sidebar-container {
          display: flex;
          padding: 0 20px;

          .el-menu--horizontal {
            border-bottom: none !important;
          }
        }
      }
    }
  }

  .layout-sidebar {
    min-height: 100vh;
    width: $base-menu-width;
    border-right: 1px solid #e1e2e7;
    &-wrapper {
    }
  }

  .layout-body {
    width: calc(100vw - $base-menu-width);

    .layout-main {
      padding: 20px;
      min-height: calc(100vh - $base-head-menu-height - $base-tabs-bar-height);
      background-color: $base-content-bg-color;
    }
  }
}
</style>
