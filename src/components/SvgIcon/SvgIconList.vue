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
      <div class="svg-icon-box" :class="{ active: activeIcon == icon }">
        <SvgIcon
          :name="icon"
          fill="#f50"
          size="24px"
          @click="select(icon)"
        />
      </div>
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
  display: flex;
  flex-wrap: wrap;
  .svg-icon-box {
    width: 30px;
    height: 30px;
    margin: 0 5px 5px 0;
    border: 1px solid #ddd;
    &.active {
      border: 1px solid #fb748b;
    }
  }
}
</style>
