<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from '#imports'
import NewsCategoryTabs from '~/components/news/NewsCategoryTabs.vue'
import NewsHero from '~/components/news/NewsHero.vue'
import NewsListSection from '~/components/news/NewsListSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import { getNewsByCategory, newsCategoryTabs } from '~/data/news'
import type { NewsCategory } from '~/data/news'

const route = useRoute()
const router = useRouter()

function toNewsCategory(value: unknown): NewsCategory {
  return typeof value === 'string' && newsCategoryTabs.some((tab) => tab.key === value)
    ? (value as NewsCategory)
    : 'company'
}

// ?category= query 校验先例沿用 pages/cases/index.vue；tab 切换时同步 query
const activeCategory = ref<NewsCategory>(toNewsCategory(route.query.category))
const categoryItems = computed(() => getNewsByCategory(activeCategory.value))

watch(
  () => route.query.category,
  (value) => {
    activeCategory.value = toNewsCategory(value)
  },
)

function handleCategoryChange(category: NewsCategory) {
  if (category === activeCategory.value) {
    return
  }

  activeCategory.value = category
  router.replace({ query: { ...route.query, category } })
}

useSeoMeta({
  title: '新闻动态 - DeepTrols',
  description:
    '深度智控新闻动态：公司动态、新闻报道与技术洞见，了解 Physical AI 能效智控的最新进展与行业实践。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="news-page">
      <NewsHero :category="activeCategory" />
      <NewsCategoryTabs :active-category="activeCategory" @change="handleCategoryChange" />
      <NewsListSection :items="categoryItems" />
    </main>
    <SiteFooter />
  </div>
</template>
