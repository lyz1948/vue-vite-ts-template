import { ActionContext, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { RootState } from '@/store'
import { Mutations } from './mutations'
import { PermissionState } from './state'
import { PermissionActionTypes } from './action-types'
import { PermissionMutationTypes } from './mutation-types'
import { permissionRoutes } from '@/router/index'
import { permissionListRequest, permissionOnlyHaveRequest } from '@/api/permission'
import { getUserInfo } from '@/utils/cookies'
import { capitalize } from '@/utils/index'
import { App } from '@/config'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

// // 校验权限
// const hasPermission = (route: RouteRecordRaw, roles: string[]) => {
//   if (route.meta && route.meta.roles) {
//     return roles.some(() => {
//       if (route.meta?.roles !== undefined) {
//         return true
//         // return route.meta?.roles.includs(role)
//       }
//     })
//   } else {
//     return true
//   }
// }

// // 过滤路由
// const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
//   const result: RouteRecordRaw[] = []
//   routes.forEach(route => {
//     const routeCopy = { ...route }
//     if (hasPermission(routeCopy, roles)) {
//       if (routeCopy.children) {
//         routeCopy.children = filterAsyncRoutes(routeCopy.children, roles)
//       }
//       result.push(routeCopy)
//     }
//   })
//   return result
// }

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

// const processPathConnector = str => {
//   if (!str) return
//   if (str.indexOf('-') < 0) return str
//   const arr = str.split('-')

//   return `${arr[0]}${arr
//     .slice(1)
//     .map(v => capitalize(v))
//     .join('')}`
// }

// const viteComponents = import.meta.glob('@/views/**/*.vue')
// const getComponents = (path, subMenus) => {
//   const pathArr = path.split('/')
//   if (pathArr.length > 2) {
//     if (subMenus && subMenus.length) {
//       return { component: () => import(`@/views${processPathConnector(path)}/index`) }
//     } else {
//       return {
//         component: () => viteComponents[`../../../${processPathConnector(path)}/index.vue`]
//       }
//     }
//   } 
//   // else {
//   //   return {component: () => import('@/layout'), }
//   // }
// }

// const filterAsyncRoutes2 = roleMenus => {
//   const getRoute = routes => {
//     const res = []

//     for (let i = 0; i < routes.length; i++) {
//       const route = routes[i]
//       const { code, path, orderNumber, authArea, checkAuth, icon, isRole, isShow, name } = route

//       const item = {
//         code,
//         path,
//         orderNumber,
//         authArea,
//         checkAuth,
//         isRole,
//         isShow,
//         name: code,
//         meta: { icon, title: name },
//         ...getComponents(path, route.subMenus),
//       }

//       if (route.subMenus && route.subMenus.length > 0) {
//         const redirect = route.subMenus[0].path
//         res.push({
//           ...item,
//           redirect,
//           children: getRoute(route.subMenus),
//         })
//       } else {
//         res.push({
//           ...item,
//           // children: [],
//         })
//       }
//     }
//     return res
//   }

//   return getRoute(roleMenus)
// }

// const filterMallMenu = (routes: RouteRecordRaw[]) => {
//   return routes.filter((route: any) => (route.code as string).startsWith(App.systemCode))
// }

// const sortRoute = routes => {
//   if (!routes || !routes.length) return

//   return routes.sort((a, b) => {
//     if (a.children && a.children.length) {
//       sortRoute(a.children)
//     }
//     return a.orderNumber - b.orderNumber
//   })
// }

export interface Actions {
  [PermissionActionTypes.ACTION_PERMISSION_ONLY_HAVE]({ commit }: AugmentedActionContext): void

  // [PermissionActionTypes.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext, roles: any[]): void
  // [PermissionActionTypes.ACTION_PERMISSION_LIST]({ commit }: AugmentedActionContext, roleId: number): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  // 拥有的权限
  async [PermissionActionTypes.ACTION_PERMISSION_ONLY_HAVE]({ commit }) {
    commit(PermissionMutationTypes.SET_ROUTES, permissionRoutes)
    // const roleId = getUserInfo()?.roleId
    // const res = await permissionOnlyHaveRequest(roleId)

    // try {
    //   if (res) {
    //     const { roleMenus } = res
    //     const accessedRoutes = filterAsyncRoutes2(roleMenus)

    //     // 过滤掉地接菜单
    //     const filteRoutes = filterMallMenu(accessedRoutes)

    //     // 排序
    //     const sortRouts = sortRoute(filteRoutes)
    //     console.log('sortRouts:', sortRouts)

    //     commit(PermissionMutationTypes.SET_ROUTES, sortRouts)
    //   }
    // } catch (err) {
    //   commit(PermissionMutationTypes.SET_ROUTES, [])
    // }
  },

  // [PermissionActionTypes.ACTION_SET_ROUTES]({ commit }, roles: string[]) {
  //   // const asyncRoutes = filterAsyncRoutes(permissionRoutes, roles)

  //   commit(PermissionMutationTypes.SET_ROUTES, permissionRoutes)
  // },

  // async [PermissionActionTypes.ACTION_PERMISSION_LIST]({ commit }, roleId: number) {
  //   const data = await permissionListRequest(roleId)
  //   commit(PermissionMutationTypes.SET_AUTH_ROUTES, (data as any).roleMenus)
  // },
}
