import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'

import type { PermissionState } from './state'
import { state } from './state'
import { actions, Actions } from './actions'
import { mutations, Mutations } from './mutations'

export { PermissionState }

export type PermissionStore<S = PermissionState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<
    K extends keyof Mutations,
    P extends keyof Parameters<Mutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<PermissionState, RootState> = {
  state,
  actions,
  mutations,
}
