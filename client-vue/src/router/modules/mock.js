import layout from '@/layout/Index';

export default {
  path: '/mock',
  component: layout,
  redirect: '/mock/list',
  name: 'mockList',
  meta: {
    title: 'mock',
    icon: 'personnel',
  },
  children: [
    {
      path: '/mock/list',
      component: () => import('@/views/mock/List'),
      meta: {
        title: 'mockList',
        icon: 'personnel-manage',
      },
    },
    {
      path: '/mock/help',
      component: () => import('@/views/mock/Help'),
      meta: {
        title: 'mockHelp',
        icon: 'personnel-manage',
      },
    },
  ],
};
