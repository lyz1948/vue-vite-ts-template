<script setup lang="ts">
import { themeColorOpts } from '@/config/setting'
import { ref } from 'vue'

const emit = defineEmits(['on:click'])
const props = defineProps({
  list: {
    type: Array,
    default: () => (themeColorOpts)
  },
  value: {
    type: String,
    default: '',
  }
})

const curIndex = ref('')

const selectColor = (index, val) => {
  curIndex.value = index
  emit('on:click', val)
}

const customColor = (val) => {
  emit('on:click', val)
}

</script>

<template>
  <div class="color-wrap">
    <span
      v-for="(item, index) in props.list"
      :key="item"
      :style="'background: ' + item"
      :class="index === curIndex ? 'is-active' : ''"
      @click="selectColor(index, item)"
    />
    <el-color-picker v-model="props.value" @change="customColor" />
  </div>
</template>

<style lang="scss" scope>
@import '@/styles/variables.scss';

.color-wrap {
  display: flex;
  flex-wrap: wrap;
  > span {
    display: inline-block;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    cursor: pointer;
    &.is-active {
      border: 1px solid $base-color-border;
      padding: 2px;
    }
  }
}
</style>