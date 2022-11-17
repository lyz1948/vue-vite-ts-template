import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const productRouter: RouteRecordRaw[] = [
  {
    path: '/product',
    name: 'Product',
    component: markRaw(Layout),
    redirect: '/product/line',
    meta: {
      title: '产品管理',
      icon: 'icon-remind',
    },
    children: [
      {
        path: 'line',
        name: 'Line',
        component: () =>
          import(
            /* webpackChunkName: "line" */ '@/views/product/index.vue'
          ),
        meta: {
          title: '线路管理',
          icon: 'icon-table',
        },
      },
      {
        path: 'line-add',
        name: 'LineAdd',
        component: () =>
          import(
            /* webpackChunkName: "lineAdd" */ '@/views/product/create.vue'
          ),
        meta: {
          title: '新增线路',
          icon: 'icon-table',
          hidden: true,
        },
      },
      {
        path: 'category',
        name: 'Category',
        component: () =>
          import(
            /* webpackChunkName: "category" */ '@/views/product/index.vue'
          ),
        meta: {
          title: '产品分类',
          icon: 'icon-table',
        },
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: () =>
          import(
            /* webpackChunkName: "gallery" */ '@/views/product/index.vue'
          ),
        meta: {
          title: '产品图片',
          icon: 'icon-table',
        },
      },
    ],
  },
]

export default productRouter
