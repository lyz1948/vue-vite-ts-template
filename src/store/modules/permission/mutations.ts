import { MutationTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { PermissionState } from './state'
import { PermissionMutationTypes } from './mutation-types'
// import { RoleAuth } from '@/types/index'

export type Mutations<S = PermissionState> = {
  [PermissionMutationTypes.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
  // [PermissionMutationTypes.SET_AUTH_ROUTES](state: S, routes: RoleAuth[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationTypes.SET_ROUTES](
    state: PermissionState,
    routes: RouteRecordRaw[]
  ) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  },

  // [PermissionMutationTypes.SET_AUTH_ROUTES](
  //   state: PermissionState,
  //   routes: RoleAuth[]
  // ) {
  //   state.authRoleRoutes = routes
  // },
}
