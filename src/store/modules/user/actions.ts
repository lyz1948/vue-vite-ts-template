import { ActionContext, ActionTree } from 'vuex'
import { UserActionTypes } from './action-types'
import { Mutations } from './mutations'
import { IUserState, state } from './state'
import { IRootState, useStore } from '@/store'
import { ILogin } from '@/types'
import { setToken } from '@/utils/cookies'
import { UserMutationTypes } from './mutation-types'
import { removeToken } from '@/utils/cookies'
import { loginRequest, userInfoRequest } from '@/api/user'
import { PermissionActionTypes } from '../permission/action-types'
import { RouteRecordRaw } from 'vue-router'
import router, { resetRouter } from '@/router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IUserState, IRootState>, 'commit'>

export interface IActions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userinfo: ILogin
  ): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({
    commit,
  }: AugmentedActionContext): void
  [UserActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext,
    role: string
  ): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<IUserState, IRootState> & IActions = {
  /** 登录 */
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userinfo: ILogin
  ) {
    const { username, password } = userinfo
    username.trim()

    await loginRequest({
      username,
      password,
    })
      .then((data: any) => {
        // 设置cookie
        setToken(data.access_token)
        commit(UserMutationTypes.SET_TOKEN, data.access_token)
      })
      .catch(err => {
        console.error(err)
      })
  },

  /** 重置token */
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    // 清理cookie
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({
    commit,
  }: AugmentedActionContext) {
    const store = useStore()
    const userId = store.state.user.userinfo?.id
    await userInfoRequest(userId)
      .then((data: any) => {
        console.log('data:', data)
        commit(UserMutationTypes.SET_ROLES, ['admin'])
        commit(UserMutationTypes.SET_USER_INFO, data)
        commit(UserMutationTypes.SET_USER_NAME, data.username)
        commit(UserMutationTypes.SET_AVATAR, data.avatar)
        commit(UserMutationTypes.SET_EMAIL, data.email)
        commit(UserMutationTypes.SET_INTRODUCE, data.introduce)
        return data
      })
      .catch(() => {
        throw Error('获取用户信息失败，请重新登录！')
      })
  },

  async [UserActionTypes.ACTION_CHANGE_ROLES](
    { commit }: AugmentedActionContext,
    role: string
  ) {
    const token = role + '-token'
    const store = useStore()
    commit(UserMutationTypes.SET_TOKEN, token)
    setToken(token)
    await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
    store.dispatch(PermissionActionTypes.ACTION_SET_ROUTES, state.roles)
    store.state.permission.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  },

  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    console.log(commit)
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
    resetRouter()
  },
}
