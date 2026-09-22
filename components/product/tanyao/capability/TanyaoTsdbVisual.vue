<script setup lang="ts">
import { ChartLine, Check, Circle, Database, LoaderCircle, ScanLine } from '@lucide/vue'
import { computed } from 'vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['实时采集', '持久存储', '多维分析', '模型训练']
// 写入吞吐随采集推进增长（万点/秒），存储占用条同步填充
const throughput = computed(() => Math.min(126, Math.floor(Math.max(0, elapsed.value - 500) / 36)))
const storageProgress = computed(() => Math.max(0, Math.min(1, (elapsed.value - 900) / 3800)))
const analysisReady = computed(() => elapsed.value >= 4300)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="时序数据引擎动画">
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
          <p class="text-sm font-semibold text-highlighted">时序数据引擎</p>
          <p class="mt-1 text-xs text-muted">海量设备数据采集 · 存储 · 分析</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary tabular-nums">{{ throughput }} 万点/秒</span>
      </div>

      <div class="mt-4 rounded-lg border border-dt-line px-3 py-2.5">
        <div class="flex items-center justify-between text-[11px] font-medium">
          <span class="flex items-center gap-1.5 text-default"><Database class="size-3.5 text-primary/70" aria-hidden="true" />时序库存储写入</span>
          <span class="tabular-nums" :class="storageProgress >= 1 ? 'text-emerald-600' : 'text-primary'">{{ Math.round(storageProgress * 100) }}%</span>
        </div>
        <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dt-line/50">
          <div class="h-full rounded-full transition-[width] duration-200" :class="[storageProgress >= 1 ? 'bg-emerald-500' : 'bg-primary', getRuntimeBarWidthClass(storageProgress, 100)]"></div>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-2">
        <div class="rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
          <p class="flex items-center gap-1.5 text-[10px] font-medium text-muted"><ChartLine class="size-3.5 text-primary/70" aria-hidden="true" />趋势分析</p>
          <p class="mt-1 truncate text-xs font-semibold" :class="analysisReady ? 'text-emerald-600' : 'text-default'">{{ analysisReady ? '温振趋势已生成' : '聚合计算中' }}</p>
        </div>
        <div class="rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
          <p class="flex items-center gap-1.5 text-[10px] font-medium text-muted"><ScanLine class="size-3.5 text-primary/70" aria-hidden="true" />AI 训练数据</p>
          <p class="mt-1 truncate text-xs font-semibold" :class="finished ? 'text-emerald-600' : 'text-default'">{{ finished ? '数据集就绪' : '样本对齐中' }}</p>
        </div>
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
