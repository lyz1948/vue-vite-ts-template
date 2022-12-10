<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Refund from './components/Refund.vue'
import Active from './components/Active.vue'
import Telephone from './components/Telephone.vue'
import Message from './components/Message.vue'

import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'

const tabMenus = [
  { label: '退改签规则', name: 'Refund', component: Refund },
  { label: '活动时效', name: 'Active', component: Active },
  { label: '电话设置', name: 'Telephone', component: Telephone },
  { label: '短信通知设置', name: 'Message', component: Message },
]

const store = useStore()
const activeName = ref('Refund')
const activeIndex = ref(0)
const state = reactive({
  data: null,
})

const fetchData = () => {
  return store.dispatch(AppActionTypes.ACTION_MALL_CONFIG)
}

const handleClick = (tab: TabsPaneContext) => {
  activeIndex.value = tab.index
}

onBeforeMount(() => {
  state.data = fetchData()

  console.log(state.data)
})
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

<style lang="scss">
@import '@/styles/variables.scss';

.mod-wrap {

}

.mod-title {
  padding: 16px 0;
  border-bottom: 1px solid $base-color-border;
}

.mod-foot {
  color: $base-font-color;
  p {
    font-size: $base-font-size-medium;
  }
}

.field-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: $base-font-size-small;
  color: $base-font-color;
  margin-top: 12px;

  .input-base {
    flex: 0 0 100px;
    margin: 0 10px;
  }
}
</style>
