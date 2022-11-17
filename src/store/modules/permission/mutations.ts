import { MutationTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { PermissionState } from './state'
import { PermissionMutationTypes } from './mutation-types'

export type Mutations<S = PermissionState> = {
  [PermissionMutationTypes.SET_ROUTER](state: S, routes: RouteRecordRaw[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationTypes.SET_ROUTER](
    state: PermissionState,
    routes: RouteRecordRaw[]
  ) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  },
}
