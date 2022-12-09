import { MutationTree } from 'vuex'
import { SourcMutationTypes } from './mutation-types'
import { SourceState } from './state'

export type StaffMutations<S = SourceState> = {
  [SourcMutationTypes.SOURCE_PIC_LIST](state: S, data: any): void
}

export const mutations: MutationTree<SourceState> & StaffMutations = {
  [SourcMutationTypes.SOURCE_PIC_LIST](state: SourceState, data: any) {
    state.picList = data
  },
}
