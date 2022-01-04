import layout from '@/layout/Index';

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/organization',
      component: () => import('@/views/user-manage/Organization'),
      meta: {
        title: 'organization',
        icon: 'personnel-manage',
      },
    },

    {
      path: '/user/manage',
      component: () => import('@/views/user-manage/Index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
      },
    },

    {
      path: '/user/Info',
      component: () => import('@/views/user-manage/Info'),
      meta: {
        title: 'userInfo',
        // icon: 'personnel-manage',
      },
    },

    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfoDetail',
      },
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport',
      },
    },
  ],
};
