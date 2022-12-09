const action = { attrs: { prop: 'action', label: '操作' }, slot: 'action' }

// 线路产品
export const ProductList = [
  { attrs: { prop: 'orderNumber', label: '产品编号' } },
  {
    attrs: { prop: 'category', label: '产品分类' },
  },
  { attrs: { prop: 'productName', label: '线路名称' } },
  { attrs: { prop: 'days', label: '行程天数' } },
  { attrs: { prop: 'role', label: '出发地' } },
  { attrs: { prop: 'target', label: '目的地' } },
  { attrs: { prop: 'role', label: '销售状态' } },
  { attrs: { prop: 'remark', label: '创建人' } },
  { attrs: { prop: 'date', label: '创建时间' } },
  action
]

// 产品分类
export const ProductCategory = [
  { attrs: { prop: '', label: '分类名称' } },
  { attrs: { prop: '', label: '排序' } },
  { attrs: { prop: '', label: '创建时间' } },
  action,
]

// 产品库存
export const ProductStock = [
  { attrs: { prop: '', label: '日期' } },
  { attrs: { prop: '', label: '成人价' } },
  { attrs: { prop: '', label: '儿童价' } },
  { attrs: { prop: '', label: '单房差' } },
  { attrs: { prop: '', label: '报名截止' } },
  { attrs: { prop: '', label: '库存' } },
  { attrs: { prop: '', label: '确认' } },
  { attrs: { prop: '', label: '占位' } },
  { attrs: { prop: '', label: '余位' } },
  { attrs: { prop: '', label: '清位时间' } },
  { attrs: { prop: '', label: '可超售' } },
  { attrs: { prop: '', label: '状态' } },
  action,
]

// 产品标签
export const ProductTag = [
  { attrs: { prop: '', label: '标签名称' } },
  { attrs: { prop: '', label: '排序' } },
  { attrs: { prop: '', label: '创建时间' } },
  action,
]

// 产品图片
export const ProductImage = [
  { attrs: { prop: '', label: '图片类型' } },
  { attrs: { prop: '', label: '图片数量' } },
  { attrs: { prop: '', label: '图片大小' } },
  { attrs: { prop: '', label: '创建人' } },
  { attrs: { prop: '', label: '创建时间' } },
  action,
]