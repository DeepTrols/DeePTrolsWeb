import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-29',
  devtools: { enabled: true },
  // admin/ 是独立的 vben 后台工程（含自身 node_modules 与 .vue 源文件），
  // 主站所有扫描/监听（含 nitro dev watcher，走 nuxt.options.ignore）必须整体排除，否则 EMFILE
  ignore: ['admin/**'],
  css: ['~/assets/css/tailwind.css', '~/assets/scss/main.scss'],
  runtimeConfig: {
    // 私密配置（仅服务端可用）：PostgreSQL 连接串，未配置时 server 层回退 data/*.ts 静态数据
    databaseUrl: '',
    // 管理后台（Phase 3）：登录密码与 session 加密密码（≥32 位随机串）；未配置时 admin API 返回 503
    adminPassword: '',
    sessionPassword: '',
  },
  vite: {
    // pnpm 将 vitest 依赖的 vite@5 提升到隐藏层，@nuxt/schema 的 vite 类型会解析到 vite@5，
    // 与 Nuxt/tailwind 插件实际使用的 vite@8 Plugin 类型冲突，此处收敛类型以通过 typecheck。
    plugins: [tailwindcss() as never],
    server: {
      watch: {
        // admin/ 是独立的 vben 工程（含自身 node_modules），主站 watcher 必须排除，否则 EMFILE
        ignored: ['**/admin/**'],
      },
    },
  },
  watchers: {
    chokidar: {
      // Nuxt 层（pages/server 目录扫描）同样排除 admin/
      ignored: ['**/admin/**'],
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: 'DeepTrols - 企业级 AI 能力建设服务商',
      meta: [
        {
          name: 'description',
          content:
            'DeepTrols 专注企业级 AI 落地，覆盖数据工程、知识工程、Agent 应用工程与 AI 基础设施建设。',
        },
        {
          name: 'keywords',
          content: 'DeepTrols, 企业AI, 数据工程, 知识工程, Agent应用, AI基础设施',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'DeepTrols - 企业级 AI 能力建设服务商' },
        {
          property: 'og:description',
          content: '构建企业级 AI 能力体系，让智能成为业务增长的新引擎。',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    },
  },
})
