import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'

import { state } from './state'
import { actions, IActions } from './actions'
import { mutations, Mutations } from './mutations'
import type { SettingState } from './state'

export { SettingState }

export type SettingStore<S = SettingState> = Omit<
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

export const store: Module<SettingState, RootState> = {
  state,
  actions,
  mutations,
}
