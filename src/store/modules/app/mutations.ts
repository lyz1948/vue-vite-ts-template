import { MutationTree } from 'vuex'
import { AppMutationTypes } from './mutation-types'
import { AppState, DeviceType } from './state';
import { setLanguage } from '@/utils/cookies'
import { ActiveValid, Refund, PhoneItem } from './interface';

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
  [AppMutationTypes.SET_LANGUAGE](state: S, lang: string): void

  [AppMutationTypes.MALL_CONFIG](state: S, data: any): void
  [AppMutationTypes.MALL_REFUND_SET](state: S, data: Refund[]): void
  [AppMutationTypes.MALL_ACTIVE_SET](state: S, data: ActiveValid): void
  [AppMutationTypes.MALL_PHONE_SET](state: S, data: PhoneItem[]): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.open = !state.sidebar.open
    // 设置cookie
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  },
  [AppMutationTypes.SET_LANGUAGE](state: AppState, lang: string) {
    state.language = lang
    setLanguage(lang)
  },

  [AppMutationTypes.MALL_CONFIG](state: AppState, data: any) {
    const { refund } = data

    // refund 的是字符串
    if (typeof refund === 'string') {
      state.mallRefund = JSON.parse(refund)
    }

    state.mallConfig = data
  },

  [AppMutationTypes.MALL_REFUND_SET](state: AppState, data: Refund[]) {
    state.mallRefund = data
  },

  [AppMutationTypes.MALL_ACTIVE_SET](state: AppState, data: ActiveValid) {
    state.mallActive = data
  },

  [AppMutationTypes.MALL_PHONE_SET](state: AppState, data: PhoneItem[]) {
    state.mallPhoneList = data
  },
}
