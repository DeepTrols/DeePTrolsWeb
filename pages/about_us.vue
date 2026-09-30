<script setup lang="ts">
import { computed } from 'vue'
import { useFetch, useRoute } from '#imports'
import AboutAddressSection from '~/components/about/AboutAddressSection.vue'
import AboutContactSection from '~/components/about/AboutContactSection.vue'
import AboutHero from '~/components/about/AboutHero.vue'
import AboutIntroSection from '~/components/about/AboutIntroSection.vue'
import AboutValuesSection from '~/components/about/AboutValuesSection.vue'
import CmsPageView from '~/components/common/CmsPageView.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import WhyEngine from '~/components/why/WhyEngine.vue'
import WhyServiceReset from '~/components/why/WhyServiceReset.vue'
import { useCmsLivePreview } from '~/composables/use-cms-live-preview'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

// CMS 接管（015.20b）：已发布 /about_us 页命中即渲染后台编排结果；404/草稿/无 DB/失败 → 回落代码 7 段（线上零风险）
// ?preview=1 透传草稿预览：key 拼 :preview 后缀防 published/draft 缓存互污
const isPreview = computed(() => useRoute().query.preview === '1')
const { data: cmsPage } = await useFetch<PublishedPagePayload>('/api/pages/about_us', {
  key: `cms-page/about_us${isPreview.value ? ':preview' : ''}`,
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
  title: () => (renderedPage.value ? `${renderedPage.value.title} - DeepTrols` : '关于深度数智（DEEPTROLS） - DeepTrols'),
  description: () => renderedPage.value?.seoDescription || '武汉深度数智科技有限公司专注企业级AI落地与能力构建，帮助企业将人工智能转化为业务生产力。',
  ogTitle: () => (renderedPage.value ? `${renderedPage.value.title} - DeepTrols` : '关于深度数智（DEEPTROLS） - DeepTrols'),
  ogDescription: () => renderedPage.value?.seoDescription || '构建企业级AI能力体系，让智能成为业务增长的新引擎。',
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
    <main id="main-content" class="about-page">
      <AboutHero />
      <AboutIntroSection />
      <WhyServiceReset />
      <WhyEngine />
      <AboutValuesSection />
      <AboutAddressSection />
      <AboutContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.about-page {
  background: var(--dt-color-bg);
}
</style>
