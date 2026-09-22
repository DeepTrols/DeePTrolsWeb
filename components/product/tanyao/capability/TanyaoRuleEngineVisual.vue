<script setup lang="ts">
import { ArrowRight, BellRing, Check, Circle, ClipboardList, LoaderCircle, Thermometer, Zap } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['事件监听', '条件判断', '动作执行', '联动编排']
const rules = [
  { trigger: '温度超限', triggerIcon: Thermometer, action: '告警联动推送', actionIcon: BellRing },
  { trigger: '设备离线', triggerIcon: Zap, action: '自动派发工单', actionIcon: ClipboardList },
]
// 两条规则依次触发执行
function ruleFired(index: number) {
  return elapsed.value >= 900 + index * 1500
}
function ruleDone(index: number) {
  return elapsed.value >= 1600 + index * 1500
}
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="规则引擎动画">
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
          <p class="text-sm font-semibold text-highlighted">规则引擎</p>
          <p class="mt-1 text-xs text-muted">事件驱动的跨系统自动化</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">2 条规则运行中</span>
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <div
          v-for="(rule, index) in rules"
          :key="rule.trigger"
          class="flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors duration-300"
          :class="ruleDone(index) ? 'border-emerald-300 bg-emerald-50/60' : ruleFired(index) ? 'border-primary/40 bg-primary/5' : 'border-dt-line bg-white'"
        >
          <component :is="rule.triggerIcon" class="size-4 shrink-0" :class="ruleDone(index) ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ rule.trigger }}</span>
          <ArrowRight class="size-3.5 shrink-0" :class="ruleFired(index) ? 'text-primary' : 'text-dt-text-muted/40'" aria-hidden="true" />
          <component :is="rule.actionIcon" class="size-4 shrink-0" :class="ruleDone(index) ? 'text-emerald-600' : ruleFired(index) ? 'text-primary' : 'text-dt-text-muted/40'" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate text-xs text-default">{{ rule.action }}</span>
          <Check v-if="ruleDone(index)" class="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
          <LoaderCircle v-else-if="ruleFired(index)" class="size-3.5 shrink-0 animate-spin text-primary" aria-hidden="true" />
          <Circle v-else class="size-2.5 shrink-0 text-dt-text-muted/50" aria-hidden="true" />
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '告警、联动与工单流程自动闭环' : '设备状态变化驱动规则自动执行' }}</span>
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
