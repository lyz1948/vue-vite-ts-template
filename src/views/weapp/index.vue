<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Banner from './components/Banner.vue'
import Category from './components/Category.vue'
import Recommend from './components/Recommend.vue'

const tabMenus = [
  { label: '轮播图设置', name: 'Banner', component: Banner },
  { label: '类目设置', name: 'Category', component: Category },
  { label: '热门推荐', name: 'Recommend', component: Recommend },
]

const activeName = ref('Banner')
const activeIndex = ref(0)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  activeIndex.value = tab.index
}

</script>

<template>
  <div class="weapp">
    <div class="container">
      <div class="content">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <template v-for="item in tabMenus" :key="item.name">
            <el-tab-pane :label="item.label" :name="item.name">
              <component :is="item.component" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
