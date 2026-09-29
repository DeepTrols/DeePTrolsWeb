import type { RouteRecordRaw } from 'vue-router';

const editMeta = (title: string, activeMenu: string) => ({
  activeMenu,
  hideInMenu: true,
  title,
});

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:file-text',
      order: 0,
      title: '内容管理',
    },
    name: 'Content',
    path: '/content',
    children: [
      {
        name: 'ContentNews',
        path: '/content/news',
        component: () => import('#/views/content/news/list.vue'),
        meta: { icon: 'lucide:newspaper', title: '新闻管理' },
      },
      {
        name: 'ContentNewsCreate',
        path: '/content/news/create',
        component: () => import('#/views/content/news/edit.vue'),
        meta: editMeta('新建新闻', '/content/news'),
      },
      {
        name: 'ContentNewsEdit',
        path: String.raw`/content/news/:id(\d+)`,
        component: () => import('#/views/content/news/edit.vue'),
        meta: editMeta('编辑新闻', '/content/news'),
      },
      {
        name: 'ContentCases',
        path: '/content/cases',
        component: () => import('#/views/content/cases/list.vue'),
        meta: { icon: 'lucide:briefcase', title: '案例管理' },
      },
      {
        name: 'ContentCaseCreate',
        path: '/content/cases/create',
        component: () => import('#/views/content/cases/edit.vue'),
        meta: editMeta('新建案例', '/content/cases'),
      },
      {
        name: 'ContentCaseEdit',
        path: '/content/cases/:slug([a-z0-9][a-z0-9-]*)',
        component: () => import('#/views/content/cases/edit.vue'),
        meta: editMeta('编辑案例', '/content/cases'),
      },
      {
        name: 'ContentReports',
        path: '/content/reports',
        component: () => import('#/views/content/reports/list.vue'),
        meta: { icon: 'lucide:book-open', title: '报告管理' },
      },
      {
        name: 'ContentCategories',
        path: '/content/categories',
        component: () => import('#/views/content/categories.vue'),
        meta: { icon: 'lucide:tags', title: '分类管理' },
      },
      {
        name: 'ContentReportCreate',
        path: '/content/reports/create',
        component: () => import('#/views/content/reports/edit.vue'),
        meta: editMeta('新建报告', '/content/reports'),
      },
      {
        name: 'ContentReportEdit',
        path: String.raw`/content/reports/:id(\d+)`,
        component: () => import('#/views/content/reports/edit.vue'),
        meta: editMeta('编辑报告', '/content/reports'),
      },
    ],
  },
];

export default routes;
