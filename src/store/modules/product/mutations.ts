import { ProductState } from './state'
import { MutationTree } from 'vuex'
import { ProductMutationTypes } from './mutation-types'

export type Mutations<S = ProductState> = {
  [ProductMutationTypes.PRODUCT_LIST](state: S, data: any): void
  [ProductMutationTypes.PRODUCT_TAG_LIST](state: S, data: any): void
}

export const mutations: MutationTree<ProductState> & Mutations = {
  [ProductMutationTypes.PRODUCT_LIST](state: ProductState, data: any) {
    state.productList = data
  },
  [ProductMutationTypes.PRODUCT_TAG_LIST](state: ProductState, data: any) {
    state.productTagList = data
  },
}
