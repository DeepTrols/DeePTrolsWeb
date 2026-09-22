<script setup lang="ts">
import { Check, Circle, FileClock, LoaderCircle, ScrollText, ShieldAlert, SlidersHorizontal } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['规则分类', '等级配置', '动作组合', '发布启用']
const rules = [
  { label: '数据主体准入校验', level: '高风险', icon: ShieldAlert, tone: 'text-red-600 bg-red-500/10' },
  { label: '交易频次限制', level: '中风险', icon: SlidersHorizontal, tone: 'text-amber-600 bg-amber-500/10' },
  { label: '交付完整性核验', level: '低风险', icon: FileClock, tone: 'text-sky-600 bg-sky-500/10' },
]
// 规则逐条完成分级配置并启用
const enabledCount = computed(() => {
  if (elapsed.value < 700) return 0
  return Math.min(3, Math.floor((elapsed.value - 700) / 1100) + 1)
})
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="统一监管规则动画">
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
          <p class="text-sm font-semibold text-highlighted">监管规则中心</p>
          <p class="mt-1 text-xs text-muted">主体 · 产品 · 交易 · 交付全覆盖</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">规则库 24 条</span>
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <div
          v-for="(rule, index) in rules"
          :key="rule.label"
          class="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors duration-300"
          :class="index < enabledCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
        >
          <component :is="rule.icon" class="size-4 shrink-0" :class="index < enabledCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ rule.label }}</span>
          <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" :class="rule.tone">{{ rule.level }}</span>
          <span class="flex shrink-0 items-center gap-1 text-[10px] font-medium" :class="index < enabledCount ? 'text-emerald-600' : 'text-muted'">
            <Check v-if="index < enabledCount" class="size-3" aria-hidden="true" />
            <Circle v-else class="size-2" aria-hidden="true" />
            {{ index < enabledCount ? '已启用' : '待配置' }}
          </span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <ScrollText v-if="!finished" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '规则库已发布，全场景统一生效' : '正在配置风险等级与执行动作组合' }}</span>
        <span class="text-xs font-semibold" :class="finished ? 'text-emerald-600' : 'text-primary'">{{ enabledCount }}/3</span>
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
