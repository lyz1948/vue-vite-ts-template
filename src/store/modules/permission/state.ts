import { RouteRecordRaw } from 'vue-router'
import { RoleAuth } from '@/types/index'

export interface PermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
  authRoleRoutes: RoleAuth[]
}

export const state: PermissionState = {
  routes: [],
  dynamicRoutes: [],
  authRoleRoutes: [],
}
