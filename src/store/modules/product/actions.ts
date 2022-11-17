/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { RootState } from '@/store'

import { ProductActionTypes } from './action-types'
import { ProductState } from './state'
import { ProductMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<ProductState, RootState>, 'commit'>

export interface IUserActions {
  [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }: AugmentedActionContext, params: any): void
}

export const actions: ActionTree<ProductState, RootState> & IUserActions = {
  async [ProductActionTypes.ACTION_PRODUCT_LIST]({ commit }) {
    commit(ProductMutationTypes.PRODUCT_LIST, [])
  },
}
