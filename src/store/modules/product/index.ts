import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { ProductState } from './state'
import { RootState } from '../../index'

import { state } from './state'
import { actions, IUserActions } from './actions'
import { mutations, Mutations } from './mutations'

export { ProductState }

export type ProductStore<S = ProductState> = Omit<
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

export const store: Module<ProductState, RootState> = {
  state,
  actions,
  mutations,
}
