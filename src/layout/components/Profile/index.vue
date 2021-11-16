<script setup lang="ts">
import { ref } from 'vue'
const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
</script>

<template>
  <div class="profile">
    <el-avatar
      :size="30"
      :src="circleUrl"
    />
    <el-dropdown>
      <el-link
        type="primary"
        class="name"
      >
        <span class="mr5">张三</span>
        <down
          class="icon-hover down"
          size="16"
        />
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <logout
              class="icon-hover logout mr5"
              title="logout"
            />
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  height: $base-head-menu-height;
  line-height: $base-head-menu-height;
  .name {
    margin-left: 5px;
  }
}
</style>
