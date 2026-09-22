<script setup lang="ts">
import { Check, Circle, LoaderCircle, Timer, Zap } from '@lucide/vue'
import { computed } from 'vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['规则配置', '依赖调度', '离线计算', '实时更新']
const tasks = [
  { label: '用户活跃标签', mode: '实时', icon: Zap },
  { label: '价值分层标签', mode: '离线', icon: Timer },
  { label: '流失预警标签', mode: '离线', icon: Timer },
]
// 三个任务依次推进：各占 1400ms 窗口，进度在窗口内线性填满
function taskProgress(index: number) {
  const start = 600 + index * 1400
  return Math.max(0, Math.min(1, (elapsed.value - start) / 1200))
}
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="标签生产动画">
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
          <p class="text-sm font-semibold text-highlighted">标签生产任务</p>
          <p class="mt-1 text-xs text-muted">可视化配置 · 自动化计算</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">离线 + 实时</span>
      </div>

      <div class="mt-4 flex flex-col gap-2.5">
        <div
          v-for="(task, index) in tasks"
          :key="task.label"
          class="rounded-lg border px-3 py-2 transition-colors duration-300"
          :class="taskProgress(index) >= 1 ? 'border-emerald-300 bg-emerald-50/60' : taskProgress(index) > 0 ? 'border-primary/40 bg-primary/5' : 'border-dt-line bg-white'"
        >
          <div class="flex items-center gap-2">
            <component :is="task.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ task.label }}</span>
            <span class="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary/80">{{ task.mode }}</span>
            <Check v-if="taskProgress(index) >= 1" class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <LoaderCircle v-else-if="taskProgress(index) > 0" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
            <Circle v-else class="size-3 shrink-0 text-dt-text-muted/50" aria-hidden="true" />
          </div>
          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dt-line/50">
            <div
              class="h-full rounded-full transition-[width] duration-200"
              :class="[taskProgress(index) >= 1 ? 'bg-emerald-500' : 'bg-primary', getRuntimeBarWidthClass(taskProgress(index), 100)]"
            ></div>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签任务已调度完成，结果自动更新' : '标签任务按依赖自动调度中' }}</span>
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
