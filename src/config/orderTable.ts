import { action } from "./table"

// 游客名单
export const Tourist = [
  { attrs: { prop: 'name', label: '姓名', } },
  { attrs: { prop: 'phone', label: '手机', } },
  { attrs: { prop: 'type', label: '证件类型', } },
  { attrs: { prop: 'cardNum', label: '证件号', } },
  { attrs: { prop: 'gender', label: '性别', } },
  { attrs: { prop: 'age', label: '年龄', } },
  { attrs: { prop: 'contact', label: '联系人', } },
  { attrs: { prop: 'remark', label: '备注', } },
]

export const OtherFee = [
  { attrs: { prop: 'name', label: '类别' } },
  { attrs: { prop: 'name', label: '供应商' } },
  { attrs: { prop: 'name', label: '单价' } },
  { attrs: { prop: 'name', label: '数量' } },
  { attrs: { prop: 'name', label: '金额' } },
  { attrs: { prop: 'name', label: '备注' } },
  { attrs: { prop: 'name', label: '业务员' } },
  action
]

