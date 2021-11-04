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
}

export const actions: ActionTree<ISettingState, IRootState> & IActions = {
  [SettingActionTypes.ACTION_TOGGLE_SETTING](
    { commit }: AugmentedActionContext,
    status: boolean
  ) {
    commit(SettingMutationTypes.TOGGLE_SETTING, status)
  },
}
