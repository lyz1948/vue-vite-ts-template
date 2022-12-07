<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref, onBeforeMount, computed } from 'vue'

const iconFiles = import.meta.globEager('../../assets/icon/*.svg')

const icons = ref([])
const activeIcon = ref('')

const select = val => {
  activeIcon.value = val
}

const getIconList = computed(() => icons.value)

onBeforeMount(() => {
  for (const path in iconFiles) {
    const val = path.split('/icon/')[1].split('.svg')[0]
    icons.value.push(val)
  }
})
</script>

<template>
  <div class="svg-comp">
    <template v-for="icon in getIconList" :key="icon">
      <SvgIcon
        size="36px"
        color="#666699"
        :name="icon"
        :class="{ 'active': activeIcon == icon }"
        @click="select(icon)"
      />
    </template>
  </div>
</template>

<style lang="scss">
.svg-comp {
  .svg-icon {
    &.active {
      border: 2px solid #fb748b;
    }
  }
}
</style>
