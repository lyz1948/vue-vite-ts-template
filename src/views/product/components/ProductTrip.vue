<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import TripItem from './TripItem.vue'
import ModTitle from '@/components/Title/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const myArray = ref([
  { id: 1, name: 'Day 1' },
  { id: 2, name: 'Day 2' },
  { id: 3, name: 'Day 3' },
  { id: 4, name: 'Day 4' },
])
</script>

<template>
  <div class="arrange-trip">
    <ModTitle :title="props.title">
      <el-popover placement="left" :width="400" trigger="click">
        <template #reference>
          <div class="icon-box">
            <icon-ordered-list />
          </div>
        </template>
        <draggable
          v-model="myArray"
          group="people"
          item-key="id"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element }">
            <div style="icon-box">
              <icon-form-one size="20" />{{ element.name }}
            </div>
          </template>
        </draggable>
      </el-popover>
    </ModTitle>

    <div class="content">
      <div class="container">
        <TripItem />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
