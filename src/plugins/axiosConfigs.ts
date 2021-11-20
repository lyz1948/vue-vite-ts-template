import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { App } from '@/config'
const { baseURL } = App
// 创建axios的实例
const service = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: false, // 跨域请求时是否需要使用凭证
  timeout: 30000,
  validateStatus() {
    return true
  },

  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log('发送请求之前', config.url);

    // // 获取 token ，并将其添加至请求头中
    // let token = store.state.user.token
    // if (token) {
    //   config.headers.Authorization = token
    //   // config.headers.Authorization = 'Bearer ' + token;
    // }

    return config
  },
  (error: any) => {
    // console.log('发送请求错误', error.response, error.data);

    // 错误抛到业务代码
    error.data = {
      message: '服务器异常，请联系管理员！',
    }

    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('响应拦截', response.status, response);

    /* 处理 http 错误，抛到业务代码 */
    const status = response.status
    const decide = status < 200 || status >= 300
    if (decide) {
      const message = showStatus(status)
      // console.log("处理 http 错误", message);
      if (typeof response.data === 'string') {
        response.data = { message }
      }
      // else {
      //   response.data.message = message
      // }
      ElMessage({
        message,
        type: 'error',
        showClose: true,
      })
      return Promise.reject(response.data)
    }

    return response
  },
  (error: any) => {
    // console.log('请求错误', error, axios.isCancel(error), error.message);

    if (axios.isCancel(error)) {
      // console.log('重复请求: ' + error.message);
      ElMessage({
        message: '请勿重复请求',
        type: 'warning',
        showClose: true,
      })
    } else {
      const message = '请求超时或服务器异常，请检查网络或联系管理员！'
      ElMessage({
        message,
        type: 'error',
        showClose: true,
      })
    }

    return Promise.reject(error)
  }
)

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return message
  // return `${message}，请检查网络或联系管理员！`
}

export default service
