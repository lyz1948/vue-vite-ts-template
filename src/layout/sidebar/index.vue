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

const menuBgColor = computed(() => {
  return store.state.setting.theme
})

const menuTextColor = computed(() => {
  return store.state.setting.menuColor
})

const menuTextActiveColor = computed(() => {
  return store.state.setting.menuActiveColor
})

const sidebar = computed(() => {
  return store.state.setting.visibleSidebar
})

const isCollapse = computed(() => {
  return !sidebar.value
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
  <el-menu
    class="sidebar-menu"
    :mode="getMenuMode"
    :active="activeMenu"
    :collapse="isCollapse"
    :default-active="defaultActive"
    :background-color="menuBgColor"
    :text-color="menuTextColor"
    :active-text-color="menuTextActiveColor"
    :collapse-transition="true"
  >
    <template v-for="route in routes">
      <SidebarItem
        v-if="!route.meta || !route.meta.hidden"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.sidebar-menu {
  border: none;
  width: 100%;
  z-index: $base-z-index-max;
}

.is-horizonal {
  .sidebar-menu {
    flex: 1;
    // border-bottom: 1px solid #ddd;
  }
  .el-menu--horizontal {
    border-bottom: none !important;
  }

 
}
</style>
