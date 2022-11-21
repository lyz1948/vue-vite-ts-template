// 线路产品
export const ProductList = [
  { attrs: { prop: 'name', label: '产品编号' } },
  {
    attrs: { prop: 'isEnable', label: '产品分类' },
  },
  { attrs: { prop: 'role', label: '线路名称' } },
  { attrs: { prop: 'role', label: '行程天数' } },
  { attrs: { prop: 'role', label: '出发地' } },
  { attrs: { prop: 'role', label: '目的地' } },
  { attrs: { prop: 'role', label: '销售状态' } },
  { attrs: { prop: 'remark', label: '创建人' } },
  { attrs: { prop: 'date', label: '创建时间' } },
  { attrs: { prop: 'action', label: '操作' }, slot: 'action' },
]

// 产品分类
export const ProductCategory = [
  { attrs: { prop: '', label: '分类名称' } },
  { attrs: { prop: '', label: '排序' } },
  { attrs: { prop: '', label: '创建时间' } },
  { attrs: { prop: 'action', label: '操作' }, slot: 'action' },
]

// 产品标签
export const ProductTag = [
  { attrs: { prop: '', label: '标签名称' } },
  { attrs: { prop: '', label: '排序' } },
  { attrs: { prop: '', label: '创建时间' } },
  { attrs: { prop: 'action', label: '操作' }, slot: 'action' },
]

// 产品图片
export const ProductImage = [
  { attrs: { prop: '', label: '图片类型' } },
  { attrs: { prop: '', label: '图片数量' } },
  { attrs: { prop: '', label: '图片大小' } },
  { attrs: { prop: '', label: '创建人' } },
  { attrs: { prop: '', label: '创建时间' } },
  { attrs: { prop: 'action', label: '操作' }, slot: 'action' },
]