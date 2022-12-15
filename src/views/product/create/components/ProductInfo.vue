<script setup lang="ts">
import { reactive, toRefs, watch, computed } from 'vue'
import { formState, rules } from '../params'
import { useStore } from '@/store'
import { TagOrType } from '@/enums'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import ModTitle from '@/components/Title/index.vue'
import SelectTag from '@/components/Select/SelectTag.vue'
import SelectProductSource from '@/components/Select/SelectProductSource.vue'
import { getProductInfo, getProductArrVal } from '../help'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const store = useStore()
const state = reactive({
  form: getProductInfo(),
  tags: getProductArrVal('tags'),
  types: [],
})


const getProductDays = computed(() => {
  return store.state.product.productItem ?? 1
})

const selectProduct = ({ id: resPId, travelLineId }) => {
  state.form = { ...state.form, resPId, travelLineId }
}

const visibleChangeTag = (flag) => {
  if (!flag) {
    state.form.tags = state.tags.map(tid => ({ tid, type: TagOrType.TAG }))
  }
}

// const visibleChangeCate = (flag) => {
//   if (!flag) {
//     form.types = state.cate.map(tid => ({ tid, type: TagOrType.TYPE }))
//   }
// }

watch(
  () => state.form,
  form => {
    store.commit(ProductMutationTypes.PRODUCT_ITEM, form)
    store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, { tags: state.tags })
  },
  { deep: true }
)

watch(
  () => getProductDays.value,
  days => {
    store.form.days = days
  },
)

const { form, tags } = toRefs(state)

</script>

<template>
  <div class="base-info">
    <ModTitle :title="props.title" />
    <div class="container">
      <div class="content">
        <FormBase
          :model="form"
          :rules="rules"
          inline
          label-width="100px"
        >
          <div class="flex-row-300">
            <FormItemBase prop="name" label="线路产品">
              <InputBase v-model="form.name" />
            </FormItemBase>

            <FormItemBase prop="days" label="行程天数">
              <el-input-number
                v-model="form.days"
                controls-position="right"
                :min="1"
                :max="12"
              />
            </FormItemBase>

            <FormItemBase prop="" label="地接产品来源">
              <SelectProductSource v-model="form.resName" @on:select="selectProduct" />
            </FormItemBase>

            <FormItemBase prop="" label="产品分类">
              <!-- <SelectCate v-model="cate" @visible-change="visibleChangeCate" /> -->
            </FormItemBase>
          </div>

          <div class="flex-row-300">
            <FormItemBase prop="" label="出发地">
              <InputBase v-model="form.departureCity" />
            </FormItemBase>

            <FormItemBase prop="" label="目的地">
              <InputBase v-model="form.arrivalCity" />
            </FormItemBase>

            <FormItemBase prop="" label="产品来源">
              <InputBase v-model="form.source" />
            </FormItemBase>
          </div>

          <div class="flex-row-1">
            <FormItemBase prop="" label="产品标签">
              <SelectTag
                v-model="tags"
                multiple
                style="width: 100%"
                @visible-change="visibleChangeTag"
              />
            </FormItemBase>
          </div>
        </FormBase>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.base-info {
  .flex-row-1 {
    .el-form-item,
    .el-form-item__content {
      width: 924px;
    }
  }
  .flex-row-300 {
    .el-form-item,
    .el-form-item__content {
      width: 300px;
    }
  }
  // .flex-row-4 {
  //   .el-form-item,
  //   .el-form-item__content {
  //     width: calc(25% - 12px);
  //   }
  // }
}
</style>
