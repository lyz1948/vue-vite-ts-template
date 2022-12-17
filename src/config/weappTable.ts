const action = { attrs: { prop: 'action', label: '操作' }, slot: 'action' }

export const SMSCustomerTpl = [
  { attrs: { prop: 'name', label: '触发条件', width: 100 } },
  { attrs: { prop: 'status', label: '发送用户', width: 100 }, slot: 'status' },
  { attrs: { prop: 'content', label: '短信内容', } },
]

export const SMSBusinessTpl = [
  { attrs: { prop: 'name', label: '触发条件', width: 100 } },
  { attrs: { prop: 'status', label: '发送商家', width: 100 }, slot: 'status' },
  { attrs: { prop: 'content', label: '短信内容', } },
]

export const WithDrow = [
  { attrs: { prop: 'name', label: '提款人姓名' } },
  { attrs: { prop: 'name', label: '提款人电话' } },
  { attrs: { prop: 'name', label: '账号名称' } },
  { attrs: { prop: 'name', label: '账号' } },
  { attrs: { prop: 'name', label: '提款金额' } },
  { attrs: { prop: 'name', label: '申请时间' } },
  { attrs: { prop: 'name', label: '处理状态' } },
  action,
]

// 类目关联设置
export const CategoryTagRelative = [
  { attrs: { prop: 'code', label: '产品编号', width: 300 }, slot: 'code' },
  { attrs: { prop: 'name', label: '线路名称' } },
  { attrs: { prop: 'days', label: '行程天数' } },
  { attrs: { prop: 'departureCity', label: '出发地' } },
  { attrs: { prop: 'arrivalCity', label: '目的地' } },
  { attrs: { prop: 'rel', label: '关联类型' }, slot: 'relative'},
  { attrs: { prop: 'isEnable', label: '启用状态' }, slot: 'isEnable'},
  { attrs: { ...action.attrs, width: 280 }, slot: 'action' }
]