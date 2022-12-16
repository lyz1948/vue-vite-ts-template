<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useStore } from '@/store'

import TableStock from './components/TableStock.vue'
import DialogStock from './components/DialogStock.vue'
import { ProductActionTypes } from '@/store/modules/product/action-types'
import { useRouter } from 'vue-router'
import { PriceEnum } from '@/enums/priceEnum'
import { getMonthCount, parseDate } from '@/utils/datetime'

const store = useStore()
const { currentRoute } = useRouter()
const dialogRef = ref(null)

const state = reactive({
  tableData: [],
  total: 0,
  date: '',
  searchParams: {
    priceType: '',
    startDate: '',
    endDate: '',
  },
  productId: '',
})

const productItem = computed(() => {
  return store.state.product.productItem
})

const isDirect = computed(() => {
  return state.searchParams.priceType === PriceEnum.DIRECT
})

const isColleague = computed(() => {
  return state.searchParams.priceType === PriceEnum.COLLEAGUE
})

const fetchData = (params = state.searchParams) => {
  const { id: productId } = currentRoute.value.query
  store.dispatch(ProductActionTypes.ACTION_PRODUCT_STOCK_LIST, { productId,...params })
}

const editItem = (item: unknown) => {
  dialogRef.value?.edit(item)
}

const showDialog = () => {
  dialogRef.value?.show(state.productId)
}

const toggle = (val: keyof PriceEnum) => {
  state.searchParams.priceType = val 
  fetchData()
}

const changeDate = (val: Date | string) => {
  const d = new Date(val)
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const total = getMonthCount(y, m)
  
  state.searchParams.startDate = val
  state.searchParams.endDate = parseDate(new Date(y, d.getMonth(), total))
  fetchData()
}

onBeforeMount(() => {
  const { id: productId } = currentRoute.value.query
  state.productId = productId
  fetchData({ productId })
})

</script>

<template>
  <div>
    <div class="product-info flex">
      <el-tag type="info">
        {{ productItem.code }}
      </el-tag>
      <div class="title ml5">
        <h4>{{ productItem.name }}</h4>
      </div>
    </div>
    <div class="search mt20">
      <FormBase inline>
        <FormItemBase label="日期">
          <DateBase
            v-model="state.date"
            :shortcuts="false"
            type="month"
            @change="changeDate"
          />
        </FormItemBase>
        <FormItemBase>
          <el-button-group>
            <el-button type="primary" :disabled="isDirect" @click="toggle(PriceEnum.DIRECT)">
              直客价
            </el-button>
            <el-button type="primary" :disabled="isColleague" @click="toggle(PriceEnum.COLLEAGUE)">
              同行价
            </el-button>
          </el-button-group>
        </FormItemBase>
        <FormItemBase>
          <BtnBase type="success" @click="showDialog">
            设置库存
          </BtnBase>
        </FormItemBase>
      </FormBase>
    </div>

    <TableStock @on:edit="editItem" />
    <DialogStock ref="dialogRef" @on:reload="fetchData" />
  </div>
</template>

<style scoped></style>
