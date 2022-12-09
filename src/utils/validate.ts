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

// 生份证号
export const isIDCard = (value: string) =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    value
  )

// 验证中文
export const isChineseCharacter = (value: string) =>
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
    value
  )
