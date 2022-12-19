
export const formState = () => ({
  name: '',
  orderNumber: 0,
  originalPrice: 0,
})


export const rules = {
  name: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
}