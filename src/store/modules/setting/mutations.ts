import { MutationTree } from 'vuex'
import { ISettingState } from './state'
import { SettingMutationTypes } from './mutation-types'

export type Mutations<S = ISettingState> = {
  [SettingMutationTypes.TOGGLE_SETTING](state: S, status: boolean): void
}

export const mutations: MutationTree<ISettingState> & Mutations = {
  [SettingMutationTypes.TOGGLE_SETTING](state: ISettingState, status: boolean) {
    state.visibleSetting = status
  },
}
