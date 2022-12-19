/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, ActionContext } from 'vuex'
import { DictionaryState } from './state'
import { DictionaryActionTypes } from './action-types'
import { DictionaryMutations } from './mutations'
import { RootState } from '@/store'

import {
  dicCreateRequest,
  dicDeleteRequest,
  dicListRequest,
  dicTypeListRequest,
} from '@/api/dictionary'
import { DictionaryItem, DictionaryTypeAndSub } from '@/types/system'
import { DictionaryMutationTypes } from './mutation-types'
import { dicAllRequest } from '@/api/dictionary'
import { formatSelect } from '@/utils/format'

type AugmentedActionContext = {
  commit<K extends keyof DictionaryMutations>(
    key: K,
    payload: Parameters<DictionaryMutations[K]>[1]
  ): ReturnType<DictionaryMutations[K]>
} & Omit<ActionContext<DictionaryState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof DictionaryMutations>(
    key: K
  ): ReturnType<DictionaryMutations[K]>
} & Omit<ActionContext<DictionaryState, RootState>, 'commit'>

export interface DictionaryActions {
  [DictionaryActionTypes.ACTION_DICTIONARY_FETCH](
    { commit }: AugmentedActionContext,
    id: string
  ): void
  [DictionaryActionTypes.ACTION_DICTIONARY_TYPE_FETCH]({
    commit,
  }: AugmentedActionContext): void
  [DictionaryActionTypes.ACTION_DICTIONARY_ALL_FETCH]({
    commit,
  }: AugmentedActionContext): void
  [DictionaryActionTypes.ACTION_DICTIONARY_CREATE](
    { commit }: AugmentedActionContext,
    payload: DictionaryItem
  ): void
  [DictionaryActionTypes.ACTION_DICTIONARY_DELETE](
    { commit }: AugmentedActionContext,
    id: number | string
  ): void
}

export const actions: ActionTree<DictionaryState, RootState> &
  DictionaryActions = {
  async [DictionaryActionTypes.ACTION_DICTIONARY_FETCH](
    { commit },
    id: string
  ) {
    const data = await dicListRequest(id)
    commit(DictionaryMutationTypes.DICTIONARY_DATA, data)
  },
  // 所有字典类型
  async [DictionaryActionTypes.ACTION_DICTIONARY_TYPE_FETCH]({ commit }) {
    const data = await dicTypeListRequest()
    commit(DictionaryMutationTypes.DICTIONARY_TYPE_DATA, data)
  },

  async [DictionaryActionTypes.ACTION_DICTIONARY_ALL_FETCH]({ commit }) {
    const res: { [keys: string]: DictionaryTypeAndSub} = {}
    const data: Array<DictionaryTypeAndSub> = await dicAllRequest() as any
    data.forEach((item: DictionaryTypeAndSub) => {
      item.agencyDictionaryList = formatSelect(item.agencyDictionaryList)
      res[item.id] = item
    })
    commit(DictionaryMutationTypes.DICTIONARY_ALL_DATA, res)
  },
  // 创建
  async [DictionaryActionTypes.ACTION_DICTIONARY_CREATE](
    { commit },
    payload: DictionaryItem
  ) {
    return await dicCreateRequest(payload)
  },

  async [DictionaryActionTypes.ACTION_DICTIONARY_DELETE](
    { commit },
    id: number | string
  ) {
    return await dicDeleteRequest(id)
  },
}
