<script setup lang="ts">
import useElement from '@/hooks/useElement'
import { ref, nextTick, onMounted, computed } from 'vue'

interface Props {
  isOperate?: boolean
  isBatch?: boolean
  list: array<any>
  size?: number
}

const props = defineProps<Props>()

const { confirm } = useElement()

const imageSize = ref(120)

const getStyle = computed(() => {
  return `width: ${imageSize.value}px`
})

const selectItem = item => {
  if (!props.isOperate && !props.isBatch) {
    confirm('确定要删除吗', '警告').then(() => {
      console.log('删除了')
    })
  } else {
    item.check = !item.check
  }
}

onMounted(() => {
  nextTick().then(() => {
    const el = document.querySelector('.material-image');
    imageSize.value = Math.floor(el.clientWidth / (props.size || 9))
  })
})

</script>

<template>
  <div class="material-image">
    <div class="material-image--list">
      <div
        v-for="(item, i) in props.list"
        :key="i"
        :style="getStyle"
        class="material-image--item"
      >
        <div class="inner" @click="selectItem(item)">
          <div v-if="props.isBatch" class="check-box">
            <el-checkbox v-model="item.check" size="large" type="success" />
          </div>
          <div class="img-box">
            <img :src="item.src" alt="">
          </div>

          <template v-if="!props.isBatch">
            <div v-if="!props.isOperate" class="icon-box delete">
              <icon-delete fill="#fff" size="30" />
            </div>

            <div v-if="props.isOperate" :class="['icon-box', { 'select': item.check }]">
              <icon-check-one fill="#11d86c" size="30" />
            </div>
          </template>

          <div class="name omit">
            {{ item.name || '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.material-image {
  &--list {
    display: flex;
    flex-wrap: wrap;
  }

  &--item {
    padding: 0 10px 10px 0;
    .inner {
      position: relative;
      width: 100%;
      height: 180px;
      cursor: pointer;

      &:hover {
        .img-box img {
          transform: scale(110%);
        }
        .delete {
          background: rgba(0, 0, 0, 0.48);
          opacity: 1;
          z-index: $base-z-index-default;
        }
      }
    }

    .img-box,
    .icon-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px 0;
      color: #fff;
      text-align: center;
      background: rgba(0, 0, 0, 0.6);
      z-index: $base-z-index-default;
    }

    .icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      opacity: 0;

      &.select {
        opacity: 1;
        background: rgba(0, 0, 0, 0.6);
      }
    }

    .check-box {
      padding-left: 10px;
    }

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s;
    }
  }
}
</style>
