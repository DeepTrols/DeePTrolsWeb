<script setup lang="ts">
import { useFetch } from '#imports'
import { computed } from 'vue'
import type { CaseResource } from '~/data/cases'
import { staticSolutionCaseFallback } from '~/data/solution-case-picks'
import type { SolutionCasePageKey } from '~/data/solution-case-picks'
import BaseButton from '~/components/common/BaseButton.vue'

// 方案页「客户案例」推荐位（015.17）：后台可配（solution_case_picks 表，每页 ≤3 条有序）。
// 双层回退——API 层 /api/solutions/[key]/cases DB 优先静态兜底（永不 503），
// 组件层 fetch 失败 / 空结果再回退静态分类快照（data/solution-case-picks.ts）。
// 015.19b：展示形式回归全宽交替大卡（标题+摘要+三指标带+案例图+详情按钮），指标读 cases.metrics。
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
    <div class="flex flex-col gap-11">
      <div v-for="(item, index) in items" :key="item.href" class="flex flex-col">
        <div
          class="flex flex-col rounded-lg border border-default lg:flex-row"
          :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
        >
          <div class="flex flex-col gap-6 p-8 lg:p-12 flex-1">
            <div class="flex items-center justify-center lg:hidden">
              <img
                class="h-20 w-20 rounded object-cover"
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                decoding="async"
              >
            </div>
            <h3 class="text-2xl lg:text-3xl font-bold text-highlighted">{{ item.title }}</h3>
            <p class="text-base text-default leading-relaxed">{{ item.summary }}</p>
            <div
              v-if="item.metrics && item.metrics.length > 0"
              class="grid grid-cols-1 border border-default rounded-lg overflow-hidden lg:grid-cols-3"
            >
              <div
                v-for="(stat, statIndex) in item.metrics"
                :key="stat.label"
                class="flex flex-col items-center justify-center px-2 py-4 lg:px-3 lg:py-5 text-center"
                :class="statIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-default' : ''"
              >
                <p class="text-lg lg:text-xl font-bold text-highlighted">
                  <span><span class="bg-[image:var(--dt-gradient-text)] bg-clip-text text-transparent">{{ stat.value }}</span>{{ stat.label }}</span>
                </p>
              </div>
            </div>
            <div>
              <BaseButton :href="item.href">查看案例详情</BaseButton>
            </div>
          </div>
          <div
            class="hidden lg:flex items-center justify-center border-default p-8 lg:p-12 lg:w-[320px]"
            :class="index % 2 === 1 ? 'border-r' : 'border-l'"
          >
            <img
              class="h-[100px] w-[100px] rounded object-cover"
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
