<script setup lang="ts">
import { computed, ref } from 'vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import ReportFeaturedSection from '~/components/service/report/ReportFeaturedSection.vue'
import ReportFilterBar from '~/components/service/report/ReportFilterBar.vue'
import ReportHero from '~/components/service/report/ReportHero.vue'
import ReportResourcesSection from '~/components/service/report/ReportResourcesSection.vue'
import { reportResources, type ReportFilterKey } from '~/data/reports'

const activeReportFilter = ref<ReportFilterKey>('all')
const reportSearchQuery = ref('')
const filteredReportResources = computed(() => {
  const keyword = reportSearchQuery.value.trim().toLocaleLowerCase()

  return reportResources.filter((item) => {
    const matchesFilter = activeReportFilter.value === 'all' || item.type === activeReportFilter.value
    const searchableText = `${item.type} ${item.category} ${item.title} ${item.summary}`.toLocaleLowerCase()
    const matchesSearch = !keyword || searchableText.includes(keyword)

    return matchesFilter && matchesSearch
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
          v-model:search-query="reportSearchQuery"
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
