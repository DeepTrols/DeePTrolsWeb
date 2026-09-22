<script setup lang="ts">
import { ArrowRight, Check, Circle, Cpu, Database, Gauge, LoaderCircle, Workflow } from '@lucide/vue'
import { computed } from 'vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['依赖解析', '智能编排', '调度执行', '资源优化']
const tasks = [
  { label: '数据抽取', icon: Database },
  { label: '数据清洗', icon: Workflow },
  { label: '聚合加工', icon: Cpu },
]
// 依赖链上任务依次 等待 → 运行 → 成功
function taskState(index: number) {
  const start = 700 + index * 1300
  if (elapsed.value >= start + 1100) return 'done'
  if (elapsed.value >= start) return 'running'
  return 'pending'
}
// 资源动态分配：CPU 利用率随任务推进提升
const cpuUsage = computed(() => Math.max(0, Math.min(1, (elapsed.value - 900) / 3800)))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="任务编排动画">
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
          <p class="text-sm font-semibold text-highlighted">智能任务编排</p>
          <p class="mt-1 text-xs text-muted">依赖管理 · 资源动态分配</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">DAG 3 节点</span>
      </div>

      <div class="mt-4 flex items-center gap-1">
        <template v-for="(task, index) in tasks" :key="task.label">
          <div
            class="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border px-2.5 py-2 transition-colors duration-300"
            :class="taskState(index) === 'done' ? 'border-emerald-300 bg-emerald-50/60' : taskState(index) === 'running' ? 'border-primary/40 bg-primary/5' : 'border-dt-line bg-white'"
          >
            <component :is="task.icon" class="size-3.5 shrink-0" :class="taskState(index) === 'done' ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
            <span class="min-w-0 flex-1 truncate text-[11px] font-semibold text-default">{{ task.label }}</span>
            <Check v-if="taskState(index) === 'done'" class="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
            <LoaderCircle v-else-if="taskState(index) === 'running'" class="size-3.5 shrink-0 animate-spin text-primary" aria-hidden="true" />
            <Circle v-else class="size-2.5 shrink-0 text-dt-text-muted/50" aria-hidden="true" />
          </div>
          <ArrowRight v-if="index < 2" class="size-3.5 shrink-0" :class="taskState(index + 1) !== 'pending' ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        </template>
      </div>

      <div class="mt-3 rounded-lg border border-dt-line px-3 py-2.5">
        <div class="flex items-center justify-between text-[10px] font-medium text-muted">
          <span class="flex items-center gap-1.5"><Gauge class="size-3.5 text-primary/70" aria-hidden="true" />计算资源分配</span>
          <span>{{ Math.round(cpuUsage * 100) }}%</span>
        </div>
        <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dt-line/50">
          <div class="h-full rounded-full bg-primary transition-[width] duration-200" :class="getRuntimeBarWidthClass(cpuUsage, 100)"></div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '任务链按依赖自动调度完成' : '元数据驱动依赖分析与编排优化' }}</span>
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
