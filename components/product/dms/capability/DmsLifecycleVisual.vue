<script setup lang="ts">
import { ArrowRight, Check, Circle, ClipboardList, FileClock, LoaderCircle, Radar, ShieldAlert } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['事前预防', '事中监测', '事后处置', '全程追溯']
const stages = [
  { label: '事前预防', desc: '规则与风险分级', icon: ShieldAlert },
  { label: '事中监测', desc: '实时事件预警', icon: Radar },
  { label: '事后处置', desc: '工单闭环留痕', icon: ClipboardList },
]
// 三阶段依次点亮，末段完成全程追溯归档
const stageCountValue = computed(() => {
  if (elapsed.value < 700) return 0
  return Math.min(3, Math.floor((elapsed.value - 700) / 1200) + 1)
})
const traced = computed(() => elapsed.value >= 4600)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="全流程监管体系动画">
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
          <p class="text-sm font-semibold text-highlighted">全流程监管体系</p>
          <p class="mt-1 text-xs text-muted">事前 · 事中 · 事后闭环监管</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">全程可追溯</span>
      </div>

      <div class="mt-4 flex items-center gap-1">
        <template v-for="(stage, index) in stages" :key="stage.label">
          <div
            class="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-colors duration-300"
            :class="index < stageCountValue ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
          >
            <component :is="stage.icon" class="size-4" :class="index < stageCountValue ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
            <span class="truncate text-[11px] font-semibold text-default">{{ stage.label }}</span>
            <span class="truncate text-[10px] text-muted">{{ stage.desc }}</span>
          </div>
          <ArrowRight v-if="index < 2" class="size-3.5 shrink-0" :class="index + 1 < stageCountValue ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        </template>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors duration-300" :class="traced ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-dt-bg-soft/40'">
        <FileClock v-if="!finished" class="size-4 shrink-0" :class="traced ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '全过程可监管、可追溯、可量化' : traced ? '审计留痕归档，监管闭环形成' : '规则配置 → 风险监测 → 闭环处置' }}</span>
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
