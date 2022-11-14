import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const ErrorRouter: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'Error',
    component: markRaw(Layout),
    redirect: '/not-auth',
    meta: {
      title: '错误页面',
      icon: 'icon-folder-block',
    },
    children: [
      {
        path: 'not-auth',
        name: 'page401',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/errorPage/401.vue'
          ),
        meta: {
          title: '401',
          icon: 'icon-shield',
        },
      },
      {
        path: 'not-found',
        name: 'page404',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/errorPage/404.vue'
          ),
        meta: {
          title: '404',
          icon: 'icon-bug',
        },
      },
    ],
  },
]

export default ErrorRouter
