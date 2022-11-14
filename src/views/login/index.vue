<script setup lang="ts">
import { ref, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import VLogo from '@/layout/logo.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import useResize from '@/utils/useResize'
import useSetting from '@/utils/useSetting'

const store = useStore()
const router = useRouter()
const { isMobile } = useSetting()
const { watchRouter, addEventListenerOnResize, removeEventListenerResize } = useResize()
const activeName = ref('first')

const handleClick = val => {
  console.log(val)
}

watchRouter()

onBeforeMount(() => {
  addEventListenerOnResize()
})

onBeforeUnmount(() => {
  removeEventListenerResize()
})

watch(
  () => router.currentRoute.value,
  route => {
    const redirect = ((route.query && route.query.redirect) || '/') as string
    if (store.state.user.token) {
      router.push(redirect)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="login-container">
    <el-header class="header">
      <VLogo class="logo" />
    </el-header>
    <div class="login-box">
      <div v-if="!isMobile" class="login-side" />
      <div class="login-form" :class="{ 'is-mobile': isMobile }">
        <div class="form-warp">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="first">
              <LoginForm />
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <RegisterForm />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$white: #fff;

.login-container {
  position: relative;
  .header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    color: $white;
    background: transparent;
  }
  .login-box {
    display: flex;
    width: 100%;
    height: 100vh;
    padding-top: 100px;
    overflow: hidden;
    background-color: $dark-bg-color;
    .login-side {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 45vw;
      height: 60%;
      background-image: url('@/assets/login-bg.svg');
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: auto 100%;
      &-wrap {
        height: 60vh;
        margin: auto;
        .img {
          width: 460px;
          margin-top: 10vh;
        }
        .title,
        .desc {
          max-width: 500px;
          font-weight: bold;
          color: $white;
          letter-spacing: 1.2px;
        }
        .desc {
          font-size: 28px;
        }
        .tip {
          color: $white;
        }
      }
    }
    .login-form {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50vw;
      height: 60vh;
      &.is-mobile {
        width: 100%;
        .form-warp {
          width: 100%;
          margin: 0 15px;
        }
      }
      .form-warp {
        width: 500px;
        padding: 1rem 3rem 0 3rem;
        margin: auto;
        background-color: $white;
        border-radius: 8px;
      }
    }
  }
}
</style>
