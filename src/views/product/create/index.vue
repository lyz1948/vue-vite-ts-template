<script setup lang="ts">
import { markRaw, computed, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import { ProductActionTypes } from '@/store/modules/product/action-types'
// import { mockData } from './params'
import ProductInfo from './components/ProductInfo.vue'
import ProductEdit from './components/ProductEdit.vue'
import ProductTrip from './components/ProductTrip.vue'
import InnerRemarks from './components/InnerRemarks.vue'
import FeeInclude from './components/FeeInclude.vue'
import FeeExclude from './components/FeeExclude.vue'
import FriendlyTips from './components/FriendlyTips.vue'
import ServiceStandard from './components/ServiceStandard.vue'
import SwiperItem from './components/SwiperItem.vue'
import { useRouter } from 'vue-router'
import { ProductMutationTypes } from '@/store/modules/product/mutation-types'
import { is } from '@/utils/type'
import { TagOrType } from '@/enums'

const { currentRoute } = useRouter()
const router = useRouter()
const store = useStore()

const compList = markRaw([
  { name: '基础信息', id: 'JCXX', component: ProductInfo, ref: "ProductInfo" },
  { name: '产品详情', id: 'CPXQ', component: ProductEdit, ref: "ProductEdit" },
  { name: '行程安排', id: 'XCAP', component: ProductTrip, ref: "ProductTrip" },
  { name: '费用包含', id: 'FYBH', component: FeeInclude, ref: "FeeInclude" },
  { name: '费用不含', id: 'FYBBH', component: FeeExclude, ref: "FeeExclude" },
  { name: '服务标准', id: 'FWBZ', component: ServiceStandard, ref: "ServiceStandard" },
  { name: '其他备注', id: 'QTBZ', component: InnerRemarks, ref: "InnerRemarks" },
  { name: '友情提示', id: 'YQTS', component: FriendlyTips, ref: "FriendlyTips" },
  { name: '轮播图片', id: 'LBTP', component: SwiperItem, ref: "SwiperItem" },
])

const productItem = computed(() => store.state.product.productItem)

// const beforeCommit = () => {
//   const { bannerPics, tags, plans, types } = productItem.value

//   if (!bannerPics.length) {
//     delete productItem.value.bannerPics
//   }

//   if (!tags.length) {
//     delete productItem.value.tags
//   }

//   if (!plans.length) {
//     delete productItem.value.plans
//   }

//   if (!types.length) {
//     delete productItem.value.types
//   }
// }

const handleCreate = () => {
  // beforeCommit()

  const data = productItem.value
  const { bannerPics, tags } = productItem.value

  if (bannerPics) {
    const newPics = bannerPics.map(it => ({ picId: it.id, productId: data.id }))
    data.thumbnailUrl = bannerPics[0].path
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_PIC_ADD, newPics)
  }

  if (tags && tags.length) {
    const newTags = tags.map(it => {
      if (is.obj(it)) {
        return it.id
      }
      return it
    })

    console.log(newTags)
    const tagsId = new Set(newTags)
    console.log('tagsId:', tagsId)

    const tagsList = tagsId.map(id => ({ id, productId: data.id, type: TagOrType.TAG }))
    console.log('tagsList:', tagsList)

    console.log('new Set(newTags):', new Set(newTags))
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_TAG_OR_TYPE_ADD, tagsList)
  }

  delete data.tags
  delete data.bannerPics
  delete data.plans

  store.dispatch(ProductActionTypes.ACTION_PRODUCT_SET, data).then(() => {
    router.push({ path: '/product/line' })
    store.commit(ProductMutationTypes.PRODUCT_ITEM, {})
  })
}

onBeforeMount(() => {
  const { id } = currentRoute.value.query

  if (!productItem.value.id && id) {
    store.dispatch(ProductActionTypes.ACTION_PRODUCT_DETAIL, id)
  }
  console.log(productItem.value)
})

</script>

<template>
  <div class="product-create">
    <div class="tools">
      <a
        v-for="item in compList"
        :key="item.id"
        :href="'#' + item.id"
      >
        {{ item.name }}
      </a>
    </div>
  
    <div class="product-create--body">
      <template v-for="(comp) in compList" :key="comp.id">
        <div class="product-create--item">
          <component
            :is="comp.component"
            :id="comp.id"
            :title="comp.name"
          />
        </div>
      </template>
    </div>
    <div class="product-create--foot">
      <BtnBase type="success" @click="handleCreate">
        保存
      </BtnBase>
    </div>
  </div>
</template>

<style lang="scss">
.product-create {

  .tools {
    position: fixed;
    right: 20px;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    z-index: $base-z-index-default;
    & > a {
      padding: 6px;
      width: 50px;
      height: 50px;
      display: block;
      background: rgba($dark-bg-color, .88);
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      text-decoration: none;
      text-align: center;
      &:not(:last-child) {
        border-bottom: 1px solid $base-color-border;
      }
    }
  }

  &--item {
    margin-top: 20px;
    border: 1px solid $base-color-border;
    box-shadow: 0 9px 28px 8px rgb(0 0 0 / 5%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%);
  }
  
  &--foot {
    padding-top: 20px;
    border-top: 1px solid $base-color-border;
    text-align: center;
  }
}
</style>
