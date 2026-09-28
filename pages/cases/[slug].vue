<script setup lang="ts">
import { computed } from 'vue'
import { createError, useFetch, useRoute } from '#imports'
import ArticleBreadcrumb from '~/components/common/article/ArticleBreadcrumb.vue'
import ArticleContent from '~/components/common/article/ArticleContent.vue'
import ArticleLinkRows from '~/components/common/article/ArticleLinkRows.vue'
import CtaSection from '~/components/common/CtaSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import { caseResources } from '~/data/cases'
import { getCaseDetailBySlug } from '~/data/case-details'
import { reportFilterTabs } from '~/data/reports'
import type { CasePayload } from '~/server/utils/cases-repo'
import type { ArticleBreadcrumbItem, ArticleLinkRowItem } from '~/types/article'

const route = useRoute()
const routeSlug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug[0] : slug
})

// Phase 1 复制：详情经 /api/cases/:slug 读取（DB 未配置时接口侧回退静态数据）；请求失败再回退 data/*
const { data: payload, error } = await useFetch<CasePayload>(() => `/api/cases/${routeSlug.value}`, {
  watch: [routeSlug],
})

// 失败双语义（审计#22）：API 明确 404 = 案例已下架/删除/不存在 → 页面必须 404，
// 绝不回退静态种子（否则后台下架不生效）；其他失败（网络错误/5xx）→ 保留静态兜底维持站点韧性。
// 无 DB 时 API 本身返回静态数据（200），不会进入任何兜底分支。
const apiNotFound = computed(() => error.value?.statusCode === 404)

const detail = computed(() => {
  if (apiNotFound.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Case not found',
      fatal: true,
    })
  }

  const found = payload.value?.detail ?? getCaseDetailBySlug(routeSlug.value ?? '')

  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Case detail not found',
      fatal: true,
    })
  }

  return found
})

const categoryLabel = computed(() => {
  const tab = reportFilterTabs.find((item) => item.key === detail.value.categoryKey)
  return tab?.label ?? '行业案例'
})

const breadcrumbItems = computed<ArticleBreadcrumbItem[]>(() => [
  { label: '行业案例', href: '/cases' },
  { label: categoryLabel.value, href: `/cases?category=${detail.value.categoryKey}` },
  { label: detail.value.title },
])

const relatedResources = computed(() => payload.value?.resources ?? caseResources)

const relatedCaseRows = computed<ArticleLinkRowItem[]>(() =>
  relatedResources.value
    .filter((item) => item.href !== `/cases/${detail.value.slug}`)
    .map((item) => ({ label: item.title, href: item.href })),
)

useSeoMeta({
  title: `${detail.value.title} - 行业案例 - DeepTrols`,
  description:
    relatedResources.value.find((item) => item.href === `/cases/${detail.value.slug}`)?.summary ?? '',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="case-detail-page">
      <ArticleBreadcrumb :items="breadcrumbItems" />
      <section class="w-full overflow-hidden bg-[#161f23]" :aria-label="`${detail.title} 封面`">
        <img
          :src="detail.heroImage"
          :alt="detail.title"
          class="block aspect-[1920/363] h-auto w-full object-cover"
        >
      </section>
      <div class="container flow-root pt-16 pb-16 lg:pt-28 lg:pb-24">
        <div class="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1025fr)_309fr] xl:gap-[66px]">
          <article class="min-w-0">
            <ArticleContent :blocks="detail.blocks" />
          </article>
          <aside class="min-w-0">
            <h2 class="text-base font-medium leading-4 text-[#1d2234]">相关产品</h2>
            <NuxtLink
              v-for="product in detail.relatedProducts"
              :key="product.name"
              :to="product.href"
              class="group mt-8 block"
            >
              <span class="block text-base leading-4 text-[#171717] transition-colors group-hover:text-primary">
                {{ product.name }}
              </span>
              <span class="mt-3 block max-w-[219px] text-sm leading-5 text-[#415169]">
                {{ product.desc }}
              </span>
            </NuxtLink>
          </aside>
        </div>
      </div>
      <ArticleLinkRows
        title="相关客户案例"
        title-id="case-detail-related-title"
        :items="relatedCaseRows"
      />
      <CtaSection />
    </main>
    <SiteFooter />
  </div>
</template>
