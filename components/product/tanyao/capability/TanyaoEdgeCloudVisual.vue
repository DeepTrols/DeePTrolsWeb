<script setup lang="ts">
import { ArrowRight, BrainCircuit, Check, Circle, CloudCog, Cpu, LoaderCircle, ServerCog, Timer } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['边缘采集', '就地计算', 'AI 推理', '云端协同']
// 设备 → 探曜Edge → 云端 逐段激活，端到端时延随边缘接管下降
const edgeActive = computed(() => elapsed.value >= 1600)
const cloudActive = computed(() => elapsed.value >= 3200)
const latency = computed(() => Math.max(18, 220 - Math.floor(Math.max(0, elapsed.value - 1600) / 18)))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="云边协同动画">
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
          <p class="text-sm font-semibold text-highlighted">云边协同计算</p>
          <p class="mt-1 text-xs text-muted">就地实时计算与智能响应</p>
        </div>
        <span class="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium" :class="edgeActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'">
          <Timer class="size-3.5" aria-hidden="true" />
          {{ latency }}ms
        </span>
      </div>

      <div class="mt-4 flex items-center gap-1.5">
        <div class="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg border border-dt-line bg-white px-2 py-3">
          <Cpu class="size-4 text-primary" aria-hidden="true" />
          <span class="truncate text-[11px] font-semibold text-default">设备现场</span>
          <span class="truncate text-[10px] text-muted">数据源头</span>
        </div>
        <ArrowRight class="size-3.5 shrink-0" :class="edgeActive ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        <div
          class="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-colors duration-300"
          :class="edgeActive ? 'border-primary/40 bg-primary/5' : 'border-dt-line bg-white'"
        >
          <ServerCog class="size-4" :class="edgeActive ? 'text-primary' : 'text-dt-text-muted/60'" aria-hidden="true" />
          <span class="truncate text-[11px] font-semibold text-default">探曜 Edge</span>
          <span class="truncate text-[10px] text-muted">采集 · 计算 · 推理</span>
        </div>
        <ArrowRight class="size-3.5 shrink-0" :class="cloudActive ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        <div
          class="flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-colors duration-300"
          :class="cloudActive ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
        >
          <CloudCog class="size-4" :class="cloudActive ? 'text-emerald-600' : 'text-dt-text-muted/60'" aria-hidden="true" />
          <span class="truncate text-[11px] font-semibold text-default">云端平台</span>
          <span class="truncate text-[10px] text-muted">模型 · 调度</span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <BrainCircuit v-if="!finished" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '云边端协同就绪，毫秒级智能响应' : '边缘侧完成采集、协议转换与 AI 推理' }}</span>
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
