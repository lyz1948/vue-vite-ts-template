export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

// export const isPhone = value => value.length == 11 && /^(13[0-9]{1}|(15[0-9]{1})|(18[0-9]{1})\d{8})$/.test(value)

// export const isTelephone = value => /^(\d{3,4}-?)?(\d{7,9})$/g.test(value)


// 手机校验
export const isPhone = value => {
  value = value + ''
  const reg = /^1[3|4|5|6|7|8|9][0-9]{1}\d{8}$/
  return value.length == 11 && reg.test(value)
}

// 电话校验
export const isTelephone = value => {
  const reg = /(^(\d{3,4}-?)?(\d{7,9})$)|(^400-?(\d{3,4})-?(\d{3,4}))|(^800-?(\d{3,4})-?(\d{3,4}))/g
  return reg.test(value)
}