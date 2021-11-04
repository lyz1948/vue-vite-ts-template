import { IRootState } from '@/store'
import { ActionContext, ActionTree } from 'vuex'
import { IAppState } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes } from './mutation-types'
import { AppActionTypes } from './action-types'

// 参数校验
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IAppState, IRootState>, 'commit'>

export interface IActions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit }: AugmentedActionContext,
    withoutAnimation: boolean
  ): void
}

// 提交action
export const actions: ActionTree<IAppState, IRootState> & IActions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR](
    { commit },
    withoutAnimation: boolean
  ) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withoutAnimation)
  },
}
