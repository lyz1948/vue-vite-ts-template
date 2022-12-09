/* eslint-disable no-empty-pattern */
import { RootState } from '@/store'
import { ActionContext, ActionTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes } from './mutation-types'
import { AppActionTypes } from './action-types'
import { ActiveValid, Refund, PhoneItem, MessageTpl } from './interface'
import {
  configRequest,
  refundProcessRequest,
  activeRequest,
  phoneListRequest,
  phoneSetRequest,
  smsSetRequest,
  smsGetRequest,
} from '@/api/mall'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface IActions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR]({ commit }: AugmentedActionContext, withoutAnimation: boolean): void
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }: AugmentedActionContext, device: DeviceType): void
  [AppActionTypes.ACTION_SET_LANGUAGE]({ commit }: AugmentedActionContext, lang: string): void

  [AppActionTypes.ACTION_MALL_CONFIG]({ commit }: AugmentedActionContext): any
  [AppActionTypes.ACTION_MALL_PHONE_LIST]({ commit }: AugmentedActionContext): any
  [AppActionTypes.ACTION_MALL_SMS_GET]({ commit }: AugmentedActionContext): void
  [AppActionTypes.ACTION_MALL_SMS_SET]({ commit }: AugmentedActionContext, data: MessageTpl): void
  [AppActionTypes.ACTION_MALL_REFUND_SET]({ commit }: AugmentedActionContext, data: Refund[]): void
  [AppActionTypes.ACTION_MALL_ACTIVE_SET]({ commit }: AugmentedActionContext, data: ActiveValid): void
  [AppActionTypes.ACTION_MALL_PHONE_SET]({ commit }: AugmentedActionContext, data: PhoneItem[]): void
}

export const actions: ActionTree<AppState, RootState> & IActions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR]({ commit }, withoutAnimation: boolean) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }, device: DeviceType) {
    commit(AppMutationTypes.TOGGLE_DEVICE, device)
  },
  [AppActionTypes.ACTION_SET_LANGUAGE]({ commit }, lang: string) {
    commit(AppMutationTypes.SET_LANGUAGE, lang)
  },

  // 获取商城配置
  [AppActionTypes.ACTION_MALL_CONFIG]({ commit }) {
    return configRequest().then(data => {
      if (!data) return

      commit(AppMutationTypes.MALL_CONFIG, data)
      return data
    })
  },
  // 获取商城客服电话
  [AppActionTypes.ACTION_MALL_PHONE_LIST]({ commit }) {
    return phoneListRequest().then(data => {
      commit(AppMutationTypes.MALL_PHONE_SET, (data as any))
    })
  },
  // 设置短信模板
  [AppActionTypes.ACTION_MALL_SMS_SET]({}, data: MessageTpl) {
    return smsSetRequest(data)
  },
  // 获取短信模板
  async [AppActionTypes.ACTION_MALL_SMS_GET]({}) {
    return await smsGetRequest()
  },
  // 退款流程设置
  [AppActionTypes.ACTION_MALL_REFUND_SET]({ commit }, data: Refund[]) {
    return refundProcessRequest(data).then(() => {
      commit(AppMutationTypes.MALL_REFUND_SET, data)
    })
  },
  // 设置活动时效
  [AppActionTypes.ACTION_MALL_ACTIVE_SET]({ commit }, data: ActiveValid) {
    return activeRequest(data).then(() => {
      commit(AppMutationTypes.MALL_ACTIVE_SET, data)
    })
  },
  // 设置联系电话
  [AppActionTypes.ACTION_MALL_PHONE_SET]({ commit }, data: PhoneItem[]) {
    return phoneSetRequest(data).then(() => {
      commit(AppMutationTypes.MALL_PHONE_SET, data)
    })
  },
}
