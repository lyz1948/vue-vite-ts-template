// system columns config
export const RoleColumn = [
  { attrs: { prop: 'name', label: '角色姓名', sortable: true } },
  {
    attrs: { prop: 'isEnable', label: '启用状态', sortable: true },
    slot: 'isEnable',
  },
  { attrs: { prop: 'role', label: '角色' }, slot: 'role' },
  { attrs: { prop: 'remark', label: '备注' } },
  { attrs: { prop: 'date', label: '创建时间' } },
  { attrs: { prop: 'action', label: '操作' }, slot: 'action' },
]
