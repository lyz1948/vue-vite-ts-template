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
}
