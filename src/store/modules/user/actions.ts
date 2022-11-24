/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionContext, ActionTree } from 'vuex'
import { UserActionTypes } from './action-types'
import { Mutations } from './mutations'
import { UserState, LoginClientState } from './state'
import { RootState, useStore } from '@/store'
import { Login } from '@/types'
import { setToken, setUserInfo } from '@/utils/cookies'
import { UserMutationTypes } from './mutation-types'
import { removeToken } from '@/utils/cookies'
import { loginRequest, logoutRequest, userInfoRequest } from '@/api/user'
import { resetRouter } from '@/router/index'

const userKeys = [
  'id',
  'roleId',
  'travelAgencyId',
  'groupId',
  'createUserId',
  'departmentId',
  'departmentName',
  'subDepartmentId',
  'subDepartmentName',
  'grandsonDepartmentId',
  'grandsonDepartmentName',
  'roleName',
  'mobilePhone',
  'telphone',
  'realName',
  'userName',
  'TravelAgency',
]

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface IUserActions {
  [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext, userinfo: Login): void
  [UserActionTypes.ACTION_LOGOUT]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_USER_LIST]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_USER_DELETE]({ commit }: AugmentedActionContext, id: number): void
}

export const actions: ActionTree<UserState, RootState> & IUserActions = {
  loginAfter({ commit }, data) {
    setToken(data.access_token)
    const userData: any = {}
      for (const key of userKeys) {
        userData[key] = data[key]
      }
      setUserInfo(JSON.stringify(userData))

      commit(UserMutationTypes.SET_TOKEN, data.access_token)
  },

  [UserActionTypes.ACTION_LOGIN]({ commit, dispatch }: AugmentedActionContext, userinfo: Login) {
    const { username, password } = userinfo
    username.trim()

    return loginRequest({
      username,
      password,
      ...LoginClientState,
    }).then(data => {
      dispatch('loginAfter', data)
      // setToken(data.accessToken)
      // commit(UserMutationTypes.SET_TOKEN, data.accessToken)
      // return data
    })
  },

  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    const store = useStore()
    const userId = store.state.user.userinfo?.id
    await userInfoRequest(userId)
      .then((data: any) => {
        commit(UserMutationTypes.SET_ROLES, ['admin'])
        commit(UserMutationTypes.SET_USER_INFO, data)
        return data
      })
      .catch(() => {
        throw Error('获取用户信息失败，请重新登录！')
      })
  },

  async [UserActionTypes.ACTION_USER_LIST]({ commit }) {
    // const data = await userListRequest()
    commit(UserMutationTypes.SET_USER_LIST, [])
  },

  [UserActionTypes.ACTION_USER_DELETE]({ commit }, id: number) {
    commit(UserMutationTypes.SET_USER_DELETE, id)
  },

  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }) {
    removeToken()
  },

  [UserActionTypes.ACTION_LOGOUT]({ commit }) {
    removeToken()
    resetRouter()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },
}
