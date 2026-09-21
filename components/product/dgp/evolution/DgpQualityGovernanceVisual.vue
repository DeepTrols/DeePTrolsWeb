<script setup lang="ts">
import { Check, Circle, LoaderCircle, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['规则扫描', '异常识别', '标准映射', '质量校验']
const rules = [
  { table: '客户表', issue: '空值', count: 18 },
  { table: '订单表', issue: '重复值', count: 9 },
  { table: '设备表', issue: '格式错误', count: 6 },
]
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
const score = computed(() => Math.min(96, 72 + Math.round(Math.max(0, elapsed.value - 1800) / 145)))
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-dt-line bg-white p-4 shadow-sm lg:min-h-[340px] lg:p-5" aria-label="数据标准与质量治理动画">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-highlighted">质量治理中心</p>
        <p class="mt-1 text-xs text-muted">客户、订单、设备数据表</p>
      </div>
      <div class="text-right">
        <p class="text-[11px] text-muted">质量评分</p>
        <p class="text-xl font-bold tabular-nums text-primary"><span class="text-sm font-medium text-muted">72 → </span>{{ score }}</p>
      </div>
    </div>

    <div class="mt-4 grid gap-2">
      <div v-for="(rule, index) in rules" :key="rule.table" class="flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors" :class="elapsed < 3800 + index * 250 ? 'border-amber-200 bg-amber-50/70' : 'border-emerald-200 bg-emerald-50/60'">
        <span class="grid size-7 shrink-0 place-items-center rounded-md" :class="elapsed < 3800 + index * 250 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'">
          <TriangleAlert v-if="elapsed < 3800 + index * 250" class="size-4" aria-hidden="true" />
          <Check v-else class="size-4" aria-hidden="true" />
        </span>
        <span class="min-w-0 flex-1 truncate text-xs font-medium text-default">{{ rule.table }}</span>
        <span class="text-[11px] text-muted">{{ rule.issue }}</span>
        <span class="w-8 text-right text-xs font-semibold tabular-nums" :class="elapsed < 3800 + index * 250 ? 'text-amber-700' : 'text-emerald-700'">{{ elapsed < 3800 + index * 250 ? rule.count : 0 }}</span>
      </div>
    </div>

    <div class="mt-auto grid grid-cols-4 gap-1 pt-4">
      <div v-for="(step, index) in steps" :key="step" class="relative flex min-w-0 flex-col items-center gap-1.5 text-center">
        <div v-if="index < 3" class="absolute left-1/2 top-2.5 h-px w-full bg-dt-line" aria-hidden="true"></div>
        <span class="relative z-10 grid size-5 place-items-center rounded-full border bg-white" :class="index < activeStep || finished ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-primary text-primary' : 'border-dt-line text-dt-text-muted'">
          <Check v-if="index < activeStep || finished" class="size-3" aria-hidden="true" />
          <LoaderCircle v-else-if="index === activeStep" class="size-3 animate-spin" aria-hidden="true" />
          <Circle v-else class="size-2" aria-hidden="true" />
        </span>
        <span class="truncate text-[10px] leading-4" :class="index < activeStep || finished ? 'text-emerald-700' : index === activeStep ? 'font-medium text-primary' : 'text-muted'">{{ step }}</span>
      </div>
    </div>
  </div>
</template>
