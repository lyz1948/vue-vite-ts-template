import { action } from "./table"
// 线路产品
export const ProductList = [
  { attrs: { prop: 'code', label: '产品编号', width: 300 }, slot: 'code' },
  // {
  //   attrs: { prop: 'cate', label: '产品分类' }, slot: 'cate'
  // },
  { attrs: { prop: 'name', label: '线路名称' } },
  { attrs: { prop: 'days', label: '行程天数' } },
  { attrs: { prop: 'departureCity', label: '出发地' } },
  { attrs: { prop: 'arrivalCity', label: '目的地' } },
  // { attrs: { prop: 'status', label: '上架状态' }, slot: 'status'},
  { attrs: { prop: 'isEnable', label: '启用状态' }, slot: 'isEnable'},
  // { attrs: { prop: 'remark', label: '创建人' } },
  // { attrs: { prop: 'createTime', label: '创建时间' } },
  { attrs: { ...action.attrs, width: 280 }, slot: 'action' }
]

// 产品分类
export const ProductCategory = [
  { attrs: { prop: 'name', label: '分类名称' } },
  { attrs: { prop: 'orderNumber', label: '排序' } },
  { attrs: { prop: 'createTime', label: '创建时间' } },
  action,
]

// 产品库存
export const ProductStock = [
  { attrs: { prop: '', label: '日期' }, slot: 'date' },
  { attrs: { prop: '', label: '成人价' }, slot: 'adult' },
  { attrs: { prop: '', label: '儿童价' }, slot: 'child' },
  { attrs: { prop: '', label: '单房差' }, slot: 'room' },
  { attrs: { prop: '', label: '报名截止' }, slot: 'enterEnd' },
  { attrs: { prop: 'planCount', label: '库存' } },
  { attrs: { prop: '', label: '确认' } },
  { attrs: { prop: 'planCount', label: '占位' } },
  { attrs: { prop: 'planSurplusCount', label: '余位' } },
  { attrs: { prop: 'clearDays', label: '清位时间' }, slot: 'clearDate' },
  { attrs: { prop: 'isExceed', label: '可超售' }, slot: 'isExceed' },
  { attrs: { prop: 'saleStatus', label: '状态' }, slot: 'saleStatus' },
  action,
]

// 产品标签
export const ProductTag = [
  { attrs: { prop: 'name', label: '标签名称' }, slot: 'name' },
  { attrs: { prop: 'orderNumber', label: '排序' } },
  { attrs: { prop: 'createTime', label: '创建时间' } },
  action,
]

// 产品图片
export const ProductImage = [
  { attrs: { prop: 'name', label: '图片类型' } },
  { attrs: { prop: '', label: '图片数量' } },
  { attrs: { prop: '', label: '图片大小' } },
  { attrs: { prop: '', label: '创建人' } },
  { attrs: { prop: '', label: '创建时间' } },
  action,
]