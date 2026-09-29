<script setup lang="ts">
import { useFetch } from '#imports'
import { computed } from 'vue'
import type { CaseResource } from '~/data/cases'
import { staticSolutionCaseFallback } from '~/data/solution-case-picks'
import type { SolutionCasePageKey } from '~/data/solution-case-picks'

// 方案页「客户案例」推荐位（015.17）：后台可配（solution_case_picks 表，每页 ≤3 条有序）。
// 双层回退——API 层 /api/solutions/[key]/cases DB 优先静态兜底（永不 503），
// 组件层 fetch 失败 / 空结果再回退静态分类快照（data/solution-case-picks.ts）。
const props = defineProps<{
  pageKey: SolutionCasePageKey
  title?: string
}>()

interface SolutionCasesResponse {
  items: CaseResource[]
  source: 'db' | 'static'
}

const { data } = useFetch(`/api/solutions/${props.pageKey}/cases`, {
  key: `solution-cases-${props.pageKey}`,
  default: () => null as SolutionCasesResponse | null,
})

const items = computed<CaseResource[]>(() => {
  const dynamic = data.value?.items
  return dynamic && dynamic.length > 0 ? dynamic : staticSolutionCaseFallback(props.pageKey)
})
</script>

<template>
  <section class="container pb-32 lg:pb-44" :aria-label="title || '客户案例'">
    <h2 v-if="title" class="mb-11 text-3xl font-bold text-highlighted lg:text-4xl">
      {{ title }}
    </h2>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <NuxtLink v-for="item in items" :key="item.href" :to="item.href" class="group block">
        <article class="flex h-full flex-col">
          <div class="relative mb-4 aspect-[400/180] overflow-hidden rounded-lg">
            <img
              width="400"
              height="180"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              :src="item.image"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
          </div>
          <h3 class="text-xl font-semibold leading-snug text-highlighted transition-colors duration-200 group-hover:text-primary">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-base leading-relaxed text-muted">
            {{ item.summary }}
          </p>
          <span class="mt-4 inline-flex items-center text-base font-medium text-primary">查看案例详情</span>
        </article>
      </NuxtLink>
    </div>
  </section>
</template>
