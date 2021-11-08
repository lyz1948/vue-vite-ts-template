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
      <VLogo v-if="isOpen" />
      <VSidebar />
      <RightPane v-if="isHorizonal" />
    </div>
    <div class="layout-body">
      <VHeader />
      <TagViews />
      <div class="layout-main">
        <AppMain />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;

  &.is-horizonal {
    flex-direction: column;
    padding: 0 100px;
    .sidebar-container {
      width: $base-unfold-width !important;
    }
    .layout-sidebar {
      display: flex;
      width: 100%;
      min-height: auto;
      border-right: none;
    }
  }

  .layout-sidebar {
    min-height: 100vh;
    border-right: 1px solid $base-border-color;
    box-sizing: border-box;
    z-index: $base-z-index-default;
  }

  .layout-body {
    flex: 1;
    background-color: #fff;

    .layout-main {
      padding: 20px;
      background-color: $base-content-bg-color;
    }
  }
}
</style>
