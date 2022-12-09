/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, ActionContext } from 'vuex'
import { SourceState } from './state'
import { SourceActionTypes } from './action-types'
import { Pic, PicSearch } from '@/types/source'
import { StaffMutations } from './mutations'
import { RootState } from '@/store'
import { SourcMutationTypes } from './mutation-types'

import { picListRequest, picSetRequest, picDelRequest } from '@/api/source'

type AugmentedActionContext = {
  commit<K extends keyof StaffMutations>(
    key: K,
    payload: Parameters<StaffMutations[K]>[1]
  ): ReturnType<StaffMutations[K]>
} & Omit<ActionContext<SourceState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof StaffMutations>(key: K): ReturnType<StaffMutations[K]>
} & Omit<ActionContext<SourceState, RootState>, 'commit'>

export interface SourceActions {
  [SourceActionTypes.ACTION_SOURCE_PIC_LIST]({ commit }: AugmentedActionContext, params: PicSearch): void
  [SourceActionTypes.ACTION_SOURCE_PIC_SET]({ commit }: AugmentedActionContext, pic: Pic): void
  [SourceActionTypes.ACTION_SOURCE_PIC_DEL]({ commit }: AugmentedActionContext, id: number): void
}

export const actions: ActionTree<SourceState, RootState> & SourceActions = {
  [SourceActionTypes.ACTION_SOURCE_PIC_LIST]({ commit }: AugmentedActionContext, params: PicSearch) {
    return picListRequest(params).then(data => {
      commit(SourcMutationTypes.SOURCE_PIC_LIST, data)
    })
  },
  async [SourceActionTypes.ACTION_SOURCE_PIC_SET]({ state, commit }: AugmentedActionContext, pic: Pic) {
    return await picSetRequest(pic)
  },
  [SourceActionTypes.ACTION_SOURCE_PIC_DEL]({ commit }: AugmentedActionContext, id: number) {
    return picDelRequest(id)
  },
}
