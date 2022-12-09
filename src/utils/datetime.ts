
export function parseTime(time: any, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

export function parseDate(time: Date) {
  if (!time) return ''
  return parseTime(time, '{y}-{m}-{d}')
}

// 获取年月日
export const formatYMD = (date: Date) => {
  if (!date) return {}
  const today = parseDate(date) as any
  const [year, month, day] = today.split('-')
  return { year, month, day }
}

// 获取每月1号是星期几
export const getFirstDayWeek = (year: number, month: any, day = 1) => {
  const y = new Date(year).getFullYear()
  const m = new Date(month).getMonth()
  const date = new Date(y, m, day)
  return date.getDay()
}

// 获取当前年
export const currentYear = () => {
  const { year } = formatYMD(new Date)
  return year
}

// 获取当前月
export const currentMonth = () => {
  const { month } = formatYMD(new Date)
  return month
}

// 获取下一天
export const getNextDate = (date: Date) => {
  const d = new Date(date).getTime()
  const newDate = +d + 1000 * 60 * 60 * 24
  date = new Date(newDate)
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  )
}

export const isLeapYear = (year: number) => {
  // 如果year年2月没有29则自动进一变为3月1日
  const date = new Date(year, 1, 29)
  return date.getDate() === 29
}

// 获取月份天数
export const getMonthCount = (year?: number, month?: number) => {
  const d = new Date()
  year = year || d.getFullYear()
  month = month || d.getMonth() + 1
  const date = new Date(year, month, 1, 0, 0, 0).getTime()
  const yesterDay = new Date(date - 1000)
  return yesterDay.getDate()
}

// 格式化IOS时间，针对ios
export function formatIosDate(date: string, fmt: string) {
  return parseTime(new Date(date.replace(/-/g, '/')), fmt)
}

// 格式化时间
export function formatTime(time: any, option: string) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d: any = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
