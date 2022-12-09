import { TagOrType } from '@/enums/index'

export const searchState = () => ({
  name: '',
  create: '',
})

export const formState = () => ({
  name: '',
  type: TagOrType.TAG,
  color: '',
  icon: '',
  id: -1,
  orderNumber: 0,
  remarks: '',
})
