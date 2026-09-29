<script setup lang="ts">
import { useFetch } from '#imports'
import { computed } from 'vue'
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import { caseFeatured, type CaseResource } from '~/data/cases'

// 精选区接后台推荐（015.15）：DB 数据取 featured === true 前 3 条；
// fetch 失败 / DB 无任何 featured 案例时回退静态 caseFeatured（文本原位保留，harness 锁定）。
const { data: caseResources } = useFetch('/api/cases', {
  key: 'case-featured',
  default: () => null as CaseResource[] | null,
})

const featuredItems = computed<CaseResource[]>(() => {
  const dynamic = caseResources.value?.filter(item => item.featured === true).slice(0, 3)
  return dynamic && dynamic.length > 0 ? dynamic : caseFeatured
})
</script>

<template>
  <section class="flow-root pb-16 lg:pb-32" aria-labelledby="case-featured-title">
    <div class="container">
      <h2 id="case-featured-title" class="sr-only">推荐资源</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in featuredItems"
          :key="`case-featured-${item.title}`"
          :item="item"
          :eager="index === 0"
          hide-meta
        />
      </div>
    </div>
  </section>
</template>
