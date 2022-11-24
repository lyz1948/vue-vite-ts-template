import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import type { DictionaryState } from './state'
import { RootState } from '@/store'

import { state } from './state'
import { actions, IDictionaryActions } from './actions'
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
  dispatch<K extends keyof IDictionaryActions>(
    key: K,
    payload: Parameters<IDictionaryActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<IDictionaryActions[K]>
}

export const store: Module<DictionaryState, RootState> = {
  state,
  actions,
  mutations,
}
