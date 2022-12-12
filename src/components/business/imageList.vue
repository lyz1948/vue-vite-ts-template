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

const imageSize = ref(300)
const curIndex = ref(0)

const getStyle = computed(() => {
  return `width: ${imageSize.value}px`
})

const previewList = computed(() => props.list.map(it => it.src))

const deleteItem = item => {
  if (!props.isOperate && !props.isBatch) {
    confirm('确定要删除吗', '警告').then(() => {
      console.log(item)
      console.log('删除了')
    })
  }
}

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
    const el = document.querySelector('.material-image')
    imageSize.value = Math.floor(el.clientWidth / (props.size || 9))
  })
})
</script>

<template>
  <div class="material-image">
    <div v-if="props.list && props.list.length" class="material-image--list">
      <div v-for="(item, i) in props.list" :key="i" class="material-image--item">
        <div class="inner" @click="curIndex = i">
          <div v-if="props.isBatch" class="check-box" @click="item.check = !item.check">
            <el-checkbox v-model="item.check" size="large" type="success" />
          </div>
          <div class="img-box">
            <el-image
              :src="item.src"
              :preview-src-list="previewList"
              :initial-index="curIndex"
              fit="fill"
            />
          </div>

          <template v-if="!props.isBatch">
            <div v-if="!props.isOperate" class="icon-box delete" @click="deleteItem(item)">
              <icon-delete fill="#fff" size="30" />
            </div>

            <div v-if="props.isOperate" :class="['icon-box', { select: item.check }]">
              <icon-check-one fill="#11d86c" size="30" />
            </div>
          </template>

          <!-- <div class="name omit">
            {{ item.name || '' }}
          </div> -->
        </div>
      </div>
    </div>
    <el-empty v-else />
  </div>
</template>

<style lang="scss" scoped>
.material-image {
  &--list {
    display: flex;
    flex-wrap: wrap;
  }

  &--item {
    @include flexcenter();
    padding: 10px;
    margin: 0 20px 20px 0;
    border: 1px solid #e6ebed;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    background-image: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.1) 25%,
        transparent 0,
        transparent 75%,
        rgba(0, 0, 0, 0.1) 0
      ),
      linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.1) 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
    transition: all .5s;
    &:hover {
      transform: translate3d(0,-4px,0);
      box-shadow: 0 9px 28px 8px rgb(0 0 0 / 5%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%);
      border-color: transparent;
    }
    .inner {
      position: relative;
      width: 280px;
      height: 160px;
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
    .check-box {
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
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px 0;
      background: rgba(0, 0, 0, 0.6);

      &.select {
        opacity: 1;
        background: rgba(0, 0, 0, 0.6);
      }
    }

    .check-box {
      padding-left: 10px;
      z-index: 10;
    }

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s;
    }
  }
}
</style>
