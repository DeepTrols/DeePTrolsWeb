<script setup lang="ts">
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import { reportResources } from '~/data/reports'
</script>

<template>
  <div class="container pb-32">
    <section class="mb-24" aria-labelledby="report-resources-title">
      <h2 id="report-resources-title" class="sr-only">白皮书&报告列表</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in reportResources"
          :key="item.title"
          :item="item"
          :eager="index === 0"
        />
      </div>
    </section>
  </div>
</template>
