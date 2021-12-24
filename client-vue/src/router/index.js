import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Index.vue';

import UserManageRouter from './modules/UserManage';
import RoleListRouter from './modules/RoleList';
import PermissionListRouter from './modules/PermissionList';
import ArticleRouter from './modules/Article';
import ArticleCreaterRouter from './modules/ArticleCreate';

/**
 * 私有路由表
 */
export const privateRoutes = [
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter,
  UserManageRouter,
];
/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
});

export default router;
