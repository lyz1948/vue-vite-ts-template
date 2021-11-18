<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const store = useStore()
const router = useRoute()

const routes = computed(() => {
  return store.state.permission.routes
})

const getMenuMode = computed(() => {
  return store.state.setting.menuMode
})

const sidebar = computed(() => {
  return store.state.app.sidebar
})

const isCollapse = computed(() => {
  return !sidebar.value.open
})

const defaultActive = computed(() => {
  const { fullPath } = router
  return fullPath || '/dashboard'
})

const activeMenu = computed(() => {
  const { path, meta } = router
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu
    }
  }
  return path
})
</script>

<template>
  <div class="sidebar-container">
    <el-menu
      class="sidebar-menu"
      :mode="getMenuMode"
      :active="activeMenu"
      :collapse="isCollapse"
      :default-active="defaultActive"
      :collapse-transition="true"
    >
      <template v-for="route in routes">
        <template v-if="!route.meta || !route.meta.hidden">
          <SidebarItem :item="route" :key="route.path" :base-path="route.path" />
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scope>
.is-horizonal {
  .sidebar-menu {
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
}
</style>

<style lang="scss">
.is-collapse {
  .sidebar-container {
    width: $base-unfold-width;
  }
}
</style>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex: 1;

  .el-menu--horizontal {
    border-bottom: none !important;
  }
  .sidebar-menu {
    border: none;
    width: 100%;
  }
}
</style>
