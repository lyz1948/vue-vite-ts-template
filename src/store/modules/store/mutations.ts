import { OrderState } from './state'
import { MutationTree } from 'vuex'
import { OrderMutationTypes } from './mutation-types'

export type Mutations<S = OrderState> = {
  [OrderMutationTypes.ORDER_DATA](state: S, data: any): void
  [OrderMutationTypes.ORDER_ITEM](state: S, data: any): void
  [OrderMutationTypes.ORDER_OTHER_PAY_LIST](state: S, data: any): void
}

export const mutations: MutationTree<OrderState> & Mutations = {
  [OrderMutationTypes.ORDER_DATA](state: OrderState, data: any) {
    state.orderData = data
  },
  [OrderMutationTypes.ORDER_ITEM](state: OrderState, data: any) {
    state.orderItem = data
  },
  [OrderMutationTypes.ORDER_OTHER_PAY_LIST](state: OrderState, data: any) {
    state.orderOtherPay = data
  },
}
