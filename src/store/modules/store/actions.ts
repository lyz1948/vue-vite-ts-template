/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { RootState } from '@/store'

import { OrderActionTypes } from './action-types'
import { OrderState } from './state'
import { OrderMutationTypes } from './mutation-types'
import { OrderSearch, Order, OrderOtherPay, OrderLog } from '@/types/order'
import { orderListRequest, orderDetailRequest, orderSetRequest, orderLogRequest} from '@/api/order'
import { otherListRequest, otherDelRequest, otherSetRequest, } from '@/api/order'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<OrderState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<OrderState, RootState>, 'commit'>

export interface IUserActions {
  [OrderActionTypes.ACTION_ORDER_LIST]({ commit }: AugmentedActionContext, params: OrderSearch): void
  [OrderActionTypes.ACTION_ORDER_SET]({ commit }: AugmentedActionContext, item: Order): void
  [OrderActionTypes.ACTION_ORDER_DETAIL]({ commit }: AugmentedActionContext, id: number): void
  [OrderActionTypes.ACTION_ORDER_LOG]({ commit }: AugmentedActionContext, params: OrderLog): void

  [OrderActionTypes.ACTION_OTHER_PAY_LIST]({ commit }: AugmentedActionContext, orderId: number): void
  [OrderActionTypes.ACTION_OTHER_PAY_SET]({ commit }: AugmentedActionContext, item: OrderOtherPay): void
  [OrderActionTypes.ACTION_OTHER_PAY_DEL]({ commit }: AugmentedActionContext, otherPayId: number): void
}

export const actions: ActionTree<OrderState, RootState> & IUserActions = {

  // 订单相关
  async [OrderActionTypes.ACTION_ORDER_LIST]({ commit }, params: OrderSearch) {
    return orderListRequest(params).then(data => {
      commit(OrderMutationTypes.ORDER_DATA, data)
    })
  },
  async [OrderActionTypes.ACTION_ORDER_SET]({ commit }, item: Order) {
    return orderSetRequest(item)
  },
  async [OrderActionTypes.ACTION_ORDER_DETAIL]({ commit }, id: number) {
    return orderDetailRequest(id)
  },
  async [OrderActionTypes.ACTION_ORDER_LOG]({ commit }, params: OrderLog) {
    return orderLogRequest(params)
  },

  // 分类相关
  async [OrderActionTypes.ACTION_OTHER_PAY_LIST]({ commit }, orderId: number) {
    return otherListRequest(orderId).then(data => {
      commit(OrderMutationTypes.ORDER_OTHER_PAY_LIST, data)
    })
  },
  async [OrderActionTypes.ACTION_OTHER_PAY_SET]({ commit }, item: OrderOtherPay) {
    return otherSetRequest(item)
  },
  async [OrderActionTypes.ACTION_OTHER_PAY_DEL]({ commit }, id: number) {
    return otherDelRequest(id)
  },
}
