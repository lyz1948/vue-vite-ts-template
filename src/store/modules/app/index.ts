import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { state } from './state'
import { Mutations, mutations } from './mutations'
import { IActions, actions } from './actions'
import type { AppState } from './state'

export { AppState }

export type AppStore<S = AppState> = Omit<
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

export const store: Module<AppState, RootState> = {
  state,
  actions,
  mutations,
}
