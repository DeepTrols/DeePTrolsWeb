<script setup lang="ts">
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import { caseFeatured } from '~/data/cases'
</script>

<template>
  <section class="flow-root pb-16 lg:pb-32" aria-labelledby="case-featured-title">
    <div class="container">
      <h2 id="case-featured-title" class="sr-only">推荐资源</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in caseFeatured"
          :key="`case-featured-${item.title}`"
          :item="item"
          :eager="index === 0"
          hide-meta
        />
      </div>
    </div>
  </section>
</template>
