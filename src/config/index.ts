// 白名单
export const RouteWhiteList = ['/login']

export const PageDefault = {
  pageNum: 1,
  pageSize: 20,
  pageSizes: [10, 20, 30, 50, 100, 200, 500, 1000],
  pageLayout: 'total, sizes, prev, pager, next',
  bgShow: true,
}

export const App = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : '/api',
}
