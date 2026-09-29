<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFetch } from '#imports'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import ReportFeaturedSection from '~/components/service/report/ReportFeaturedSection.vue'
import ReportFilterBar from '~/components/service/report/ReportFilterBar.vue'
import ReportHero from '~/components/service/report/ReportHero.vue'
import ReportResourcesSection from '~/components/service/report/ReportResourcesSection.vue'
import { reportResources, type ReportFilterKey, type ReportResource } from '~/data/reports'

// Phase 1 复制：列表经 /api/reports 读取（DB 未配置时接口侧回退静态数据）；请求失败再回退 data/reports.ts
const { data: reportList } = await useFetch<ReportResource[]>('/api/reports', {
  default: () => reportResources,
})

const activeReportFilter = ref<ReportFilterKey>('all')
// 015.16：报告页双筛选——行业（solution scope）+ 类型（report-type scope，key=label）
const activeReportType = ref<string>('all')
const reportSearchQuery = ref('')
const filteredReportResources = computed(() => {
  const keyword = reportSearchQuery.value.trim().toLocaleLowerCase()

  return (reportList.value ?? reportResources).filter((item) => {
    const matchesFilter = activeReportFilter.value === 'all' || item.solutionKey === activeReportFilter.value
    const matchesType = activeReportType.value === 'all' || item.type === activeReportType.value
    const searchableText = `${item.type} ${item.category} ${item.title} ${item.summary}`.toLocaleLowerCase()
    const matchesSearch = !keyword || searchableText.includes(keyword)

    return matchesFilter && matchesType && matchesSearch
  })
})

useSeoMeta({
  title: '白皮书&报告 - DeepTrols',
  description: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。',
  ogTitle: '白皮书&报告 - DeepTrols',
  ogDescription: '全球最新的AI相关白皮书&报告，深入了解人工智能的世界。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="report-page">
      <ReportHero />
      <ReportFeaturedSection />
      <div class="container">
        <ReportFilterBar
          v-model:active-filter="activeReportFilter"
          v-model:active-type="activeReportType"
          v-model:search-query="reportSearchQuery"
          with-type-filter
        />
      </div>
      <ReportResourcesSection :items="filteredReportResources" />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.report-page {
  background: var(--dt-color-bg);
}
</style>
