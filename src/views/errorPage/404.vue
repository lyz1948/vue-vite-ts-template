<script setup lang="ts">
import { useRouter } from 'vue-router'
import errorPng from '@/assets/404.svg'

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
          当前页面不存在...
        </div>
        <div class="remark">
          请检查您输入的网址是否正确，或点击下面的按钮返回首页
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
