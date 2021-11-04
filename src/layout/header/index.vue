<script setup lang="ts">
import Boardcrumb from '../components/Breadcrumb/index.vue'
import RightPane from '../components/RightPane/index.vue'
</script>

<template>
  <div class="header-container">
    <div class="left flexcenter">
      <div class="menu-icon">
        <Icon name="menu-fold" :size="20" />
      </div>
      <Boardcrumb />
    </div>

    <RightPane />
  </div>
</template>

<style lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  border-bottom: $base-border-width-mini solid #fafbff;
  height: $base-main-mobile-no-tag-top;

  .left {
    padding: 0 20px;
    .menu-icon {
      margin-right: 20px;
    }
  }
}
</style>
