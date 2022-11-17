import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const systemRouter: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: markRaw(Layout),
    redirect: '/system/material',
    meta: {
      title: '系统管理',
      icon: 'icon-wechat',
    },
    children: [
      {
        path: 'material',
        name: 'Material',
        component: () =>
          import(
            /* webpackChunkName: "material" */ '@/views/system/material/index.vue'
          ),
        meta: {
          title: '素材管理',
          icon: 'icon-table',
        },
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () =>
          import(
            /* webpackChunkName: "dictionary" */ '@/views/system/dictionary/index.vue'
          ),
        meta: {
          title: '字典管理',
          icon: 'icon-table',
        },
      },
    ],
  },
]

export default systemRouter
