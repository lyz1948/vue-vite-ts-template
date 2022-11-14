<script setup lang="ts">
import errorPng from '@/assets/401.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-page-wrapper">
      <div class="error-page-content">
        <div class="title">
          抱歉!
        </div>
        <div class="desc">
          你没有权限去该页面...
        </div>
        <div class="remark">
          请联系管理员，或点击下面的按钮返回首页
        </div>

        <BtnBase type="back" @click="handleBack">
          返回首页
        </BtnBase>
      </div>
      <div class="error-page-image flexcenter">
        <el-image :src="errorPng" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/error-page.scss';
</style>
