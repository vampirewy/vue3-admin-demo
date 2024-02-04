import HomeView from '@/views/home/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    component: HomeView,
  },
]
