import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import Layout from '@/layout/index.vue'

const weappRouter: RouteRecordRaw[] = [
  {
    path: '/sale',
    name: 'Sale',
    component: markRaw(Layout),
    redirect: '/weapp/setting',
    meta: {
      title: '销售管理',
      icon: 'icon-wechat',
      orderNumber: 1,
    },
    children: [
      {
        path: 'team-order',
        name: 'TeamOrder',
        component: () =>
          import(
            /* webpackChunkName: "teamOrder" */ '@/views/sale/teamOrder/index.vue'
          ),
        meta: {
          title: '团期交客',
          icon: 'icon-table',
        },
      },
      {
        path: 'team-plan',
        name: 'TeamPlan',
        component: () =>
          import(
            /* webpackChunkName: "teamPlan" */ '@/views/sale/teamPlan/index.vue'
          ),
        meta: {
          title: '团期计划',
          icon: 'icon-table',
        },
      },

      {
        path: 'order-manage',
        name: 'orderManage',
        component: () =>
          import(
            /* webpackChunkName: "orderManage" */ '@/views/sale/orderManage/index.vue'
          ),
        meta: {
          title: '订单管理',
          icon: 'icon-table',
        },
      },
      {
        path: 'order-manage-detail',
        name: 'orderManageDetail',
        component: () =>
          import(
            /* webpackChunkName: "orderManageDetail" */ '@/views/sale/orderManage/detail.vue'
          ),
        meta: {
          title: '订单编辑',
          icon: 'icon-table',
        },
      },
      {
        path: 'order',
        name: 'order',
        component: () =>
          import(
            /* webpackChunkName: "order" */ '@/views/sale/order/index.vue'
          ),
        meta: {
          title: '收客订单',
          icon: 'icon-table',
        },
      },
      {
        path: 'orderDeal',
        name: 'orderDeal',
        component: () =>
          import(
            /* webpackChunkName: "orderDeal" */ '@/views/sale/orderDeal/index.vue'
          ),
        meta: {
          title: '成交订单',
          icon: 'icon-table',
        },
      },
    ],
  },
]

export default weappRouter
