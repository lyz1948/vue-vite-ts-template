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
    }
    .layout-sidebar {
      display: flex;
      justify-content: center;
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
  .layout-body {
    background-color: #fff;

    .layout-main {
      padding: 20px;
      background-color: $base-content-bg-color;
    }
  }
}
</style>
