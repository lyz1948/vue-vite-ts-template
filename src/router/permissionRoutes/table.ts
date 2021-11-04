import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRouter: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    component: Layout,
    redirect: '/table/complex-table',
    meta: {
      title: 'table',
      icon: 'remind',
    },
    children: [
      {
        path: 'complex-table',
        name: 'ComplexTable',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/dynamicTable/index.vue'
          ),
        meta: {
          title: 'complexTable',
          icon: 'remind',
        },
      },
      {
        path: 'dynamic-table2',
        name: 'ComplexTable2',
        component: () =>
          import(
            /* webpackChunkName: "dynamicTable" */ '@/views/dynamicTable/index.vue'
          ),
        meta: {
          title: 'complexTable2',
          icon: 'remind',
        },
      },
    ],
  },
]

export default tableRouter
