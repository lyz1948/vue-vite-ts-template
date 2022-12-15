import { ProductState } from './state'
import { MutationTree } from 'vuex'
import { ProductMutationTypes } from './mutation-types'
import { is } from '@/utils/type'

export type Mutations<S = ProductState> = {
  [ProductMutationTypes.PRODUCT_DATA](state: S, data: any): void
  [ProductMutationTypes.PRODUCT_ITEM](state: S, data: any): void
  [ProductMutationTypes.PRODUCT_ITEM_UPDATE](state: S, data: any): void
  [ProductMutationTypes.PRODUCT_TAG_LIST](state: S, data: any): void
  [ProductMutationTypes.PRODUCT_CATE_LIST](state: S, data: any): void

  [ProductMutationTypes.PRODUCT_RESOURCE_ALL](state: S, data: any): void
  // [ProductMutationTypes.PRODUCT_RESOURCE_LIST](state: S, data: any): void
}

export const mutations: MutationTree<ProductState> & Mutations = {
  [ProductMutationTypes.PRODUCT_RESOURCE_ALL](state: ProductState, data: any) {
    state.productResourceAll = data
  },
  [ProductMutationTypes.PRODUCT_ITEM](state: ProductState, data: any) {
    Object.keys(data).map(key => {
      const val = data[key] 
      if (is.arr(state.productItem[key])) {
        state.productItem[key] = [...state.productItem[key], ...val]
      } else {
        state.productItem[key] = val
      }
    })
  },
  [ProductMutationTypes.PRODUCT_ITEM_UPDATE](state: ProductState, data: any) {
    Object.keys(data).map(key => {
      state.productItem[key] = data[key]
    })
  },
  // [ProductMutationTypes.PRODUCT_RESOURCE_LIST](state: ProductState, data: any) {
  //   state.productResourceList = data
  // },
  [ProductMutationTypes.PRODUCT_DATA](state: ProductState, data: any) {
    state.productData = data
  },
  [ProductMutationTypes.PRODUCT_TAG_LIST](state: ProductState, data: any) {
    state.productTagList = data
  },
  [ProductMutationTypes.PRODUCT_CATE_LIST](state: ProductState, data: any) {
    state.productCateList = data
  },
}
