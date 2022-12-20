<script setup lang="ts">
import { computed, ref } from 'vue'
// import { formState } from '../params'
import { useStore } from '@/store'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import UploadItem from './UploadItem.vue'

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 1,
  },
})

const store = useStore()

const form = ref(props.form)

const getProductItem = computed(() => store.state.product.productItem)

const getLabel = computed(() => {
  return `Day ${(props.index)}`
})

const handleChange = (pics: any[]) => {
  store.commit(ProductMutationTypes.PRODUCT_ITEM, { bannerPics: pics })
}

const handleDelete = val => {
  const current: Array<any> = getProductItem.value['bannerPics']
  const pics = current.filter(it => it.picId !== val)
  store.commit(ProductMutationTypes.PRODUCT_ITEM_UPDATE, { bannerPics: pics })
}

</script>

<template>
  <FormBase>
    <FormItemBase prop="" :label="getLabel">
      <div class="flex-box">
        <InputBase v-model="form.title" />
      </div>
    </FormItemBase>

    <div class="form-item-box">
      <FormItemBase prop="" label="出发地">
        <InputBase v-model="form.startPoint" />
      </FormItemBase>
      <FormItemBase prop="" label="目的地">
        <InputBase v-model="form.endPoint" />
      </FormItemBase>
      <FormItemBase prop="" label="住宿">
        <InputBase v-model="form.hotelName" />
      </FormItemBase>
      <FormItemBase prop="" label="交通">
        <InputBase v-model="form.traffic" />
      </FormItemBase>
    </div>

    <div class="rest-item">
      <FormItemBase prop="" label="用餐">
        <div class="form-item-box">
          <div class="check-box">
            <el-checkbox v-model="form.breakfast">
              早
            </el-checkbox>
          </div>
          <InputBase v-model="form.breakfastDesc" />
        </div>
        <div class="form-item-box">
          <div class="check-box">
            <el-checkbox v-model="form.lunch">
              中
            </el-checkbox>
          </div>
          <InputBase v-model="form.lunchDesc" />
        </div>
        <div class="form-item-box">
          <div class="check-box">
            <el-checkbox v-model="form.dinner">
              晚
            </el-checkbox>
          </div>
          <InputBase v-model="form.dinnerDesc" />
        </div>
      </FormItemBase>
    </div>
    <FormItemBase prop="" label="行程">
      <div class="flex-box">
        <InputBase v-model="form.itineraryDesc" type="textarea" rows="6" />
      </div>
    </FormItemBase>
    <UploadItem @on:change="handleChange" @on:delete="handleDelete" />
  </FormBase>
</template>

<style lang="scss">
.form-item-box {
  display: flex;
  justify-content: space-around;
  flex: 1;

  .input-base {
    flex: 1;
  }

  & > div {
    flex: 1;
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }
  }

  .check-box {
    flex: 0 0 40px;
    padding-left: 8px;
    .input-box {
      margin-left: 12px;
    }
  }
}

.pic-box {
  padding-left: 40px;
}

.flex-box {
  width: 100%;
}

.icon-box {
  cursor: pointer;
}
</style>
