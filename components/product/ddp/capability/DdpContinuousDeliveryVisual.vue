<script setup lang="ts">
import { Check, Circle, Code, GitPullRequest, LoaderCircle, MonitorCheck, PackageCheck, Rocket } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['代码提交', '自动测试', '发布上线', '运行监控']
const stages = [
  { label: '开发', icon: Code },
  { label: '测试', icon: PackageCheck },
  { label: '发布', icon: Rocket },
  { label: '监控', icon: MonitorCheck },
]
// 流水线阶段依次通过
const stageCount = computed(() => {
  if (elapsed.value < 600) return 0
  return Math.min(4, Math.floor((elapsed.value - 600) / 1000) + 1)
})
const released = computed(() => elapsed.value >= 4600)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="持续交付动画">
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
          <p class="text-sm font-semibold text-highlighted">持续交付流水线</p>
          <p class="mt-1 text-xs text-muted">开发 · 测试 · 发布 · 监控一体化</p>
        </div>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="released ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'">{{ released ? 'v2.3.0 已发布' : 'v2.3.0 构建中' }}</span>
      </div>

      <div class="relative mt-4 grid grid-cols-4 gap-2">
        <div class="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-dt-line" aria-hidden="true"></div>
        <div
          v-for="(stage, index) in stages"
          :key="stage.label"
          class="relative z-10 flex min-w-0 flex-col items-center gap-2 rounded-lg border bg-white px-1 py-2.5 transition-colors duration-300"
          :class="index < stageCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line'"
        >
          <component :is="stage.icon" class="size-4" :class="index < stageCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="truncate text-[11px] font-medium text-default">{{ stage.label }}</span>
          <span class="grid size-4 place-items-center rounded-full border transition-colors" :class="index < stageCount ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-dt-line text-dt-text-muted'">
            <Check v-if="index < stageCount" class="size-2.5" aria-hidden="true" />
            <Circle v-else class="size-1.5" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div class="mt-4 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <GitPullRequest class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">质量门禁 · 数据质量规则 12 项全部通过</span>
        <Check class="size-4 shrink-0" :class="stageCount >= 2 ? 'text-emerald-600' : 'text-dt-text-muted/40'" aria-hidden="true" />
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '数据资产长期稳定、高质量运行' : '全生命周期持续交付进行中' }}</span>
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
