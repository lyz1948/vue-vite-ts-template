import { MutationTree } from 'vuex'
import { AppMutationTypes } from './mutation-types'
import { IAppState } from './state'

export type Mutations<S = IAppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
}

export const mutations: MutationTree<IAppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](
    state: IAppState,
    withoutAnimation: boolean
  ) {
    state.sidebar.open = !state.sidebar.open
    // 设置cookie
  },
}
