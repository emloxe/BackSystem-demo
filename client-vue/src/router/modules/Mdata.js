import layout from '@/layout/Index';

export default {
  path: '/mdata',
  component: layout,
  redirect: '/mdata/manage',
  name: 'mdataManage',
  meta: {
    title: 'mdata',
    icon: 'personnel',
  },
  children: [
    {
      path: '/mdata/manage',
      component: () => import(/* webpackChunkName: "mdata-manage" */ '@/views/mdata-manage/index'),
      meta: {
        title: 'mdataManage',
        icon: 'personnel-manage',
      },
    },
  ],
};
