import { ActionContext, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { RootState } from '@/store'
import { Mutations } from './mutations'
import { PermissionState } from './state'
import { PermissionActionTypes } from './action-types'
import { PermissionMutationTypes } from './mutation-types'
import { permissionRoutes } from '@/router/index'
import { getUserInfo } from '@/utils/cookies'
import { useStore } from '@/store'

import {
  permissionListRequest,
  permissionOnlyHaveRequest,
} from '@/api/permission'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

// 校验权限
const hasPermission = (route: RouteRecordRaw, roles: string[]) => {
  if (route.meta && route.meta.roles) {
    return roles.some(() => {
      if (route.meta?.roles !== undefined) {
        return true
        // return route.meta?.roles.includs(role)
      }
    })
  } else {
    return true
  }
}

// 过滤路由
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach(route => {
    const routeCopy = { ...route }
    if (hasPermission(routeCopy, roles)) {
      if (routeCopy.children) {
        routeCopy.children = filterAsyncRoutes(routeCopy.children, roles)
      }
      result.push(routeCopy)
    }
  })
  return result
}

// const getRoleId = () => {
//   let userInfo: any = null
//   const { roleId } = getUserInfo()
//   if (roleId) {
//     return roleId
//   } else {
//     if (getUserInfo()?.startsWith('{')) {
//       try {
//         userInfo = JSON.parse(getUserInfo() as any)
//       } catch(err) {
//         console.error(err)
//       }
//     }
//     return userInfo ? userInfo.roleId : ''
//   }
// }

export interface Actions {
  [PermissionActionTypes.ACTION_PERMISSION_ONLY_HAVE](
    { commit }: AugmentedActionContext
  ): void

  [PermissionActionTypes.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    roles: any[]
  ): void
  [PermissionActionTypes.ACTION_PERMISSION_LIST](
    { commit }: AugmentedActionContext,
    roleId: number
  ): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  // 拥有的权限
  async [PermissionActionTypes.ACTION_PERMISSION_ONLY_HAVE](
    { commit }
  ) {

    const roleId = getUserInfo()?.roleId
    const res = await permissionOnlyHaveRequest(roleId)
    const asyncRoutes = filterAsyncRoutes([], )

    commit(PermissionMutationTypes.SET_AUTH_ROUTES, asyncRoutes)
    return res
  },

  [PermissionActionTypes.ACTION_SET_ROUTES]({ commit }, roles: string[]) {
    const asyncRoutes = filterAsyncRoutes(permissionRoutes, roles)

    commit(PermissionMutationTypes.SET_ROUTES, asyncRoutes)
  },

  async [PermissionActionTypes.ACTION_PERMISSION_LIST](
    { commit },
    roleId: number
  ) {
    const data = await permissionListRequest(roleId)
    commit(PermissionMutationTypes.SET_AUTH_ROUTES, (data as any).roleMenus)
  },
}
