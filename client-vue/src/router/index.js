// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/Index.vue';
import Dashboard from '@/views/dashboard/Index.vue';

import UserManageRouter from './modules/UserManage';
import RoleListRouter from './modules/RoleList';
import permissionRouter from './modules/permission';
import ArticleRouter from './modules/Article';
import ArticleCreaterRouter from './modules/ArticleCreate';
import mockRouter from './modules/mock';

/**
 * 私有路由表
 */
export const privateRoutes = [
  RoleListRouter,
  permissionRouter,
  ArticleRouter,
  ArticleCreaterRouter,
  UserManageRouter,
  mockRouter,
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
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Dashboard,
        meta: {
          title: 'index',
          icon: 'el-icon-user',
        },
      },
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/Index'),
      },
    ],
  },
  {
    path: '/401',
    name: '401',

    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401'),
    meta: {
      title: '无预览权限', // todo i18n
      isHide: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    ...publicRoutes,
    ...privateRoutes,
    {
      // 404 page must be placed at the end !!!
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404'),
      meta: {
        title: '找不到页面', // todo i18n
        isHide: true,
      },
    },
  ],
});

export default router;
