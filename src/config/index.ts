const host = '0.0.0.0'
const port = 5234

// export const isDev = import.meta.env.MODE === 'development'
export const ServerConf = {
  base: './',
  host,
  port,
}

// 白名单
export const RouteWhiteList = ['/login']

export const PageDefault = {
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 50],
  pageLayout: 'prev, pager, next',
  bgShow: true,
}

export const App = {
  // baseURL: isDev ? `http://127.0.0.1:${port}/` : '/api',
}
