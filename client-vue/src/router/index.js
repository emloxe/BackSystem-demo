import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Index.vue';

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes,
});

export default router;
