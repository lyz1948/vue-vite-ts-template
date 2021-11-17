<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { noticeList } from './data'
import Profile from '../Profile/index.vue'
import SettingPane from '@/layout/setting/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import { SettingActionTypes } from '@/store/modules/setting/action-types'

defineProps({
  color: {
    type: String,
    default: '#666',
  },
})

const store = useStore()
const activeName = ref('first')

const showSetting = () => {
  store.dispatch(SettingActionTypes.ACTION_TOGGLE_SETTING, true)
}
</script>

<template>
  <div class="right-pane">
    <div class="item">
      <el-dropdown trigger="click">
        <el-badge :value="12" class="badge">
          <el-link>
            <remind
              class="remind"
              title="remind"
              theme="outline"
              size="16"
              :stroke-width="4"
              :fill="color"
            />
          </el-link>
        </el-badge>
        <template #dropdown>
          <div class="message-box">
            <el-tabs v-model="activeName" stretch>
              <el-tab-pane label="系统消息5" name="first">
                <Cell :list="noticeList" />
              </el-tab-pane>
              <el-tab-pane label="订单消息" name="second"> 暂无消息 </el-tab-pane>
            </el-tabs>
          </div>
        </template>
      </el-dropdown>
    </div>

    <div class="item">
      <ScreenFull icon="full-screen-one" />
    </div>

    <div class="item">
      <el-link>
        <refresh
          class="refresh"
          title="refresh"
          theme="outline"
          size="16"
          :stroke-width="4"
          :fill="color"
        />
      </el-link>
    </div>

    <div class="item">
      <el-link>
        <setting
          class="setting"
          title="setting"
          theme="outline"
          size="16"
          :stroke-width="4"
          :fill="color"
          @click="showSetting"
        />
      </el-link>
    </div>

    <div class="item">
      <Profile />
    </div>
    <SettingPane />
  </div>
</template>

<style lang="scss">
.right-pane {
  display: flex;
  line-height: $base-head-menu-height;
  .item {
    margin-right: 15px;
    cursor: pointer;
  }
}
.message-box {
  width: 300px;
  padding: 5px 15px;
  .el-tabs__content {
    margin-bottom: 10px;
  }
  :deep(.el-tabs__active-bar) {
    width: 80px !important;
  }
}
</style>
