import { MutationTree } from 'vuex'
import { StaffMutationTypes } from './mutation-types'
import { StaffState } from './state'
import { Staff } from '@/types/system'

export type StaffMutations<S = StaffState> = {
  [StaffMutationTypes.STAFF_DATA](state: S, data: any): void
  [StaffMutationTypes.STAFF_SELECT_DATA](state: S, data: any): void
  [StaffMutationTypes.STAFF_ITEM](state: S, role: Staff): void
}

export const mutations: MutationTree<StaffState> & StaffMutations = {
  [StaffMutationTypes.STAFF_DATA](state: StaffState, data: any) {
    state.staffData = data
  },
  [StaffMutationTypes.STAFF_SELECT_DATA](state: StaffState, data: any) {
    state.staffSelectData = data
  },
  [StaffMutationTypes.STAFF_ITEM](state: StaffState, role: Staff) {
    state.currentStaff = role
  },
}
