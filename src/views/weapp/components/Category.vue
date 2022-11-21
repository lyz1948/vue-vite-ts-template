<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import ModTitle from '@/components/Title/index.vue'

let idGlobal = 1

const list1 = ref([
  { name: 'dog 1', id: 1 },
  { name: 'dog 2', id: 2 },
  { name: 'dog 3', id: 3 },
  { name: 'dog 4', id: 4 },
])

const list2 = ref([
  { name: 'cat 5', id: 5 },
  { name: 'cat 6', id: 6 },
  { name: 'cat 7', id: 7 },
])

const controlOnStart = ref(true)

const clone = ({ name }) => {
  return { name, id: idGlobal++ };
}

const start = ({ originalEvent }) => {
  console.log('originalEvent:', originalEvent)
  controlOnStart.value = originalEvent.ctrlKey;
}

const log = ev => {
  console.log(ev)
}

</script>

<template>
  <div class="weapp-category">
    <ModTitle title="分类设置" />
    <div class="weapp-category--wrap">
      <div class="weapp-category--item">
        <h3>当前添加分类</h3>
        <draggable
          class="dragArea list-group"
          item-key="id"
          :list="list1"
          :group="{ name: 'people', pull: true }"
          :clone="clone"
          @start="start"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>

      <div class="weapp-category--item">
        <h3>未添加分类</h3>
        <draggable
          class="dragArea list-group"
          group="people"
          item-key="id"
          :list="list2"
          @change="log"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.weapp-category {
  
  &--wrap {
    display: flex;
  }
  &--item {
    flex: 0 0 50%;
    padding: 20px;
  }
  .list-group {
    width: 300px;
  }

  .list-group-item {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>
