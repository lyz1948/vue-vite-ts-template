import { TagOrType } from '@/enums/index'

export const searchState = () => ({
  name: '',
  create: '',
})

export const formState = () => ({
  name: '',
  type: TagOrType.TYPE,
  color: '',
  icon: '',
  id: -1,
  orderNumber: 0,
  remarks: '',
})


export const rules = {
  name: [{ required: true, message: '类目名称不能为空', trigger: 'blur' }],
}