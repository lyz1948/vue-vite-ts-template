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


function generateMonth(num: number): []
function generateMonth(num: { start: number, end: number } ): []

function generateMonth (num) {
  const monthStr = '一|二|三|四|五|六|七|八|九|十|十一|十二'
  const months = monthStr.split('|').map(month => month + '月')

  if (typeof num === 'object') {
    const { start, end } = num
    return months.slice(Math.max(start, 0), Math.min(end, months.length))
  }

  return months.slice(0, num)
}

export { generateMonth }

export const throttle = (fn: Function, wait: number) => {
  let inThrottle: boolean, lastFn: any, lastTime: number

  return (...args: Array<any>) => {
    if (!inThrottle) {
      fn.apply(args)
      inThrottle = true
      lastTime = Date.now()
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(args)
            lastTime = Date.now()
          }
        },
        Math.max(wait - (Date.now() - lastTime)),
        0
      )
    }
  }
}

export const debounce = (fn, ms = 0) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}