<script setup lang="ts">
import ModTitle from '@/components/Title/index.vue'

const menuList = [
  { name: '全部', value: 'all' },
  { name: '产品素材', value: 'product' },
  { name: '轮播素材', value: 'swiper' },
]
</script>

<template>
  <div class="material">
    <ModTitle title="素材管理" />
    <div class="content">
      <div class="container">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item, index) in menuList" :key="index" :label="item.name">
            {{ item.name }}
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style></style>
