import layout from '@/layout/Index';

export default {
  path: '/tool',
  component: layout,
  redirect: '/tool/mock',
  name: 'tool',
  meta: {
    title: 'tool',
    icon: 'personnel',
  },
  children: [
    {
      path: '/tool/mock',
      component: () => import(/* webpackChunkName: "mdata-manage" */ '@/views/tool/Mock'),
      meta: {
        title: 'mock',
        icon: 'personnel-manage',
      },
    },
  ],
};
