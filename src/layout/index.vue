<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import VLogo from './logo.vue'
import VHeader from './header/index.vue'
import AppMain from './appMain/index.vue'
import VSidebar from './sidebar/index.vue'
import TagViews from './tagViews/index.vue'
import RightPane from '@/layout/components/RightPane/index.vue'

const store = useStore()

const isHorizonal = computed(() => {
  return store.state.setting.menuMode === 'horizontal'
})

const isOpen = computed(() => {
  return !store.state.app.sidebar.open
})
</script>

<template>
  <div :class="['layout', { 'is-horizonal': isHorizonal }]">
    <div class="layout-sidebar">
      <div class="layout-sidebar-wrapper">
        <VLogo v-if="isOpen" />
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

  &.is-horizonal {
    flex-direction: column;
    .layout-body {
      &-wrapper {
        padding: 0 100px;
      }
      
      .layout-main {
        padding: 20px 100px;
      }
    }

    .sidebar-container {
      width: $base-unfold-width !important;
      display: flex;
    }
    .layout-sidebar {
      display: flex;
      justify-content: center;
      min-height: auto;
      border-right: none;
      border-bottom: 1px solid #f6f6f6;

      &-wrapper {
        padding: 0 100px;
        display: flex;
        width: 100%;
        min-height: auto;
        border-right: none;
      }
    }
  }

  .layout-sidebar {
    min-height: 100vh;
    border-right: 1px solid #e1e2e7;
  }

  .layout-body {
    background-color: #fff;
    flex: 1;

    .layout-main {
      padding: 20px;
      background-color: $base-content-bg-color;
    }
  }
}
</style>
