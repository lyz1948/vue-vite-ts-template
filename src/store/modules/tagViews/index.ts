import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '../../index'

import { state } from './state'
import { actions, IActions } from './actions'
import { mutations, Mutations } from './mutation'
import type { TagViewsState } from './state'

export { TagViewsState }

export type TagViewsStore<S = TagViewsState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof IActions>(
    key: K,
    payload: Parameters<IActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<IActions[K]>
}

export const store: Module<TagViewsState, RootState> = {
  state,
  actions,
  mutations,
}
