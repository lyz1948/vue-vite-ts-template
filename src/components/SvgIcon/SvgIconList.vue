<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref, computed, onMounted } from 'vue'

const iconFiles = import.meta.globEager('../../assets/icon/*.svg')

const emit = defineEmits(['on:select'])
const icons = ref([])
const activeIcon = ref('')

const select = val => {
  activeIcon.value = val
  emit('on:select', val)
}

const getIconList = computed(() => icons.value)

onMounted(() => {
  for (const path in iconFiles) {
    const val = path.split('/icon/')[1].split('.svg')[0]
    icons.value.push(val)
  }
})
</script>

<template>
  <div v-if="getIconList.length" class="svg-comp">
    <template v-for="icon in getIconList" :key="icon">
      <SvgIcon
        :name="icon"
        color="#000"
        size="24"
        :class="{ 'active': activeIcon == icon }"
        @click="select(icon)"
      />
      <!-- <SvgIcon
        size="36"
        color="#666699"
        name="地图距离_map-distance"
        :class="{ 'active': activeIcon == icon }"
        @click="select(icon)"
      /> -->
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
