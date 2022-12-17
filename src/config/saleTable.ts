import { action } from "./table"
// 团期交客
export const SaleOrder = [
  { attrs: { prop: '', label: '团期', } },
  { attrs: { prop: '', label: '供应商', } },
  { attrs: { prop: '', label: '线路产品', } },
  { attrs: { prop: '', label: '城市', } },
  { attrs: { prop: '', label: '天数', } },
  { attrs: { prop: '', label: '截止报名', } },
  { attrs: { prop: '', label: '余位', } },
  { attrs: { prop: '', label: '价格', } },
  action,
]

// 交客订单
export const SaleDeal = [
  { attrs: { prop: '', label: '订单号', } },
  { attrs: { prop: '', label: '人数', } },
  { attrs: { prop: '', label: '供应商', } },
  { attrs: { prop: '', label: '线路产品', } },
  { attrs: { prop: '', label: '订单金额', } },
  { attrs: { prop: '', label: '类型', } },
  { attrs: { prop: '', label: '创建时间', } },
  { attrs: { prop: '', label: '订单状态', } },
  action
]

// 订单管理
export const SaleOrderManage = [
  { attrs: { prop: '', label: '订单信息', }, slot: 'info' },
  { attrs: { prop: '', label: '游客人数', } },
  { attrs: { prop: '', label: '收客', }, slot: 'detail' },
  { attrs: { prop: '', label: '交客', }, slot: 'delivery' },
  { attrs: { prop: '', label: '其他成本', } },
  { attrs: { prop: '', label: '毛利', } },
  action
]

// 收客订单
export const SaleTeamOrder = [
  { attrs: { prop: '', label: '订单号', } },
  { attrs: { prop: '', label: '人数', } },
  { attrs: { prop: '', label: '客户', } },
  { attrs: { prop: '', label: '线路产品', } },
  { attrs: { prop: '', label: '订单金额', } },
  { attrs: { prop: '', label: '来源', } },
  { attrs: { prop: '', label: '创建时间', } },
  { attrs: { prop: '', label: '订单状态', } },
  action
]

// 团期计划
export const SaleTeamPlan = [
  { attrs: { prop: '', label: '团期', } },
  { attrs: { prop: '', label: '销售状态', } },
  { attrs: { prop: '', label: '线路产品', } },
  { attrs: { prop: '', label: '城市', } },
  { attrs: { prop: '', label: '天数', } },
  { attrs: { prop: '', label: '截止报名', } },
  { attrs: { prop: '', label: '计划', } },
  { attrs: { prop: '', label: '占位', } },
  { attrs: { prop: '', label: '确认', } },
  { attrs: { prop: '', label: '余位', } },
  { attrs: { prop: '', label: '成本价', } },
  action,
]

// 游客名单
export const TouristList = [
  { attrs: { prop: '', label: '序号', } },
  { attrs: { prop: '', label: '姓名', } },
  { attrs: { prop: '', label: '手机号', } },
  { attrs: { prop: '', label: '证件类型', } },
  { attrs: { prop: '', label: '证件号', } },
  { attrs: { prop: '', label: '性别', } },
  { attrs: { prop: '', label: '年龄', } },
  { attrs: { prop: '', label: '联系人', } },
  { attrs: { prop: '', label: '备注', } },
  action,
]

// 报名表
export const SalePrice = [
  { attrs: { prop: 'type', label: '价格类型', width: '120' }, slot: 'type' },
  { attrs: { prop: 'adult', label: '成人价', }, slot: 'adult' },
  { attrs: { prop: 'children', label: '儿童价', }, slot: 'children' },
  { attrs: { prop: 'room', label: '单房差', }, slot: 'room' },
]