import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:menu',
      title: '菜单管理',
    },
    name: 'Menus',
    path: '/menus',
    children: [
      {
        name: 'MenuEditor',
        path: '/menus',
        component: () => import('#/views/menus/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: '菜单管理',
        },
      },
    ],
  },
];

export default routes;
