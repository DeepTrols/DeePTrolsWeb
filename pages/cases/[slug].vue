<script setup lang="ts">
import { computed } from 'vue'
import { createError, useRoute } from '#imports'
import ArticleBreadcrumb from '~/components/common/article/ArticleBreadcrumb.vue'
import ArticleContent from '~/components/common/article/ArticleContent.vue'
import ArticleLinkRows from '~/components/common/article/ArticleLinkRows.vue'
import CtaSection from '~/components/common/CtaSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import { caseResources } from '~/data/cases'
import { getCaseDetailBySlug } from '~/data/case-details'
import { reportFilterTabs } from '~/data/reports'
import type { ArticleBreadcrumbItem, ArticleLinkRowItem } from '~/types/article'

const route = useRoute()
const routeSlug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug[0] : slug
})

const detail = computed(() => {
  const found = getCaseDetailBySlug(routeSlug.value ?? '')

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

const relatedCaseRows = computed<ArticleLinkRowItem[]>(() =>
  caseResources
    .filter((item) => item.href !== `/cases/${detail.value.slug}`)
    .map((item) => ({ label: item.title, href: item.href })),
)

useSeoMeta({
  title: `${detail.value.title} - 行业案例 - DeepTrols`,
  description:
    caseResources.find((item) => item.href === `/cases/${detail.value.slug}`)?.summary ?? '',
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
