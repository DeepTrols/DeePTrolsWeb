<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PagerArrows from '~/components/common/PagerArrows.vue'
import ReportResourceCard from '~/components/service/report/ReportResourceCard.vue'
import type { CaseResource } from '~/data/cases'

// 案例列表分页：3 列卡片网格按 6 条/页（两整行）切页，翻页复用新闻页的 PagerArrows。
const props = defineProps<{
  items: CaseResource[]
}>()

const PAGE_SIZE = 6

const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / PAGE_SIZE)))
const pagedItems = computed(() =>
  props.items.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE),
)

watch(
  () => props.items,
  () => {
    currentPage.value = 1
  },
)

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}
</script>

<template>
  <section id="case-resources-panel" class="flow-root pb-32 lg:pb-44" aria-labelledby="case-resources-title">
    <div class="container">
      <h2 id="case-resources-title" class="sr-only">行业案例列表</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ReportResourceCard
          v-for="(item, index) in pagedItems"
          :key="item.title"
          :item="item"
          :eager="index === 0"
          hide-meta
        />
      </div>
      <p v-if="items.length === 0" class="py-12 text-center text-base text-muted">
        暂无匹配案例
      </p>
      <div v-if="items.length > PAGE_SIZE" class="mt-10 flex justify-center md:justify-end">
        <PagerArrows
          :prev-disabled="currentPage === 1"
          :next-disabled="currentPage === totalPages"
          @prev="previousPage"
          @next="nextPage"
        />
      </div>
    </div>
  </section>
</template>
