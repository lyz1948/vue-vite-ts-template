<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { TagsActionTypes } from '@/store/modules/tagViews/action-types'
import { SettingActionTypes } from '@/store/modules/setting/action-types'
import { IRouter, ITagView } from '@/types'

const store = useStore()
const router = useRouter()
const currentRoute = useRoute()

const visible = ref(false)
const state = reactive({
  activeName: '',
})

interface ICommand {
  command: string
  text: string
  icon: string
}
const commandList: Array<ICommand> = [
  {
    command: SettingActionTypes.ACTION_MENU_REFRESH,
    text: '刷新',
    icon: 'icon-refresh',
  },
  {
    command: TagsActionTypes.ACTION_DEL_OTHER_VIEW,
    text: '关闭其他',
    icon: 'icon-close',
  },
  {
    command: TagsActionTypes.ACTION_DEL_LEFT_VIEWS,
    text: '关闭左侧',
    icon: 'icon-to-left',
  },
  {
    command: TagsActionTypes.ACTION_DEL_RIGHT_VIEWS,
    text: '关闭右侧',
    icon: 'icon-to-right',
  },
  {
    command: TagsActionTypes.ACTION_DEL_ALL_VIEWS,
    text: '关闭所有',
    icon: 'icon-minus',
  },
]

const isActive = (route: IRouter) => {
  return route.path === currentRoute.path
}

const isAffix = (tag: ITagView) => {
  return tag.meta && tag.meta.affix
}

const visitedViews = computed(() => {
  return store.state.tagViews.visitedViews
})

const routes = computed(() => store.state.permission.routes)

const filterAffixTags = (routes: RouteRecordRaw[] | IRouter[]) => {
  let tags: ITagView[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      tags.push({
        fullPath: route.path,
        path: route.path,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}

const addTabs = () => {
  if (currentRoute.name) {
    store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute)
  }
  return false
}

const initTabs = () => {
  const affixTabs = filterAffixTags(routes.value)
  for (const tab of affixTabs) {
    if (tab.name) {
      store.dispatch(TagsActionTypes.ACTION_ADD_VISITED_VIEW, tab)
    }
  }
}

const handleTab = (tab: any) => {
  const index = tab.index
  const route = visitedViews.value.find((it, idx) => {
    if (index == idx) return it
  }) as any

  if (currentRoute.path === route.path) return false

  router.push({
    path: route.path,
    query: route.query,
    fullPath: route.fullPath,
  })
}

const handleCommand = async (command: ICommand) => {
  const view = await activeTagRoute()
  store.dispatch(command, view as any)
}

const activeTagRoute = async () => {
  const { fullPath, path } = currentRoute

  const view = visitedViews.value.find((it) => it.path === fullPath)

  if (view?.path !== path) {
    router.push(path)
  }

  return view
}

const handleShow = () => {}
const handleHide = () => {}

watch(
  () => currentRoute.name,
  () => {
    if (currentRoute.name != 'Login') {
      initTabs()
      addTabs()

      const findRoute = visitedViews.value.find((it, idx) => {
        if (it.path == currentRoute.path) return it
      }) as any

      state.activeName = findRoute.fullPath
    }
  },
  { immediate: true }
)
</script>

<template>
  <div id="tabs-bar-container" class="tabs-bar-container">
    <div class="tags-view-wrapper">
      <el-tabs v-model="state.activeName" type="card" class="tabs-content" @tab-click="handleTab">
        <el-tab-pane v-for="tag in visitedViews" :name="tag.path" class="tags-view-item">
          <template #label>
            <div class="item">
              <component
                class="menu-icon"
                v-if="tag.meta.icon"
                theme="outline"
                strokeWidth="3"
                :is="tag.meta.icon"
              />
              <span>
                {{ tag.meta.title }}
              </span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-popover
      placement="bottom"
      width="auto"
      trigger="hover"
      @show="handleShow"
      @hide="handleHide"
    >
      <template #reference>
        <span class="more" :class="{ active: visible }" style="cursor: pointer">
          <icon-all-application theme="filled" size="18" :strokeWidth="3" />
        </span>
      </template>
      <div
        class="command-item"
        v-for="(item, index) in commandList"
        :key="index"
        @click="handleCommand(item.command)"
      >
        <component class="icon" theme="filled" size="14" :strokeWidth="3" :is="item.icon" />
        <span class="command-label">{{ item.text }}</span>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-wrapper {
  flex: 1;
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-left: $base-padding;
  padding-right: $base-padding;
  user-select: none;
  background: $base-color-white;
  &.horizontal {
    padding: 0 40px;
  }
  :deep(.fold-unfold) {
    margin-right: $base-padding;
  }
  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
  }
  .item {
    display: inline-flex;
    align-items: center;
    .menu-icon {
      display: flex;
      padding-right: $base-margin-5;
    }
  }
  .tabs-content {
    width: calc(100% - 90px);
    height: $base-tag-item-height;
    :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }
    :deep(.el-tabs__header) {
      border-bottom: 0;
      .el-tabs__nav {
        border: 0;
        .el-tabs__item {
          box-sizing: border-box;
          height: $base-tag-item-height;
          margin-right: $base-margin-5;
          line-height: $base-tag-item-height;
          border: none;
          border-radius: $base-border-radius;
          transition: padding 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
          &.is-active {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
          &:hover {
            color: $base-color-primary;
            background: $base-color-primary-light9;
            border: none;
            border-bottom: 2px solid;
          }
        }
      }
    }
  }
}
.command-item {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  .command-label {
    padding-left: 5px;
  }
  &:hover {
    color: $base-color-primary;
    background-color: $base-color-primary-light9;
  }
  .icon {
    display: flex;
  }
}
.more {
  display: flex;
  align-content: center;
  align-items: center;
  color: $base-font-color;
  cursor: pointer;
  transition: all 0.5s;
  &.active {
    color: $base-color-primary !important;
    transform: rotate(180deg);
  }
}
</style>
