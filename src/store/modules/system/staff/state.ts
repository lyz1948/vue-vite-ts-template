import { Staff } from '@/types/system'
export interface StaffState {
  staffData: object | null
  staffSelectData: Array<object> | null
  currentStaff: Staff | null
}

export const state: StaffState = {
  staffData: null,
  staffSelectData: null,
  currentStaff: null,
}
