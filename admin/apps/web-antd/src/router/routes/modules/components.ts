import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:blocks',
      title: '组件管理',
    },
    name: 'Components',
    path: '/components',
    children: [
      {
        name: 'ComponentManager',
        path: '/components',
        component: () => import('#/views/components/index.vue'),
        meta: {
          icon: 'lucide:blocks',
          title: '组件管理',
        },
      },
    ],
  },
];

export default routes;
