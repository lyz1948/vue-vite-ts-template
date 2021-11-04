import { IApi } from '@/types'

const httpApi: IApi = {
  // 测试接口
  banner: '/home/banner', // banner
  login: '/uaa/oauth/token', // 用户登录
  userinfo: '/system/user/getUser',
}

export default httpApi
