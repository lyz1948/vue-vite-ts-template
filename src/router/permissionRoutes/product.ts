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
      orderNumber: 2,
    },
    children: [
      {
        path: 'line',
        name: 'Line',
        component: () =>
          import(
            /* webpackChunkName: "Line" */ '@/views/product/index.vue'
          ),
        meta: {
          title: '线路管理',
          icon: 'icon-table',
        },
      },
      {
        path: 'stock',
        name: 'Stock',
        component: () =>
          import(
            /* webpackChunkName: "Stock" */ '@/views/product/stock.vue'
          ),
        meta: {
          title: '产品库存',
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
        path: 'cate',
        name: 'Cate',
        component: () =>
          import(
            /* webpackChunkName: "Cate" */ '@/views/product/category.vue'
          ),
        meta: {
          title: '产品类目',
          icon: 'icon-table',
        },
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () =>
          import(
            /* webpackChunkName: "Tag" */ '@/views/product/tag.vue'
          ),
        meta: {
          title: '产品标签',
          icon: 'icon-table',
        },
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: () =>
          import(
            /* webpackChunkName: "Gallery" */ '@/views/product/gallery.vue'
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
