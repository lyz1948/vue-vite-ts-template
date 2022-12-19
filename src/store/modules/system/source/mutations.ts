import { MutationTree } from 'vuex'
import { SourcMutationTypes } from './mutation-types'
import { SourceState } from './state'

export type StaffMutations<S = SourceState> = {
  [SourcMutationTypes.SOURCE_PIC_TYPE_LIST](state: S, data: any): void
  [SourcMutationTypes.SOURCE_PIC_LIST](state: S, data: any): void
  [SourcMutationTypes.SOURCE_PIC_BY_TYPE](state: S, res: any): void
}

export const mutations: MutationTree<SourceState> & StaffMutations = {
  [SourcMutationTypes.SOURCE_PIC_TYPE_LIST](state: SourceState, data: any) {
    // state.picTypeList = [{ name: '全部', id: '-1'}, ...data]
    state.picTypeList = data

  },
  [SourcMutationTypes.SOURCE_PIC_LIST](state: SourceState, data: any) {
    state.picList = data
  },
  [SourcMutationTypes.SOURCE_PIC_BY_TYPE](state: SourceState, res: any) {
    const { id, data } = res
    console.log('id, data:', id, data)
    state.picByTypeList[id] = data
  },
}
