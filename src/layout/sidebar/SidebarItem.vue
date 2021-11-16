<script setup lang="ts">
import { computed, onMounted, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import Icon from '@/components/Icon/index.vue'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
})

const getChildrenLen = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter(item => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })
    return showingChildren.length
  }
  return 0
})

const getOneChild = computed(() => {
  if (getChildrenLen.value > 1) {
    return null
  }

  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  const cur = { ...props.item, path: '' }
  return cur
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }

  if (routePath === '/dashboard') {
    return routePath
  }

  const path = routePath ? props.basePath + '/' + routePath : props.basePath
  return path
}
</script>

<template>
  <template v-if="getOneChild && !getOneChild.children">
    <SidebarItemLink
      v-if="getOneChild.meta"
      :to="resolvePath(getOneChild.path)"
    >
      <el-menu-item :index="resolvePath(getOneChild.path)">
        <component
          v-if="getOneChild.meta.icon"
          theme="outline"
          strokeWidth="3"
          :is="getOneChild.meta.icon"
        />
        <template #title>
          <span v-if="getOneChild.meta.title">{{
            getOneChild.meta.title
          }}</span>
        </template>
      </el-menu-item>
    </SidebarItemLink>
  </template>

  <el-sub-menu v-else :index="resolvePath(item.path)">
    <template #title>
      <component
        v-if="item.meta.icon"
        theme="outline"
        strokeWidth="3"
        :is="item.meta.icon"
      />
      <span v-if="item.meta">{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children">
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </template>
  </el-sub-menu>
</template>

<style lang="scss">
.is-horizonal {
  .el-menu {
    .el-menu-item {
      &.is-active {
        border-right: none;
        border-bottom: 3px solid $base-color-primary-light1 !important;
      }
    }
  }
}
</style>

<style lang="scss">
.el-menu {
  .el-menu-item {
    .i-icon {
      margin-right: 5px;
    }
    &.is-active {
      border-right: 3px solid $base-color-primary-light1;
      background: $base-color-primary-light9 !important;
    }
  }
}
</style>
