<script setup lang="ts">
import { Check, Circle, CloudCog, HeartPulse, LoaderCircle, Server, ShieldCheck } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6200)
const nodes = ['知识节点 A', '知识节点 B', '知识节点 C']
const steps = ['健康检测', '流量调度', '故障切换', '服务恢复']
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1300))))
const warning = computed(() => elapsed.value >= 2200 && elapsed.value < 3600)
const finished = computed(() => elapsed.value >= 5500)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-dt-line bg-white shadow-sm lg:min-h-[360px]" aria-label="知识服务高可用动画">
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
          <p class="text-sm font-semibold text-highlighted">知识服务运行中心</p>
          <p class="mt-1 text-xs text-muted">高并发请求自动调度与故障切换</p>
        </div>
        <span class="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">99.999%</span>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2">
        <div v-for="(node, index) in nodes" :key="node" class="flex min-w-0 flex-col items-center gap-2 rounded-lg border px-2 py-3 transition-colors" :class="warning && index === 1 ? 'border-amber-300 bg-amber-50/70' : elapsed >= 600 + index * 250 ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line'">
          <Server class="size-5" :class="warning && index === 1 ? 'text-amber-600' : 'text-emerald-600'" aria-hidden="true" />
          <span class="truncate text-[10px] font-semibold text-default">{{ node }}</span>
          <span class="text-[10px]" :class="warning && index === 1 ? 'text-amber-700' : 'text-emerald-700'">{{ warning && index === 1 ? '切换中' : '健康' }}</span>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-3 gap-2">
        <div class="rounded-lg border border-dt-line p-2.5 text-center">
          <HeartPulse class="mx-auto size-4 text-primary" aria-hidden="true" />
          <p class="mt-1 text-[10px] text-muted">实时请求</p>
          <p class="text-xs font-semibold text-default">12,860 QPS</p>
        </div>
        <div class="rounded-lg border border-dt-line p-2.5 text-center">
          <CloudCog class="mx-auto size-4 text-primary" aria-hidden="true" />
          <p class="mt-1 text-[10px] text-muted">故障切换</p>
          <p class="text-xs font-semibold" :class="warning ? 'text-amber-700' : 'text-default'">{{ warning ? '执行中' : '< 300ms' }}</p>
        </div>
        <div class="rounded-lg border border-dt-line p-2.5 text-center">
          <ShieldCheck class="mx-auto size-4 text-emerald-600" aria-hidden="true" />
          <p class="mt-1 text-[10px] text-muted">服务状态</p>
          <p class="text-xs font-semibold text-emerald-700">持续可用</p>
        </div>
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
