<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const key = () => {
  return route.path
}

const visibleRoute = computed(() => {
  return store.state.setting.routerView
})
</script>

<template>
  <section class="app-main">
    <!-- <router-view /> -->
    <router-view v-if="visibleRoute" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  padding: 20px;
  background-color: #fff;
}
</style>
