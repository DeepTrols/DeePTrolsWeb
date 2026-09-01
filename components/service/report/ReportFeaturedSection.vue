<script setup lang="ts">
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import { featuredReportResources } from '~/data/reports'
</script>

<template>
  <section class="container pb-16 md:pb-20" aria-labelledby="report-featured-title">
    <h2 id="report-featured-title" class="sr-only">推荐资源</h2>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <ReportResourceCard
        v-for="(item, index) in featuredReportResources"
        :key="`featured-${item.title}`"
        :item="item"
        :eager="index === 0"
      />
    </div>
  </section>
</template>
