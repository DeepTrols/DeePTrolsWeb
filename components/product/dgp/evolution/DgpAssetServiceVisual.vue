<script setup lang="ts">
import { Check, Circle, Database, FileChartColumn, KeyRound, LoaderCircle, Network, Send } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = [
  { label: '资产编目', icon: Database },
  { label: '血缘分析', icon: Network },
  { label: '权限审批', icon: KeyRound },
  { label: '服务发布', icon: Send },
]
const assets = ['客户主题表', '订单指标集', '设备健康度']
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-dt-line bg-white p-4 shadow-sm lg:min-h-[340px] lg:p-5" aria-label="数据资产沉淀与服务动画">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-highlighted">数据资产服务</p>
        <p class="mt-1 text-xs text-muted">治理数据与指标统一沉淀</p>
      </div>
      <span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="finished ? 'bg-emerald-100 text-emerald-700' : 'bg-dt-bg-soft text-muted'">{{ finished ? 'API 已发布' : '处理中' }}</span>
    </div>

    <div class="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div class="space-y-1.5 rounded-lg border border-dt-line bg-dt-bg-soft/30 p-2.5">
        <p class="text-[11px] font-semibold text-default">资产目录</p>
        <div v-for="asset in assets" :key="asset" class="flex items-center gap-1.5 text-[10px] text-muted">
          <FileChartColumn class="size-3 text-primary" aria-hidden="true" />
          <span class="truncate">{{ asset }}</span>
        </div>
      </div>
      <div class="flex items-center" aria-label="数据血缘关系">
        <span class="h-px w-3 bg-primary/40"></span>
        <Network class="size-5 text-primary" aria-hidden="true" />
        <span class="h-px w-3 bg-primary/40"></span>
      </div>
      <div class="rounded-lg border p-2.5 transition-colors" :class="finished ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line bg-white'">
        <p class="text-[11px] font-semibold text-default">数据服务 API</p>
        <p class="mt-2 truncate font-mono text-[10px] text-muted">/api/v1/assets</p>
        <div class="mt-2 flex items-center gap-1 text-[10px]" :class="finished ? 'text-emerald-700' : 'text-muted'">
          <Check v-if="finished" class="size-3" aria-hidden="true" />
          <Circle v-else class="size-2" aria-hidden="true" />
          {{ finished ? '发布成功' : '等待发布' }}
        </div>
      </div>
    </div>

    <div class="mt-auto grid grid-cols-4 gap-1 pt-4">
      <div v-for="(step, index) in steps" :key="step.label" class="relative flex min-w-0 flex-col items-center gap-1.5 text-center">
        <div v-if="index < 3" class="absolute left-1/2 top-3 h-px w-full bg-dt-line" aria-hidden="true"></div>
        <span class="relative z-10 grid size-6 place-items-center rounded-full border bg-white" :class="index < activeStep || finished ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-primary text-primary' : 'border-dt-line text-dt-text-muted'">
          <Check v-if="index < activeStep || finished" class="size-3.5" aria-hidden="true" />
          <LoaderCircle v-else-if="index === activeStep" class="size-3.5 animate-spin" aria-hidden="true" />
          <component :is="step.icon" v-else class="size-3" aria-hidden="true" />
        </span>
        <span class="truncate text-[10px] leading-4" :class="index < activeStep || finished ? 'text-emerald-700' : index === activeStep ? 'font-medium text-primary' : 'text-muted'">{{ step.label }}</span>
      </div>
    </div>
  </div>
</template>
