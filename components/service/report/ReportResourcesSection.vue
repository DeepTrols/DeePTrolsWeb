<script setup lang="ts">
import type { ReportResource } from '~/data/reports'
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'

defineProps<{
  items: ReportResource[]
}>()
</script>

<template>
  <div class="container pb-32">
    <section id="report-resources-panel" class="mb-24" aria-labelledby="report-resources-title">
      <h2 id="report-resources-title" class="sr-only">白皮书&报告列表</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in items"
          :key="item.title"
          :item="item"
          :eager="index === 0"
        />
      </div>
      <p v-if="items.length === 0" class="py-12 text-center text-base text-muted">
        暂无匹配资源
      </p>
      <div class="flex justify-center mt-10">
        <a
          href="/zh/resources/pages/2"
          data-slot="base"
          class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors justify-center cursor-pointer px-4 py-3 text-base gap-2 min-w-32 bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white"
        >
          加载更多
        </a>
      </div>
    </section>
  </div>
</template>
