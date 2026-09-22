import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:users',
      order: -1,
      title: '线索管理',
    },
    name: 'Leads',
    path: '/leads',
    children: [
      {
        name: 'LeadsList',
        path: '/leads',
        component: () => import('#/views/leads/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:users',
          title: '线索管理',
        },
      },
    ],
  },
];

export default routes;
