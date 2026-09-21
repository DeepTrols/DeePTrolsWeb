<script setup lang="ts">
import { Check, Circle, FileStack, Gauge, LoaderCircle, Timer } from '@lucide/vue'
import { computed } from 'vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6200)
const batches = [
  { label: '合同文档', pages: '1,280 页', start: 500 },
  { label: '产品手册', pages: '3,640 页', start: 1500 },
  { label: '制度文件', pages: '2,120 页', start: 2500 },
]
const steps = ['任务拆分', '并行解析', '结果合并', '批量入库']
const progress = (start: number) => Math.max(0, Math.min(1, (elapsed.value - start) / 1800))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1300))))
const finished = computed(() => elapsed.value >= 5500)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-dt-line bg-white shadow-sm lg:min-h-[360px]" aria-label="大批量文档高效解析动画">
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
          <p class="text-sm font-semibold text-highlighted">批量解析任务</p>
          <p class="mt-1 text-xs text-muted">长文档并行处理与自动入库</p>
        </div>
        <div class="flex items-center gap-1.5 text-primary">
          <Timer class="size-4" aria-hidden="true" />
          <span class="text-xs font-semibold">100 页 / 1.5 秒</span>
        </div>
      </div>

      <div class="mt-4 space-y-2.5">
        <div v-for="batch in batches" :key="batch.label" class="rounded-lg border px-3 py-2" :class="progress(batch.start) >= 1 ? 'border-emerald-200 bg-emerald-50/60' : progress(batch.start) > 0 ? 'border-primary/30 bg-primary/5' : 'border-dt-line'">
          <div class="flex items-center gap-2">
            <FileStack class="size-4 text-primary" aria-hidden="true" />
            <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ batch.label }}</span>
            <span class="text-[10px] text-muted">{{ batch.pages }}</span>
            <Check v-if="progress(batch.start) >= 1" class="size-3.5 text-emerald-600" aria-hidden="true" />
            <LoaderCircle v-else-if="progress(batch.start) > 0" class="size-3.5 animate-spin text-primary" aria-hidden="true" />
            <Circle v-else class="size-2.5 text-dt-text-muted" aria-hidden="true" />
          </div>
          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dt-line/50">
            <div class="h-full rounded-full" :class="[progress(batch.start) >= 1 ? 'bg-emerald-500' : 'bg-primary', getRuntimeBarWidthClass(progress(batch.start), 100)]"></div>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line px-3 py-2">
        <Gauge class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '批量任务完成，解析结果已入库' : '解析集群按负载自动扩展' }}</span>
        <span class="text-xs font-semibold" :class="finished ? 'text-emerald-600' : 'text-primary'">{{ finished ? '100%' : '运行中' }}</span>
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
  </div>
</template>
