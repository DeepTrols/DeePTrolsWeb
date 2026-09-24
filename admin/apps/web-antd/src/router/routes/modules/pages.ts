import type { RouteRecordRaw } from 'vue-router';

const editMeta = (title: string) => ({
  activeMenu: '/pages',
  hideInMenu: true,
  title,
});

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-template',
      title: '页面管理',
    },
    name: 'Pages',
    path: '/pages',
    children: [
      {
        name: 'PageList',
        path: '/pages',
        component: () => import('#/views/pages/list.vue'),
        meta: {
          icon: 'lucide:layout-template',
          title: '页面管理',
        },
      },
      {
        name: 'PageCreate',
        path: '/pages/create',
        component: () => import('#/views/pages/edit.vue'),
        meta: editMeta('新建页面'),
      },
      {
        name: 'PageEdit',
        path: '/pages/edit',
        component: () => import('#/views/pages/edit.vue'),
        meta: editMeta('编辑页面'),
      },
      {
        name: 'PagePresets',
        path: '/pages/presets',
        component: () => import('#/views/pages/presets.vue'),
        meta: {
          icon: 'lucide:blocks',
          title: '区块模板',
        },
      },
    ],
  },
];

export default routes;
