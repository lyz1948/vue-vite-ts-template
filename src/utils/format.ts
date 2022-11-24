export const formatSelect = (list: any, key = 'name') => {
  return list.map((it: any) => {
    const { id } = it
    it.label = it[key]
    it.value = id

    return it
  })
}