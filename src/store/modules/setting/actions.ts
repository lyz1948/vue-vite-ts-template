import { ActionTree, ActionContext } from 'vuex'
import { Mutations } from './mutations'
import { SettingActionTypes } from './action-types'
import { ISettingState } from './state'
import { IRootState } from '../../index'
import { SettingMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ISettingState, IRootState>, 'commit'>

export interface IActions {
  [SettingActionTypes.ACTION_TOGGLE_SETTING](
    { commit }: AugmentedActionContext,
    status: boolean
  ): void
  [SettingActionTypes.ACTION_FIX_HEADER](
    { commit }: AugmentedActionContext,
    status: boolean
  ): void
  [SettingActionTypes.ACTION_FIX_TAGVIEW](
    { commit }: AugmentedActionContext,
    status: boolean
  ): void
  [SettingActionTypes.ACTION_MENU_MODE](
    { commit }: AugmentedActionContext,
    mode: string
  ): void
  [SettingActionTypes.ACTION_MENU_REFRESH](
    { commit }: AugmentedActionContext,
  ): void
}

export const actions: ActionTree<ISettingState, IRootState> & IActions = {
  [SettingActionTypes.ACTION_TOGGLE_SETTING](
    { commit }: AugmentedActionContext,
    status: boolean
  ) {
    commit(SettingMutationTypes.TOGGLE_SETTING, status)
  },
  [SettingActionTypes.ACTION_FIX_HEADER](
    { commit }: AugmentedActionContext,
    status: boolean
  ) {
    commit(SettingMutationTypes.FIX_HEADER, status)
  },
  [SettingActionTypes.ACTION_FIX_TAGVIEW](
    { commit }: AugmentedActionContext,
    status: boolean
  ) {
    commit(SettingMutationTypes.FIX_TAGVIEW, status)
  },
  [SettingActionTypes.ACTION_MENU_MODE](
    { commit }: AugmentedActionContext,
    mode: string
  ) {
    commit(SettingMutationTypes.MENU_MODE, mode)
  },
  [SettingActionTypes.ACTION_MENU_REFRESH](
    { commit }: AugmentedActionContext,
  ) {
    commit(SettingMutationTypes.MENU_REFRESH, false)
    setTimeout(() => {
      commit(SettingMutationTypes.MENU_REFRESH, true)
    }, 20)
  },
}
