import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:image',
      title: '媒体库',
    },
    name: 'Media',
    path: '/media',
    children: [
      {
        name: 'MediaLibrary',
        path: '/media',
        component: () => import('#/views/media/index.vue'),
        meta: {
          icon: 'lucide:image',
          title: '媒体库',
        },
      },
    ],
  },
];

export default routes;
