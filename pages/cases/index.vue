<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from '#imports'
import CaseFeaturedSection from '~/components/case/CaseFeaturedSection.vue'
import CaseHero from '~/components/case/CaseHero.vue'
import CaseResourcesSection from '~/components/case/CaseResourcesSection.vue'
import ProductMetricsSection from '~/components/common/ProductMetricsSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import ReportFilterBar from '~/components/service/report/ReportFilterBar.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import { caseMetrics, caseResources } from '~/data/cases'
import { reportFilterTabs } from '~/data/reports'
import type { ReportFilterKey } from '~/data/reports'

const route = useRoute()
const categoryQuery = route.query.category
const activeCaseFilter = ref<ReportFilterKey>(
  typeof categoryQuery === 'string' && reportFilterTabs.some((tab) => tab.key === categoryQuery)
    ? (categoryQuery as ReportFilterKey)
    : 'all',
)
const caseSearchQuery = ref('')
const filteredCaseResources = computed(() => {
  const keyword = caseSearchQuery.value.trim().toLocaleLowerCase()

  return caseResources.filter((item) => {
    const matchesFilter = activeCaseFilter.value === 'all' || item.solutionKey === activeCaseFilter.value
    const searchableText = `${item.title} ${item.summary}`.toLocaleLowerCase()
    const matchesSearch = !keyword || searchableText.includes(keyword)

    return matchesFilter && matchesSearch
  })
})

useSeoMeta({
  title: '行业案例 - DeepTrols',
  description:
    '从数据、知识与物联感知，到 AI 智能体与算力能源协同，DeepTrols 深入客户真实业务场景，将技术能力与行业需求结合，持续构建可运行、可验证、可演进的智能应用。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="cases-page">
      <CaseHero />
      <ProductMetricsSection :items="caseMetrics" spacing="compact" />
      <CaseFeaturedSection />
      <div class="container">
        <ReportFilterBar
          v-model:active-filter="activeCaseFilter"
          v-model:search-query="caseSearchQuery"
        />
      </div>
      <CaseResourcesSection :items="filteredCaseResources" />
    </main>
    <SiteFooter />
  </div>
</template>
