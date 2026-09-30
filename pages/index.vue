<script setup lang="ts">
import { computed } from 'vue'
import { useFetch, useRoute } from '#imports'
import CmsPageView from '~/components/common/CmsPageView.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import WhyTrustTabs from '~/components/why/WhyTrustTabs.vue'
import { useCmsLivePreview } from '~/composables/use-cms-live-preview'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

// CMS 接管（015.18c）：已发布 '/' 页命中即渲染后台编排结果；404/草稿/无 DB/失败 → data 为 null → 回落代码 8 段（线上零风险）
// 注意取 /api/pages（无尾斜杠）：[...path] catch-all 不匹配尾斜杠，/api/pages 由 pages/index.get.ts 确定性命中
// ?preview=1 透传草稿预览：key 拼 :preview 后缀防 published/draft 缓存互污
const route = useRoute()
const isPreview = computed(() => route.query.preview === '1')
const { data: cmsPage } = await useFetch<PublishedPagePayload>('/api/pages', {
  key: `cms-page/${isPreview.value ? ':preview' : ''}`,
  query: isPreview.value ? { preview: '1' } : undefined,
})

// 015.19e 实时预览：未保存 sections 经 postMessage 桥覆盖渲染（见 composable）
const { liveSections, liveMeta } = useCmsLivePreview(cmsPage)
const renderedPage = computed(() => {
  const page = cmsPage.value
  if (!page) {
    return null
  }
  if (!liveSections.value) {
    return page
  }
  return {
    ...page,
    sections: liveSections.value,
    seoDescription: liveMeta.value?.seoDescription ?? page.seoDescription,
    title: liveMeta.value?.title ?? page.title,
  }
})

useSeoMeta({
  title: () => (renderedPage.value ? `${renderedPage.value.title} - DeepTrols` : 'DeepTrols - 构建企业级 AI 能力体系'),
  description: () => renderedPage.value?.seoDescription || '面向企业客户的数据、知识、智能体与 AI 基础设施建设服务。',
  ogTitle: () => (renderedPage.value ? `${renderedPage.value.title} - DeepTrols` : 'DeepTrols - 构建企业级 AI 能力体系'),
  ogDescription: () => renderedPage.value?.seoDescription || '让数据成为资产，让知识驱动决策，让 AI 创造价值。',
})
</script>

<template>
  <CmsPageView
    v-if="renderedPage"
    :page="renderedPage"
    :preview-banner="liveSections ? '实时预览 · 未保存内容' : undefined"
  />
  <div v-else class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <HomeHero />
      <HomeProductSystem />
      <HomeSolutions />
      <HomeEcosystem />
      <WhyTrustTabs />
      <HomeAbout />
      <HomeInsights />
      <HomeCta />
    </main>
    <SiteFooter />
  </div>
</template>
