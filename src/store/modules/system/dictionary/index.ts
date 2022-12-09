import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { DictionaryState } from './state'
import { RootState } from '@/store'

import { state } from './state'
import { actions, DictionaryActions } from './actions'
import { mutations, DictionaryMutations } from './mutations'

export { DictionaryState }

export type DictionaryStore<S = DictionaryState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<
    K extends keyof DictionaryMutations,
    P extends Parameters<DictionaryMutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<DictionaryMutations[K]>
} & {
  dispatch<K extends keyof DictionaryActions>(
    key: K,
    payload: Parameters<DictionaryActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<DictionaryActions[K]>
}

export const store: Module<DictionaryState, RootState> = {
  state,
  actions,
  mutations,
}
