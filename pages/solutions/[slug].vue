<script setup lang="ts">
import { computed } from 'vue'
import { createError, useFetch, useRoute } from '#imports'
import CmsPageView from '~/components/common/CmsPageView.vue'
import SolutionPageTemplate from '~/components/solution/SolutionPageTemplate.vue'
import SolutionScenarioVisual from '~/components/solution/SolutionScenarioVisual.vue'
import { getSolutionUseCaseBySlug } from '~/data/solutions/use-cases'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

const route = useRoute()
const routeSlug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug[0] : slug
})

const currentPage = computed(() => getSolutionUseCaseBySlug(routeSlug.value ?? '') ?? null)

// 静态 miss → CMS 页回退（/solutions/<new-slug> 入库即可渲染）；再 miss 才 404。
// immediate: false 时 useFetch 不发请求，data 保持 null（静态命中路径零开销）。
const { data: cmsPage } = await useFetch<PublishedPagePayload>(
  `/api/pages/solutions/${routeSlug.value ?? ''}`,
  { key: `cms-page-solutions-${routeSlug.value ?? ''}`, immediate: !currentPage.value },
)

if (!currentPage.value && !cmsPage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Solution use case not found',
    fatal: true,
  })
}

if (!currentPage.value) {
  useSeoMeta({
    title: () => `${cmsPage.value?.title ?? '页面未找到'} - DeepTrols`,
    description: () => cmsPage.value?.seoDescription ?? '',
    robots: () => (cmsPage.value ? 'index, follow' : 'noindex, nofollow'),
  })
}

const content = computed(() => currentPage.value?.content)
</script>

<template>
  <SolutionPageTemplate v-if="currentPage && content" :content="content">
    <template #hero-visual>
      <SolutionScenarioVisual :visual="currentPage.visual" />
    </template>
  </SolutionPageTemplate>
  <CmsPageView v-else-if="cmsPage" :page="cmsPage" />
</template>
