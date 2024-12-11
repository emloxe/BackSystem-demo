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
      path: '/tool/build',
      component: () =>
        import(/* webpackChunkName: "mdata-manage" */ '@/views/tool/build/index.vue'),
      meta: {
        title: 'toolBuild',
        icon: 'tool-manage',
      },
    },
  ],
};
