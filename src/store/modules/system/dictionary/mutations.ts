import { MutationTree } from 'vuex'
import { DictionaryMutationTypes } from './mutation-types'
import { DictionaryState } from './state'

export type DictionaryMutations<S = DictionaryState> = {
  [DictionaryMutationTypes.DICTIONARY_DATA](state: S, data: any): void
  [DictionaryMutationTypes.DICTIONARY_TYPE_DATA](state: S, data: any): void
  [DictionaryMutationTypes.DICTIONARY_ALL_DATA](state: S, data: any): void
}

export const mutations: MutationTree<DictionaryState> & DictionaryMutations = {
  [DictionaryMutationTypes.DICTIONARY_DATA](
    state: DictionaryState,
    data: any
  ) {
    state.dictionaryData = data
  },
  [DictionaryMutationTypes.DICTIONARY_TYPE_DATA](
    state: DictionaryState,
    data: any
  ) {
    state.dictionaryTypeData = data
  },
  [DictionaryMutationTypes.DICTIONARY_TYPE_DATA_UPDATE](
    state: DictionaryState,
    data: any
  ) {
    const { id, list } = data
    state.dictionaryAllData[id].agencyDictionaryList = list
  },
  [DictionaryMutationTypes.DICTIONARY_ALL_DATA](
    state: DictionaryState,
    data: any
  ) {
    state.dictionaryAllData = data
  },
}
