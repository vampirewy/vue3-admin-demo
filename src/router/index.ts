import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'
import LayoutView from '@/views/layout/LayoutView.vue'
import LoginView from '@/views/login/LoginView.vue'
import { HomeRoute } from './home'

export const routers: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Layout',
    component: LayoutView,
    redirect: '/home',
    children: [...HomeRoute],
  },
]

let router: Router = createRouter({
  history: createWebHistory(),
  routes: routers,
})

export default router

export function setRouterInstance(routerInstance: Router) {
  router = routerInstance
}
export function getRouterInstance() {
  return router
}
