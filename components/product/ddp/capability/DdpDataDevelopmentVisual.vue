<script setup lang="ts">
import { Braces, Check, Circle, LoaderCircle, Play, SquareTerminal } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['任务创建', '代码开发', '语法校验', '提交运行']
const sqlLines = [
  { keyword: 'SELECT', rest: ' customer_id, sum(amount)' },
  { keyword: 'FROM', rest: ' dwd_orders' },
  { keyword: 'GROUP BY', rest: ' customer_id' },
]
// SQL 逐行出现，随后校验通过、运行成功
const lineCount = computed(() => {
  if (elapsed.value < 700) return 0
  return Math.min(3, Math.floor((elapsed.value - 700) / 700) + 1)
})
const validated = computed(() => elapsed.value >= 3000)
const runDone = computed(() => elapsed.value >= 4300)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="数据开发动画">
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
          <p class="text-sm font-semibold text-highlighted">统一开发工作台</p>
          <p class="mt-1 text-xs text-muted">湖仓一体 · 批流一体</p>
        </div>
        <div class="flex items-center gap-1 rounded-full border border-dt-line p-0.5">
          <span class="rounded-full px-2 py-0.5 text-[10px] font-medium text-muted">低代码</span>
          <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">SQL</span>
        </div>
      </div>

      <div class="mt-4 rounded-lg border border-dt-line bg-dt-bg-soft/40 p-3">
        <div class="flex items-center gap-1.5 text-[10px] font-medium text-muted">
          <SquareTerminal class="size-3.5 text-primary/70" aria-hidden="true" />
          task_customer_value.sql
        </div>
        <div class="mt-2 flex flex-col gap-1.5">
          <div
            v-for="(line, index) in sqlLines"
            :key="line.keyword"
            class="flex items-center gap-2 whitespace-pre font-mono text-[11px] leading-5 transition-opacity duration-300"
            :class="index < lineCount ? 'opacity-100' : 'opacity-25'"
          >
            <span class="w-4 shrink-0 text-right text-dt-text-muted/50">{{ index + 1 }}</span>
            <span><span class="font-semibold text-primary">{{ line.keyword }}</span><span class="text-default">{{ line.rest }}</span></span>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <Braces v-if="!validated" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Play v-else-if="!runDone" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ runDone ? '运行成功 · 影响 3 张下游表' : validated ? '语法校验通过 · 提交运行中' : '双模式开发 · 原地加工' }}</span>
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
