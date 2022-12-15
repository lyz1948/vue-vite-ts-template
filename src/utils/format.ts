import pinyin from 'pinyin'

export const formatSelect = (list: any, key = 'name') => {
  return list.map((it: any) => {
    const { id } = it
    it.label = it[key]
    it.value = id

    return it
  })
}

export const formatInput = (list: any, key = 'name') => {
  return list.map((it: any) => {
    it.value = it.id
    it.label = it[key]

    const py = pinyin(it[key], {
      style: pinyin.STYLE_FIRST_LETTER,
      heteronym: false,
    })
      .map((item: any) => {
        return item[0]
      })
      .join('')
    it.slug = py

    return it
  })
}