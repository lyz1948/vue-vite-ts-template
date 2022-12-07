
export const searchState = () => ({
  name: '',
  create: ''
})

export const searchWithdrawState = () => ({
  name: '',
  phone: '',
  date: '',
  status: '',
})

export const formState = () => ({
  name: '',
})

export const formCateState = () => ({
  name: '',
  color: '',
  icon: '',
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

export const rulesCate = {
  name: [{ required: true, message: '类别名称不能为空', trigger: 'blur' }],
}

export const messageCustomer = [
  { title: '订单确定', content: '【未来旅行】尊敬的xx先生/女士您好，您购买的xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>订单已确定，2位成人，1位儿童，订单编号：1235456321324，请等待旅游顾问与您联系。详情可前往未来旅行体验版小程序-个人中心-我的订单查看，祝您旅途愉快！', status: false },
  { title: '退款成功', content: '【未来旅行】尊敬的xx先生/女士您好，您购买的xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>订单编号：1235456321324退款成功，请及时查收确定，详情可前往未来旅行体验版小程序-个人中心-我的订单查看，祝您生活愉快！', status: false },
  { title: '退款失败', content: '【未来旅行】尊敬的xx先生/女士您好，很抱歉，您购买的xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>订单编号：1235456321324退款失败，请致电400-966-1800与客服联系，给您带来不便表示歉意，祝您生活愉快！', status: false },
  { title: '拼团成功', content: '【未来旅行】尊敬的xx先生/女士您好，恭祝您，您发起的拼团xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>拼团成功，详情可前往未来旅行体验版小程序-个人中心-我的拼团查看，祝您旅途愉快！', status: false },
  { title: '砍到低价', content: '【未来旅行】尊敬的xx先生/女士您好，恭祝您，您发起的砍价xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>已成功砍到底价，请及时购买，详情可前往未来旅行体验版小程序-个人中心-我的砍价查看，祝您旅途愉快！', status: false },
  { title: '砍到失败', content: '【未来旅行】尊敬的xx先生/女士您好，很遗憾！您发起的砍价xx年xx月xx日北京出发<泰国普吉岛巴东海滩5晚6日自由行>砍价失败，详情可前往未来旅行体验版小程序-个人中心-我的砍价查看，祝您生活愉快！', status: false },
]

export const messageBusiness = [
  { title: '订单确定', content: '【未来旅行】您有新的订单，请尽快登录TMS后台查看处理！订单编号：1235456321324，联系人：xx先生/女士，联系电话：15888888888，订单金额：3000。', status: false },
  { title: '退款成功', content: '【未来旅行】您有新的退款订单，请尽快登录TMS后台查看处理！订单编号：1235456321324，联系人：xx先生/女士，联系电话：15888888888，订单金额：3000，退款金额：3000。', status: false },
  { title: '退款失败', content: '【未来旅行】您有新的退款失败订单，请尽快登录TMS后台查看处理！订单编号：1235456321324，联系人：xx先生/女士，联系电话：15888888888，订单金额：3000，退款金额：3000。', status: false },
]