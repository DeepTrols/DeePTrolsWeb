<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import ReportHero from '~/components/service/report/ReportHero.vue'
import ReportResourcesSection from '~/components/service/report/ReportResourcesSection.vue'

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
      <ReportResourcesSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.report-page {
  background: var(--dt-color-bg);
}
</style>
