import { MutationTree } from 'vuex'
import { AppMutationTypes } from './mutation-types'
import { AppState, DeviceType } from './state';
import { setLanguage } from '@/utils/cookies'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
  [AppMutationTypes.SET_LANGUAGE](state: S, lang: string): void
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
}
