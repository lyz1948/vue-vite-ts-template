export const searchState = () => ({
  priceType: '',
  productId: '',
  startDate: '',
  endDate: '',
})

export const formState = () => ({
  clearDays: 0,
  clearHours: '',
  endDate: '',
  isExceed: true,
  planCount: 0,
  planDateList: {},
  planSurplusCount: 0,
  prices: [
    {
      adultPrice: 0,
      childPrice: 0,
      customerTypeId: 0,
      id: 0,
      productId: 0,
      productPlanId: 0,
      roomDifference: 0,
      type: '',
    },
  ],
  productId: 0,
  saleStatus: true,
  signUpAdvanceDays: 0,
  signUpAdvanceHours: '',
  startDate: '',
  type: 'DAY',
  weekPlanList: [
    'DAY'
  ],
})

export const rules = {
  productName: [{ required: true, message: '线路名称不能为空', trigger: 'blur' }],
  days: [{ required: true, message: '行程天数不能为空', trigger: 'blur' }],
}
