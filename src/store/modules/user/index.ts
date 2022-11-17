import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { UserState } from './state'
import { RootState } from '../../index'

import { state } from './state'
import { actions, IUserActions } from './actions'
import { mutations, Mutations } from './mutations'

export { UserState }

export type UserStore<S = UserState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof IUserActions>(
    key: K,
    payload: Parameters<IUserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<IUserActions[K]>
}

export const store: Module<UserState, RootState> = {
  state,
  actions,
  mutations,
}
