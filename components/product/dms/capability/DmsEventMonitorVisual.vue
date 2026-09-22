<script setup lang="ts">
import { Activity, Check, Circle, ListFilter, LoaderCircle, Radar, ShieldAlert, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['实时监测', '风险识别', '事件生成', '收敛去重']
const events = [
  { label: '异常交易行为', level: '高危', icon: TriangleAlert, tone: 'text-red-600 bg-red-500/10' },
  { label: '越权数据访问', level: '中危', icon: ShieldAlert, tone: 'text-amber-600 bg-amber-500/10' },
  { label: '交付延迟预警', level: '低危', icon: Activity, tone: 'text-sky-600 bg-sky-500/10' },
]
// 事件逐条生成；末段重复告警收敛
const eventCount = computed(() => {
  if (elapsed.value < 700) return 0
  return Math.min(3, Math.floor((elapsed.value - 700) / 1000) + 1)
})
const converged = computed(() => elapsed.value >= 4200)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="实时事件监控动画">
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
          <p class="text-sm font-semibold text-highlighted">实时风险监测</p>
          <p class="mt-1 text-xs text-muted">数据流通全过程风险感知</p>
        </div>
        <span class="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Radar class="size-3.5 animate-pulse" aria-hidden="true" />
          事件 {{ eventCount }} 条
        </span>
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <div
          v-for="(event, index) in events"
          :key="event.label"
          class="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all duration-300"
          :class="index < eventCount ? 'border-dt-line bg-white opacity-100' : 'border-dt-line/60 bg-white opacity-40'"
        >
          <component :is="event.icon" class="size-4 shrink-0" :class="index < eventCount ? 'text-primary' : 'text-dt-text-muted/50'" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ event.label }}</span>
          <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" :class="event.tone">{{ event.level }}</span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors duration-300" :class="converged ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-dt-bg-soft/40'">
        <ListFilter v-if="converged && !finished" class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <LoaderCircle v-else-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '重复事件自动收敛，预警已推送' : converged ? '相似告警收敛去重 ×3' : '正在监测数据流通行为' }}</span>
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
