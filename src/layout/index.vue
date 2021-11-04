<script setup lang="ts">
import VSidebar from './sidebar/index.vue'
import VHeader from './header/index.vue'
import TagViews from './tagViews/index.vue'
import AppMain from './appMain/index.vue'
import VLogo from './logo.vue'
</script>

<template>
  <div class="layout">
    <div class="layout-sidebar">
      <VLogo />
      <VSidebar />
    </div>
    <div class="layout-body">
      <VHeader />
      <TagViews />
      <div class="layout-main">
        <AppMain />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;

  .layout-sidebar {
    min-height: 100vh;
    min-height: 100vh;
    border-right: 1px solid $base-border-color;
  }

  .layout-body {
    flex: 1;
    background-color: #fff;

    .layout-main {
      padding: 20px;
      background-color: $base-content-bg-color;
    }
  }
}
</style>
