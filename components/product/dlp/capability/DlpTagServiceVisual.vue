<script setup lang="ts">
import { ArrowRight, Check, Circle, DatabaseBackup, LoaderCircle, Network, Send, Users } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['服务注册', '权限审批', 'API 发布', '调用监控']
const tags = ['高活跃', '高价值', '近期活跃']
const outputs = [
  { label: 'API 查询', icon: Send },
  { label: '批量输出', icon: DatabaseBackup },
  { label: '人群圈选', icon: Users },
]
// 标签 chips 先聚合到网关，网关激活后三类服务依次点亮
const tagCount = computed(() => {
  if (elapsed.value < 500) return 0
  return Math.min(3, Math.floor((elapsed.value - 500) / 500) + 1)
})
const gatewayActive = computed(() => elapsed.value >= 2000)
const outputCount = computed(() => {
  if (elapsed.value < 2400) return 0
  return Math.min(3, Math.floor((elapsed.value - 2400) / 700) + 1)
})
const qps = computed(() => (gatewayActive.value ? Math.min(860, 120 + Math.floor((elapsed.value - 2000) / 4)) : 0))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="标签服务动画">
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
          <p class="text-sm font-semibold text-highlighted">标签服务中心</p>
          <p class="mt-1 text-xs text-muted">接口 · 查询 · 人群圈选统一入口</p>
        </div>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="gatewayActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'">QPS {{ qps }}</span>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <span
            v-for="(tag, index) in tags"
            :key="tag"
            class="truncate rounded-md border px-2 py-1 text-center text-[10px] font-semibold transition-colors duration-300"
            :class="index < tagCount ? 'border-primary/40 bg-primary/5 text-primary' : 'border-dt-line text-muted'"
          >{{ tag }}</span>
        </div>
        <ArrowRight class="size-4 shrink-0" :class="gatewayActive ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        <div
          class="flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 transition-colors duration-300"
          :class="gatewayActive ? 'border-emerald-300 bg-emerald-50/60' : 'border-primary/30 bg-primary/5'"
        >
          <Network class="size-4" :class="gatewayActive ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="whitespace-nowrap text-[10px] font-semibold text-default">统一服务网关</span>
        </div>
        <ArrowRight class="size-4 shrink-0" :class="outputCount > 0 ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
        <div class="flex min-w-0 flex-1 flex-col gap-1.5">
          <div
            v-for="(output, index) in outputs"
            :key="output.label"
            class="flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors duration-300"
            :class="index < outputCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
          >
            <component :is="output.icon" class="size-3.5 shrink-0" :class="index < outputCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
            <span class="truncate text-[10px] font-semibold text-default">{{ output.label }}</span>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签服务已发布，业务系统统一调用' : '正在将标签封装为标准化服务' }}</span>
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
