import { modeOpts } from "./setting"

const yesNo = [
  { value: 0, label: '否' },
  { value: 1, label: '是' },
]

export default {
  yesNo,

  role: [
    { value: 'manage', label: '经理' },
    { value: 'financial', label: '财务' },
    { value: 'generalManager', label: '管理员' },
  ],

  layout: modeOpts,

  sale: [
    { value: '', label: '全部' },
    { value: '1', label: '销售中' },
    { value: '0', label: '已停售' },
  ],

  orderSource: [
    { value: '1', label: '自来客' },
    { value: '2', label: '小程序' },
    { value: '3', label: '平台' },
  ],
}
