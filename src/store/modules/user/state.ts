import { getToken } from '@/utils/cookies'

interface IUserinfo {
  [keys: string]: string | number
}

export interface IUserState {
  token: string
  roles: string[]
  userinfo: IUserinfo
  userList: Array<any>
}

export const state: IUserState = {
  token: getToken() || '',
  roles: ['admin'],
  userinfo: {},
  userList: []
}
