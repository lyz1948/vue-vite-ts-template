const httpApi = {
  login: '/uaa/oauth/token', // 用户登录
  logout: '/uaa/tokens/revoke', // 用户登出
  userinfo: '/system/user/getUser',
  code: 'uaa/flushVisitCode',
  sms: 'uaa/sendSMS',

  // 测试接口
  userList: '/api/user/list', // 角色列表

  // 权限
  permissionList: '/system/role/listPermission',
  permissionOnlyHave: '/system/role/listRolePermissionOnlyHave',
  permissionUpdate: '/system/role/updateRoleMenu',

  // 字典
  dicList: '/system/dictionary/list',
  dicCreate: '/system/dictionary/saveOrUpdate',
  dicDelte: '/system/dictionary/del',
  dicTypeCreate: '/system/dictionary/saveOrUpdateType',
  dicTypeList: '/system/dictionary/listType',
  dicSearchForCode: '/system/dictionary/listByTypeCode',
  dicListAll: '/system/dictionary/listTypeAndSub',
}

export default httpApi
