import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('../pages/Home.vue')
      }
    ]
  }
]


export default routes
