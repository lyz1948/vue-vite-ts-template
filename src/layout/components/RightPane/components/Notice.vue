<script setup lang="ts">
import { ref } from 'vue'
import { noticeList } from '../data'

defineProps({
  color: {
    type: String,
    required: true,
  },
})
const activeName = ref('first')

</script>

<template>
  <el-dropdown trigger="click">
    <el-badge :value="12" class="badge">
      <el-link>
        <icon-remind
          class="remind"
          title="消息"
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
          <el-tab-pane label="通知" name="first">
            <Cell :list="noticeList" />
          </el-tab-pane>
          <el-tab-pane label="消息" name="second">
            暂无数据
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </el-dropdown>
</template>
