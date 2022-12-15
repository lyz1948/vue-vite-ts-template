const httpApi = {
  login: '/uaa/oauth/token', // 用户登录
  logout: '/uaa/tokens/revoke', // 用户登出
  userinfo: '/system/user/getUser',
  code: 'uaa/flushVisitCode',
  sms: 'uaa/sendSMS',

  // 测试接口
  userList: '/api/user/list', // 角色列表

  ossPicUrl: '/upload/url', // 获取图片地址从Oss
  ossPicDel: '/upload/del', // 删除Oss图片

  // 权限
  permissionList: '/system/role/listPermission',
  permissionOnlyHave: '/system/role/listRolePermissionOnlyHave',
  permissionUpdate: '/system/role/updateRoleMenu',

  // 员工
  staffList: '/system/user/page',
  staffSelectList: '/system/user/findList',
  staffCreate: '/system/user/saveOrUpdate',
  staffDelete: '/system/user/del',
  staffUpdate: '/system/user/updateInfo',
  staffUpdatePwd: '/system/user/updatePassword',

  // 字典
  dicList: '/system/dictionary/list',
  dicCreate: '/system/dictionary/saveOrUpdate',
  dicDelte: '/system/dictionary/del',
  dicTypeCreate: '/system/dictionary/saveOrUpdateType',
  dicTypeList: '/system/dictionary/listType',
  dicSearchForCode: '/system/dictionary/listByTypeCode',
  dicListAll: '/system/dictionary/listTypeAndSub',

  // 产品列表
  resourceProduct: '/resource/product/pageNoAuthority',
  resourceProductAll: '/resource/product/list',

  // 商城 设置
  mallConfig: '/system/mall/config',
  mallPhoneList: '/system/mall/contact-phone-list',
  mallPhoneSet: '/system/mall/set-contact-phone',
  mallPhoneDel: '/system/mall/del-contact-phone',
  mallActive: '/system/mall/set-activity-time',
  mallWeappIdSet: '/system/mall/set-miniApps-pra',
  mallRefundSet: '/system/mall/set-refund-pro',
  mallSMSSet: '/system/mall/set-sms',
  mallSMSGet: '/system/mall/sms-config',

  picListAll: '/mall/pic/pics',
  picList: '/mall/pic/page-pics',
  picSet: '/mall/pic/add-update-pic',
  picDel: '/mall/pic/del-pic',

  picTypeList: '/mall/pic/types',
  picTypeSet: '/mall/pic/add-update-type',
  picTypeDel: '/mall/pic/del-type',

  tagList: '/mall/tag-type/list',
  tagSet: '/mall/tag-type/add-update',
  tagDel: '/mall/tag-type/del',

  cateList: '/mall/tag-type/list',
  cateSet: '/mall/tag-type/add-update',
  cateDel: '/mall/tag-type/del',

  productList: '/mall/product/page-product',
  productDetail: '/mall/product/product',
  productSet: '/mall/product/save-update-product',
  productDel: '/mall/product/del-product',

  producStocktList: '/mall/product/list-plan',
  producStocktSet: '/mall/product/save-update-plan',

  producTagOrTypeList: '/mall/product/list-tag-type',
  producTagOrTypeSet: '/mall/product/add-tag-type',
}

export default httpApi
