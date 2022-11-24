import { Page } from './index'

export interface Role {
  id?: number | string
  name: string
  singleGroupAuditRole: string
  auditRole: string
  remarks: string
  isEnable: boolean
  showCustomerInfo: true
}

export interface RoleSearch {
  roleName: string
}

export interface RoleDelete {
  roleId: string | number
}

export interface Staff {
  id?: number
  userName: string
  password?: string
  mobilePhone: string
  telphone: string
  realName: string
  department: string
  remark?: string
  idCard: string
  isEnable: boolean
  groupId?: number
  createUserId?: number
  travelAgencyId?: number
}

export interface StaffSearch {
  name: string
}

export interface Depart {
  name: string
  code: string
  depart: string
  departmentId: string
  subDepartmentId: string
  grandsonDepartmentId: string
}

export interface DepartSearch {
  [keys: string]: string
}

export interface DepartDelete {
  id: number
  level: number
}

export interface Department {
  department?: string
  subDepartment?: string
  grandsonDepartment?: string
}
export interface DepartmentName {
  departmentName?: string
  subDepartmentName?: string
  grandsonDepartmentName?: string
}
export interface DepartmentId {
  departmentId: number
  subDepartmentId: number
  grandsonDepartmentId: number
}

export interface DictionaryItem {
  id?: string | number
  name: string
  orderNumber: number
  mealLabelPrice?: number
  dictionaryTypeId: string | number
  // createUserId?: number
  // travelAgencyId?: number
}

export interface DictionaryTypeItem {
  code: string
  createTime: Date
  createUserId: string
  id: string
  isCannotAdd: boolean
  isDelete: boolean
  isEnable: boolean
  name: string
}

export interface DictionaryTypeAndSubItem {
  id: number
  name: string
  area: string
  dictionaryTypeId: number
  isEnable: boolean
  mealLabelPrice: number
  orderNumber: number
  travelAgencyId: number
}

export interface DictionaryTypeAndSub {
  agencyDictionaryList: Array<DictionaryTypeAndSubItem>
  id: number
  name: string
  code: string
  isCannotAdd: boolean
  isEnable: boolean
}
