import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const weappRouter: RouteRecordRaw[] = [
  {
    path: '/weapp',
    name: 'Weapp',
    component: markRaw(Layout),
    redirect: '/weapp/setting',
    meta: {
      title: '小程序管理',
      icon: 'icon-wechat',
    },
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component: () =>
          import(
            /* webpackChunkName: "setting" */ '@/views/weapp/index.vue'
          ),
        meta: {
          title: '小程序设置',
          icon: 'icon-table',
        },
      },
      {
        path: 'wechat-user',
        name: 'WechatUser',
        component: () =>
          import(
            /* webpackChunkName: "wechatUser" */ '@/views/weapp/index.vue'
          ),
        meta: {
          title: '微信用户管理',
          icon: 'icon-table',
        },
      },
    ],
  },
]

export default weappRouter
