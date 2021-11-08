<script setup lang="ts">
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const key = () => {
  return route.path
}
</script>

<template>
  <section class="app-main">
    <router-view />
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view> -->
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  padding: 20px;
  background-color: #fff;
}
</style>
