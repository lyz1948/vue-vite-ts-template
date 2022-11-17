import { ActionTree, ActionContext } from 'vuex'
import { Mutations } from './mutations'
import { SettingActionTypes } from './action-types'
import { SettingState } from './state'
import { RootState } from '../../index'
import { SettingMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<SettingState, RootState>, 'commit'>

export interface IActions {
  [SettingActionTypes.ACTION_UPDATE_SETTING](
    { commit }: AugmentedActionContext,
    opts: { type: string; val: any }
  ): void
  [SettingActionTypes.ACTION_LANGUAGE_SET](
    { commit }: AugmentedActionContext,
    lang: string
  ): void
}

export const actions: ActionTree<SettingState, RootState> & IActions = {
  [SettingActionTypes.ACTION_LANGUAGE_SET](
    { commit },
    lang: string
  ) {
    commit(SettingMutationTypes.LANGUAGE_SET, lang)
  },
  [SettingActionTypes.ACTION_UPDATE_SETTING](
    { commit },
    opts: { type: string; val: any }
  ) {
    commit(SettingMutationTypes.UPDATE_SETTING, opts)
  },
}
