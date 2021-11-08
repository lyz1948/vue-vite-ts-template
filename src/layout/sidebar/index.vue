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
  return sidebar.value.open
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
  <div :class="['sidebar-container', { 'is-collapse': isCollapse }]">
    <el-menu
      class="sidebar-menu"
      :mode="getMenuMode"
      :collapse="isCollapse"
      :default-active="defaultActive"
      :collapse-transition="true"
    >
      <template v-for="route in routes">
        <template v-if="!route.meta || !route.meta.hidden">
          <SidebarItem
            :item="route"
            :key="route.path"
            :base-path="route.path"
          />
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
.sidebar-container {
  display: flex;
  flex: 1;
  width: $base-menu-width;
  &.is-collapse {
    width: $base-unfold-width;
  }
  .sidebar-menu {
    border: none;
    width: 100%;
  }
}
</style>
