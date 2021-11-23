<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import VLogo from '../logo.vue'
import VHeader from '../header/index.vue'
import AppMain from '../appMain/index.vue'
import VSidebar from '../sidebar/index.vue'
import TagViews from '../tagViews/index.vue'

const store = useStore()

const isOpen = computed(() => {
  return store.state.app.sidebar.open
})
</script>

<template>
  <div :class="['layout is-vertical', { 'is-collapse': !isOpen }]">
    <div class="layout-sidebar">
      <el-scrollbar>
        <VLogo />
        <VSidebar />
      </el-scrollbar>
    </div>
    <div class="layout-body">
      <el-scrollbar>
        <VHeader />
        <TagViews />
        <div class="layout-main">
          <AppMain />
        </div>
        <el-scrollbar />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  &.is-vertical {
    height: 100vh;
    .layout-sidebar {
      width: $base-menu-width;
      border-right: 1px solid #e1e2e7;
      @include scrollbar;

      .el-menu {
        .el-menu-item {
          .i-icon {
            margin-right: 5px;
          }
          &.is-active {
            border-right: 3px solid $base-color-primary;
            background: $base-color-primary-light9 !important;
          }
        }
      }
    }

    .layout-body {
      flex: 1;
      height: 100vh;
      @include scrollbar;
      .layout-main {
        padding: 20px;
        min-height: calc(100vh - $base-head-menu-height - $base-tabs-bar-height);
        background-color: $base-content-bg-color;
      }
    }

    // 左右布局侧栏收起
    &.is-collapse {
      .layout-sidebar {
        width: $base-unfold-width;
      }
      .layout-body {
        width: calc(100vw - $base-unfold-width);
      }
    }
  }
}
</style>
