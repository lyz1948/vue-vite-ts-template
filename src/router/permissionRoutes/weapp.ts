import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const weappRouter: RouteRecordRaw[] = [
  {
    path: '/weapp',
    name: 'Weapp',
    component: markRaw(Layout),
    
    meta: {
      title: '小程序管理',
      icon: 'icon-wechat',
    },
    children: [
      {
        path: 'setting',
        name: 'Setting',
        redirect: '/weapp/setting/banner',
      
        meta: {
          title: '小程序设置',
          icon: 'icon-table',
        },
        children: [
          {
            path: 'banner',
            name: 'Banner',
            component: () =>
              import(
                /* webpackChunkName: "banner" */ '@/views/weapp/banner.vue'
              ),
            meta: {
              title: 'Banner设置',
              icon: 'icon-table',
            },
          },
          {
            path: 'category',
            name: 'Category',
            component: () =>
              import(
                /* webpackChunkName: "category" */ '@/views/weapp/category.vue'
              ),
            meta: {
              title: '线路类目设置',
              icon: 'icon-table',
            },
          },
          {
            path: 'category-tag',
            name: 'CategoryTag',
            component: () =>
              import(
                /* webpackChunkName: "CategoryTag" */ '@/views/weapp/categoryTag.vue'
              ),
            meta: {
              title: '类别关联设置',
              icon: 'icon-table',
            },
          },
          {
            path: 'recommend',
            name: 'Recommend',
            component: () =>
              import(
                /* webpackChunkName: "Recommend" */ '@/views/weapp/recommend.vue'
              ),
            meta: {
              title: '热门推荐设置',
              icon: 'icon-table',
            },
          },
          {
            path: 'withdraw',
            name: 'WithDraw',
            component: () =>
              import(
                /* webpackChunkName: "WithDraw" */ '@/views/weapp/withdraw.vue'
              ),
            meta: {
              title: '提现管理',
              icon: 'icon-table',
            },
          },
          {
            path: 'bind',
            name: 'Bind',
            component: () =>
              import(
                /* webpackChunkName: "Bind" */ '@/views/weapp/bind.vue'
              ),
            meta: {
              title: '小程序绑定',
              icon: 'icon-table',
            },
          },
          {
            path: 'other',
            name: 'Other',
            component: () =>
              import(
                /* webpackChunkName: "Other" */ '@/views/weapp/index.vue'
              ),
            meta: {
              title: '其他设置',
              icon: 'icon-table',
            },
          },
        ]
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
