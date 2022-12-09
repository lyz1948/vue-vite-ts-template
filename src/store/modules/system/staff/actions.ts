/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, ActionContext } from 'vuex'
import { StaffState } from './state'
import { StaffActionTypes } from './action-types'
import { Staff, StaffSearch } from '@/types/system'
import { StaffMutations } from './mutations'
import { RootState } from '@/store'
import { StaffMutationTypes } from './mutation-types'

import {
  staffCreateRequest,
  staffDeleteRequest,
  staffUpdateRequest,
  staffListRequest,
  staffSelectListRequest,
} from '@/api/system/staff'
import { parseDate } from '@/utils/datetime'


type AugmentedActionContext = {
  commit<K extends keyof StaffMutations>(
    key: K,
    payload: Parameters<StaffMutations[K]>[1]
  ): ReturnType<StaffMutations[K]>
} & Omit<ActionContext<StaffState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof StaffMutations>(key: K): ReturnType<StaffMutations[K]>
} & Omit<ActionContext<StaffState, RootState>, 'commit'>

export interface StaffActions {
  [StaffActionTypes.ACTION_STAFF_CREATE](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): void
  [StaffActionTypes.ACTION_STAFF_DELETE](
    { commit }: AugmentedActionContext,
    staffId: number
  ): void
  [StaffActionTypes.ACTION_STAFF_UPDATE](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): void
  [StaffActionTypes.ACTION_STAFF_FETCH](
    { commit }: AugmentedActionContext,
    params: StaffSearch
  ): void
  [StaffActionTypes.ACTION_STAFF_SELECT_FETCH]({
    commit,
  }: AugmentedActionContext): void
}

export const actions: ActionTree<StaffState, RootState> & StaffActions = {
  async [StaffActionTypes.ACTION_STAFF_CREATE](
    { commit }: AugmentedActionContext,
    staff: Staff
  ) {
    return await staffCreateRequest(staff)
  },

  async [StaffActionTypes.ACTION_STAFF_DELETE](
    { commit }: AugmentedActionContext,
    staffId: number
  ) {
    return await staffDeleteRequest(staffId)
  },

  async [StaffActionTypes.ACTION_STAFF_UPDATE](
    { commit }: AugmentedActionContext,
    staff: Staff
  ) {
    return await staffUpdateRequest(staff)
  },

  async [StaffActionTypes.ACTION_STAFF_FETCH](
    { commit }: AugmentedActionContext,
    params: StaffSearch
  ) {
    const staffData = await staffListRequest(params)
    staffData.list = staffData.list.map((it: any) => {
      it.createTime = parseDate(it.createTime)
      return it
    })
    commit(StaffMutationTypes.STAFF_DATA, staffData)
  },

  async [StaffActionTypes.ACTION_STAFF_SELECT_FETCH]({
    commit,
  }: AugmentedActionContext) {
    const data = await staffSelectListRequest()
    commit(StaffMutationTypes.STAFF_SELECT_DATA, data)
    return data
  },
}
