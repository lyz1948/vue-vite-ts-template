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

const sidebar = computed(() => {
  return store.state.app.sidebar
})

const isCollapse = computed(() => {
  return sidebar.value.open
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
      mode="vertical"
      :unique-opened="false"
      :collapse="!isCollapse"
      :default-active="activeMenu"
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

<style lang="scss">
.sidebar-container {
  .sidebar-menu {
    border: none;
    width: 200px;
  }
}
</style>
