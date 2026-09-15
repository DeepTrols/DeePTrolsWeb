<script setup lang="ts">
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import { featuredReportResources } from '~/data/reports'
</script>

<template>
  <section class="flow-root pb-16 lg:pb-32" aria-labelledby="report-featured-title">
    <div class="container">
      <h2 id="report-featured-title" class="sr-only">推荐资源</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in featuredReportResources"
          :key="`featured-${item.title}`"
          :item="item"
          :eager="index === 0"
        />
      </div>
    </div>
  </section>
</template>
