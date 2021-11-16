import { MutationTree } from 'vuex'
import { ISettingState } from './state'
import { SettingMutationTypes } from './mutation-types'

export type Mutations<S = ISettingState> = {
  [SettingMutationTypes.TOGGLE_SETTING](state: S, status: boolean): void
  [SettingMutationTypes.FIX_HEADER](state: S, status: boolean): void
  [SettingMutationTypes.FIX_TAGVIEW](state: S, status: boolean): void
  [SettingMutationTypes.MENU_MODE](state: S, mode: string): void
  [SettingMutationTypes.MENU_REFRESH](state: S, status: boolean): void
}

export const mutations: MutationTree<ISettingState> & Mutations = {
  [SettingMutationTypes.TOGGLE_SETTING](state: ISettingState, status: boolean) {
    state.visibleSetting = status
  },
  [SettingMutationTypes.FIX_HEADER](state: ISettingState, status: boolean) {
    state.fixHead = status
  },
  [SettingMutationTypes.FIX_TAGVIEW](state: ISettingState, status: boolean) {
    state.fixTagView = status
  },
  [SettingMutationTypes.MENU_MODE](state: ISettingState, mode: string) {
    state.menuMode = mode
  },
  [SettingMutationTypes.MENU_REFRESH](state: ISettingState, status: boolean) {
    state.routerView = status
  },
}
