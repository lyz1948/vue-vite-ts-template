import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { StaffState } from './state'
import { RootState } from '@/store'

import { state } from './state'
import { actions, StaffActions } from './actions'
import { mutations, StaffMutations } from './mutations'

export { StaffState }

export type StaffStore<S = StaffState> = Omit<
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
  dispatch<K extends keyof StaffActions>(
    key: K,
    payload: Parameters<StaffActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<StaffActions[K]>
}

export const store: Module<StaffState, RootState> = {
  state,
  actions,
  mutations,
}
