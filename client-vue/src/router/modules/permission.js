import layout from '@/layout/Index';

export default {
  path: '/permission',
  component: layout,
  redirect: '/permission/manage',
  name: 'permissionList',
  meta: { title: 'permission', icon: 'personnel' },
  children: [
    {
      path: '/permission/role',
      component: () => import('@/views/permission/Role'),
      meta: {
        title: 'roleList',
        icon: 'role',
      },
    },
    {
      path: '/permission/organization',
      component: () => import('@/views/permission/Organization'),
      meta: {
        title: 'permissionOrganization',
        icon: 'role',
      },
    },
  ],
};
