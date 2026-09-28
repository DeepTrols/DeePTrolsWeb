import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:images',
      title: '素材管理',
    },
    name: 'Showcase',
    path: '/showcase',
    children: [
      {
        name: 'ShowcaseGallery',
        path: '/showcase/gallery',
        component: () => import('#/views/showcase/gallery.vue'),
        meta: {
          icon: 'lucide:gallery-horizontal',
          title: '公司介绍图集',
        },
      },
      {
        name: 'ShowcaseLogos',
        path: '/showcase/logos',
        component: () => import('#/views/showcase/logos.vue'),
        meta: {
          icon: 'lucide:landmark',
          title: '首页 Logo 墙',
        },
      },
    ],
  },
];

export default routes;
