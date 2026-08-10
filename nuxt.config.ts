import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-29',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/scss/main.scss'],
  vite: {
    // pnpm 将 vitest 依赖的 vite@5 提升到隐藏层，@nuxt/schema 的 vite 类型会解析到 vite@5，
    // 与 Nuxt/tailwind 插件实际使用的 vite@8 Plugin 类型冲突，此处收敛类型以通过 typecheck。
    plugins: [tailwindcss() as never],
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
