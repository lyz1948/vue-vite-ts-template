// 格式化url参数
export const parseQuerys = (url: string, querys: any) => {
  if (typeof querys != 'object') {
    return url
  }
  
  const arr: any[] = []
  
  for (const key in querys) {
    arr.push(`${key}=${querys[key]}`)
  }
  url = url.indexOf('?') != -1 ? url : url + '?'
  return url + arr.join('&')
}
  
export const generateMonth = (num: number) => {
  const monthStr = '一|二|三|四|五|六|七|八|九|十|十一|十二'

  const months = monthStr.split('|').map(month => month + '月')

  return months.slice(0, num)
}

