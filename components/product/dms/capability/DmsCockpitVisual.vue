<script setup lang="ts">
import { ChartPie, Check, Circle, ClipboardList, LayoutDashboard, LoaderCircle, ScrollText, TrendingUp } from '@lucide/vue'
import { computed } from 'vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['指标汇聚', '趋势分析', '风险分布', '决策支撑']
const metrics = [
  { label: '规则运行', icon: ScrollText, target: 96 },
  { label: '工单处置率', icon: ClipboardList, target: 88 },
  { label: '风险收敛率', icon: ChartPie, target: 92 },
]
// 指标条随时间依次填充
function metricProgress(index: number) {
  const start = 700 + index * 1100
  return Math.max(0, Math.min(1, (elapsed.value - start) / 1200))
}
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="监管驾驶舱动画">
    <div class="flex items-center border-b border-muted px-4 py-3">
      <div class="flex gap-1.5">
        <div class="size-3 rounded-full bg-red-500/70"></div>
        <div class="size-3 rounded-full bg-yellow-500/70"></div>
        <div class="size-3 rounded-full bg-green-500/70"></div>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4 lg:p-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-highlighted">可视化监管驾驶舱</p>
          <p class="mt-1 text-xs text-muted">规则 · 事件 · 工单一屏统览</p>
        </div>
        <span class="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
          <TrendingUp class="size-3.5" aria-hidden="true" />
          态势向好
        </span>
      </div>

      <div class="mt-4 flex flex-col gap-2.5">
        <div v-for="(metric, index) in metrics" :key="metric.label" class="rounded-lg border border-dt-line px-3 py-2">
          <div class="flex items-center justify-between text-[11px] font-medium">
            <span class="flex items-center gap-1.5 text-default"><component :is="metric.icon" class="size-3.5 text-primary/70" aria-hidden="true" />{{ metric.label }}</span>
            <span class="tabular-nums" :class="metricProgress(index) >= 1 ? 'text-emerald-600' : 'text-primary'">{{ Math.round(metricProgress(index) * metric.target) }}%</span>
          </div>
          <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-dt-line/50">
            <div class="h-full rounded-full transition-[width] duration-200" :class="[metricProgress(index) >= 1 ? 'bg-emerald-500' : 'bg-primary', getRuntimeBarWidthClass(metricProgress(index), metric.target)]"></div>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LayoutDashboard v-if="!finished" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '监管态势一屏呈现，辅助决策' : '多维监管指标汇聚分析中' }}</span>
      </div>

      <div class="mt-auto grid grid-cols-4 gap-1 pt-4">
        <div v-for="(step, index) in steps" :key="step" class="relative flex min-w-0 flex-col items-center gap-1.5 text-center">
          <div v-if="index < 3" class="absolute left-1/2 top-2.5 h-px w-full bg-dt-line" aria-hidden="true"></div>
          <span class="relative z-10 grid size-5 place-items-center rounded-full border bg-white transition-colors" :class="index < activeStep || finished ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-primary text-primary' : 'border-dt-line text-dt-text-muted'">
            <Check v-if="index < activeStep || finished" class="size-3" aria-hidden="true" />
            <LoaderCircle v-else-if="index === activeStep" class="size-3 animate-spin" aria-hidden="true" />
            <Circle v-else class="size-2" aria-hidden="true" />
          </span>
          <span class="truncate text-[10px] leading-4" :class="index < activeStep || finished ? 'text-emerald-700' : index === activeStep ? 'font-medium text-primary' : 'text-muted'">{{ step }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
