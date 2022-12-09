import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { SourceState } from './state'
import { RootState } from '@/store'

import { state } from './state'
import { actions, SourceActions } from './actions'
import { mutations, StaffMutations } from './mutations'

export { SourceState }

export type SourceStore<S = SourceState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<
    K extends keyof StaffMutations,
    P extends Parameters<StaffMutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<StaffMutations[K]>
} & {
  dispatch<K extends keyof SourceActions>(
    key: K,
    payload: Parameters<SourceActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<SourceActions[K]>
}

export const store: Module<SourceState, RootState> = {
  state,
  actions,
  mutations,
}
