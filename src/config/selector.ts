import { modeOpts } from "./setting"
import { PaymentEnum, PaymentLabelEnum } from '@/enums/index'

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

  payment: [
    { value: PaymentEnum.GZ, label: PaymentLabelEnum.GZ },
    { value: PaymentEnum.WX, label: PaymentLabelEnum.WX },
    { value: PaymentEnum.ZFB, label: PaymentLabelEnum.ZFB },
  ],

  orderStatus: [
    { value: '1', label: '挂账' },
    { value: '2', label: '微信' },
    { value: '3', label: '支付宝' },
  ],

  telType: [
    { value: '1', label: '客服电话' },
    { value: '2', label: '通知电话' },
  ],

  handle: [
    { value: '0', label: '未打款' },
    { value: '1', label: '已打款' },
  ],

}
