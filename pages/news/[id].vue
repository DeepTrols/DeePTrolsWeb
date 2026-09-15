<script setup lang="ts">
import { computed } from 'vue'
import { createError, useRoute } from '#imports'
import ArticleBreadcrumb from '~/components/common/article/ArticleBreadcrumb.vue'
import ArticleContent from '~/components/common/article/ArticleContent.vue'
import CtaSection from '~/components/common/CtaSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import NewsRelatedAside from '~/components/news/NewsRelatedAside.vue'
import { formatNewsDateShort, getNewsCategoryLabel, newsItems } from '~/data/news'
import { getNewsDetailById } from '~/data/news-details'
import type { ArticleBreadcrumbItem } from '~/types/article'

const route = useRoute()
const routeId = computed(() => {
  const id = route.params.id
  return Number(Array.isArray(id) ? id[0] : id)
})

const newsItem = computed(() => {
  const found = newsItems.find((item) => item.id === routeId.value)

  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News not found',
      fatal: true,
    })
  }

  return found
})

const detail = computed(() => {
  const found = getNewsDetailById(routeId.value)

  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News detail not found',
      fatal: true,
    })
  }

  return found
})

const categoryLabel = computed(() => getNewsCategoryLabel(newsItem.value.category))

const breadcrumbItems = computed<ArticleBreadcrumbItem[]>(() => [
  { label: '新闻动态', href: '/news' },
  { label: categoryLabel.value, href: `/news?category=${newsItem.value.category}` },
  { label: '文章正文' },
])

useSeoMeta({
  title: `${newsItem.value.title} - 新闻动态 - DeepTrols`,
  description: newsItem.value.summary,
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main
      id="main-content"
      class="news-detail-page bg-white bg-[linear-gradient(180deg,#eff5fe,transparent)] bg-[length:100%_1134px] bg-no-repeat"
    >
      <ArticleBreadcrumb :items="breadcrumbItems" />
      <div class="container grid grid-cols-1 gap-18 pt-12 pb-24 xl:grid-cols-[minmax(0,1fr)_376px] xl:gap-[124px]">
        <article class="mx-auto w-full min-w-0 max-w-[900px] xl:mx-0 xl:max-w-none">
          <span
            class="inline-grid h-[30px] w-[104px] place-items-center rounded-[44px] bg-primary/8 text-sm font-medium text-primary"
          >
            {{ categoryLabel }}
          </span>
          <h1 class="mt-6 text-[30px] font-normal leading-[44px] text-[#1d2234] md:text-[48px] md:leading-[57px]">
            {{ newsItem.title }}
          </h1>
          <p class="mt-[37px] text-sm leading-5 text-[#7e7e7e]">
            发布时间: {{ formatNewsDateShort(newsItem.publishedAt) }}
          </p>
          <i class="mt-[34px] block h-px bg-[#d9dde4]" aria-hidden="true" />
          <div class="mt-10 md:mt-[66px]">
            <ArticleContent :blocks="detail.blocks" variant="news" />
          </div>
        </article>
        <NewsRelatedAside
          :category="newsItem.category"
          :current-id="newsItem.id"
          class="xl:pt-[261px]"
        />
      </div>
      <CtaSection />
    </main>
    <SiteFooter />
  </div>
</template>
