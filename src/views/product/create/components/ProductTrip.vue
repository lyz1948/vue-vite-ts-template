<script setup lang="ts">
import { computed, reactive, ref, toRefs, watch } from 'vue'
import draggable from 'vuedraggable'
import ProductTripItem from './ProductTripItem.vue'
import ModTitle from '@/components/Title/index.vue'
import { formTripState } from '../params'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { useStore } from '@/store'
import { getProductArrVal } from '../help'

const store =  useStore()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const myArray = ref([{ id: 0, name: 'Day 1'}])

const state = reactive({
  tripList: [formTripState()]
})

const productItem = computed(() => {
  return store.state.product.productItem
})

const getProductDays = computed(() => {
  return productItem.value?.days ?? 1
})

// const editTrip = () => {
//   console.log('productItem.value:', productItem.value)
//   return productItem.value['itinerarys']
// }

const generateDropList = () => {
  myArray.value = state.tripList.map((it, idx) => ({ id: idx, name: 'Day' + (idx+1) }))
}

const generateTrip = (len: number) => {
  state.tripList = []
  for (let i = 0; i < len; i++) {
    state.tripList.push(formTripState())
  }
}

const addDay = () => {
  state.tripList.push(formTripState())
  generateDropList()
}

const minusDay = (index: number) => {
  state.tripList.splice(index, 1)
  generateDropList()
}

watch(
  () => state.tripList,
  list => {
    if (!list || !list.length) return
    store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, { itinerarys: list, days: list.length })
  },
  { deep: true }
)

watch(
  () => getProductDays.value,
  days => {
    generateTrip(days)
    generateDropList()
  },
)

watch(
  () => productItem.value,
  data => {
    if (!data) return
    state.tripList = data['itinerarys']
  },
  { immediate: true }
)
const { tripList } = toRefs(state)
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
            <div class="icon-box">
              <icon-form-one size="24" />
              <span class="ml10">{{ element.name }}</span>
            </div>
          </template>
        </draggable>
      </el-popover>
    </ModTitle>

    <div class="container">
      <div
        v-for="(item, index) in tripList"
        :key="index"
        class="trip-box content mt20"
      >
        <ProductTripItem :form="item" :index="(index + 1)" />
        <div class="flexcenter">
          <BtnBase type="primary" @click="addDay">
            <icon-plus fill="#fff" size="20" />
          </BtnBase>
          <BtnBase v-if="index > 0" type="danger" @click="minusDay(index)">
            <icon-minus fill="#fff" size="20" />
          </BtnBase>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.icon-box {
  display: flex;
  align-items: center;
}
</style>
