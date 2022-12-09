/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { RootState } from '@/store'

import { ProductActionTypes } from './action-types'
import { ProductState } from './state'
import { ProductMutationTypes } from './mutation-types'

import { productListRequest, productSetRequest, productDelRequest } from '@/api/product'
import { tagListRequest, tagSetRequest, tagDelRequest } from '@/api/tag'
import { Product, ProductSearch } from '@/types/product'
import { Tag, TagSearch } from '@/types/tag'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

export interface IUserActions {
  [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }: AugmentedActionContext, params: ProductSearch): void
  [ProductActionTypes.ACTION_PRODUCT_SET]({ commit }: AugmentedActionContext, item: Product): void
  [ProductActionTypes.ACTION_PRODUCT_DEL]({ commit }: AugmentedActionContext, id: number): void

  [ProductActionTypes.ACTION_PRODUCT_TAG_LIST]({ commit }: AugmentedActionContext, params: TagSearch): void
  [ProductActionTypes.ACTION_PRODUCT_TAG_SET]({ commit }: AugmentedActionContext, item: Tag): void
  [ProductActionTypes.ACTION_PRODUCT_TAG_DEL]({ commit }: AugmentedActionContext, id: number): void
}

export const actions: ActionTree<ProductState, RootState> & IUserActions = {

  async [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }, params: ProductSearch) {
    return productListRequest(params).then(data => {
      commit(ProductMutationTypes.PRODUCT_LIST, data)
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_SET]({ commit }, item: Product) {
    return productSetRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_DEL]({ commit }, id: number) {
    return productDelRequest(id)
  },

  async [ProductActionTypes.ACTION_PRODUCT_TAG_LIST]({ commit }, params: TagSearch) {
    return tagListRequest(params).then(data => {
      commit(ProductMutationTypes.PRODUCT_TAG_LIST, data)
    })
  },
  async [ProductActionTypes.ACTION_PRODUCT_TAG_SET]({ commit }, item: Tag) {
    return tagSetRequest(item)
  },
  async [ProductActionTypes.ACTION_PRODUCT_TAG_DEL]({ commit }, id: number) {
    return tagDelRequest(id)
  },
}
