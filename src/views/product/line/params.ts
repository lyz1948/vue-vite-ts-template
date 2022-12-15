// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }


export const searchState = () => ({
  name: '',
  code: '',
  isEnable: '',
  isRecommend: '',
  travelLineId: '',
})

export const searchGalleryState = () => ({
  name: '',
})

// export const searchTagState = () => ({
//   name: '',
//   create: ''
// })

export const formState = () => ({
  name: '',
})

// 创建行程
export const formNewState = () => ({
  productName: '',
  days: '',
  category: '',
  city: '',
})

export const formTripState = () => ({
  title: '',
})

export const rules = {
  productName: [{ required: true, message: '线路名称不能为空', trigger: 'blur' }],
  days: [{ required: true, message: '行程天数不能为空', trigger: 'blur' }],
}