import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const tableRouter: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    component: markRaw(Layout),
    redirect: '/table/complex-table',
    meta: {
      title: 'table',
      icon: 'icon-remind',
    },
    children: [
      {
        path: 'component',
        name: 'TableComponent',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/dynamicTable/index.vue'
          ),
        meta: {
          title: 'tableComponent',
          icon: 'icon-remind',
        },
      },
    ],
  },
]

export default tableRouter
