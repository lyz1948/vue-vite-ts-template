/* eslint-disable @typescript-eslint/camelcase */
import { getToken } from '@/utils/cookies'

interface IUserinfo {
  [keys: string]: string | number
}

export const LoginClientState = {
  grant_type: 'password',
  client_id: 'erp',
  client_secret: '123456',
}

export interface UserState {
  token: string
  userinfo: IUserinfo
  userList: Array<any>
}

export const state: UserState = {
  token: getToken() || '',
  userinfo: {},
  userList: []
}
