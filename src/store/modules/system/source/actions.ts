/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, ActionContext } from 'vuex'
import { SourceState } from './state'
import { SourceActionTypes } from './action-types'
import { StaffMutations } from './mutations'
import { RootState } from '@/store'
import { SourcMutationTypes } from './mutation-types'

import { PicType, PicTypeSearch } from '@/types/source'
import { Pic, PicSearch } from '@/types/source'
import { picTypeListRequest, picTypeSetRequest, picTypeDelRequest } from '@/api/source'
import { picListRequest, picListAllRequest, picSetRequest, picDelRequest } from '@/api/source'
import { ossPicDelRequest, ossPicUrlRequest } from '@/api/source'

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
  [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST]({ commit }: AugmentedActionContext, params: PicTypeSearch): void
  [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_SET]({ commit }: AugmentedActionContext, pic: PicType): void
  [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_DEL]({ commit }: AugmentedActionContext, id: number): void

  [SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE]({ commit }: AugmentedActionContext, typeId: number): void
  [SourceActionTypes.ACTION_SOURCE_PIC_LIST]({ commit }: AugmentedActionContext, params: PicSearch): void
  [SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD]({ commit }: AugmentedActionContext, pic: Pic): void
  [SourceActionTypes.ACTION_SOURCE_PIC_DEL]({ commit }: AugmentedActionContext, id: number): void

  [SourceActionTypes.ACTION_SOURCE_OSS_PIC_URL]({ commit }: AugmentedActionContext, paths: string[]): void
  [SourceActionTypes.ACTION_SOURCE_OSS_PIC_URL]({ commit }: AugmentedActionContext, paths: string[]): void
}

export const actions: ActionTree<SourceState, RootState> & SourceActions = {
  // 图片类型相关
  [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_LIST]({ commit }: AugmentedActionContext, params: PicTypeSearch) {
    return picTypeListRequest(params).then(data => {
      commit(SourcMutationTypes.SOURCE_PIC_TYPE_LIST, data)
    })
  },
  async [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_SET]({ state, commit }: AugmentedActionContext, pic: PicType) {
    return await picTypeSetRequest(pic)
  },
  [SourceActionTypes.ACTION_SOURCE_PIC_TYPE_DEL]({ commit }: AugmentedActionContext, id: number) {
    return picTypeDelRequest(id)
  },

  // 图片相关
  [SourceActionTypes.ACTION_SOURCE_PIC_BY_TYPE]({ commit }: AugmentedActionContext, id: number) {
    return picListAllRequest(id).then(async (data) => {
      if (!data) return
      const paths = (data as any).map(it => it.path)
      
      let formatData: any = []
      
      if (paths && paths.length) {
        formatData = await ossPicUrlRequest(paths)
      }
      commit(SourcMutationTypes.SOURCE_PIC_BY_TYPE, { id, data: formatData })
    })
  },
  [SourceActionTypes.ACTION_SOURCE_PIC_LIST]({ commit }: AugmentedActionContext, params: PicSearch) {
    return picListRequest(params).then(data => {
      commit(SourcMutationTypes.SOURCE_PIC_LIST, data)
    })
  },
  async [SourceActionTypes.ACTION_SOURCE_PIC_UPLOAD]({ state, commit }: AugmentedActionContext, pic: Pic) {
    return await picSetRequest(pic)
  },
  [SourceActionTypes.ACTION_SOURCE_PIC_DEL]({ commit }: AugmentedActionContext, id: number) {
    return picDelRequest(id)
  },

  // OSS相关
  [SourceActionTypes.ACTION_SOURCE_OSS_PIC_URL]({ commit }: AugmentedActionContext, paths: string[]) {
    return ossPicUrlRequest(paths)
  },

  [SourceActionTypes.ACTION_SOURCE_OSS_PIC_DEL]({ commit }: AugmentedActionContext, paths: string[]) {
    return ossPicDelRequest(paths)
  },
}
