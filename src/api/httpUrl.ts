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

  // 商城
  mallConfig: '/system/mall/config',
  mallPhoneList: '/system/mall/contact-phone-list',
  mallPhoneSet: '/system/mall/set-contact-phone',
  mallPhoneDel: '/system/mall/del-contact-phone',
  mallActive: '/system/mall/set-activity-time',
  mallWeappIdSet: '/system/mall/set-miniApps-pra',
  mallRefundSet: '/system/mall/set-refund-pro',
  mallSMSSet: '/system/mall/set-sms',
  mallSMSGet: '/system/mall/sms-config',
}

export default httpApi
