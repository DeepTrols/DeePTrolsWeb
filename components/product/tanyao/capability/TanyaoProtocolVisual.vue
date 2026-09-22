<script setup lang="ts">
import { Cable, Check, Circle, LoaderCircle, Workflow } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['协议识别', '解析适配', '统一建模', '生态扩展']
const protocols = ['Modbus', 'OPC UA', 'MQTT', 'BACnet', 'S7', 'CoAP']
// 协议 chips 逐个点亮汇入连接器框架
const activeCount = computed(() => {
  if (elapsed.value < 500) return 0
  return Math.min(6, Math.floor((elapsed.value - 500) / 450) + 1)
})
const frameworkReady = computed(() => elapsed.value >= 3600)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="多协议接入动画">
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
          <p class="text-sm font-semibold text-highlighted">多协议原生支持</p>
          <p class="mt-1 text-xs text-muted">主流协议栈 + 开放连接器框架</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">9+ 协议栈</span>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2">
        <span
          v-for="(protocol, index) in protocols"
          :key="protocol"
          class="truncate rounded-md border px-2 py-1.5 text-center text-[11px] font-semibold transition-colors duration-300"
          :class="index < activeCount ? 'border-primary/40 bg-primary/5 text-primary' : 'border-dt-line text-muted'"
        >{{ protocol }}</span>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors duration-300" :class="frameworkReady ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-dt-bg-soft/40'">
        <Workflow class="size-4 shrink-0" :class="frameworkReady ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-default">开放连接器框架</p>
          <p class="truncate text-[10px] text-muted">{{ frameworkReady ? '私有协议与新设备快速适配' : '汇聚协议解析结果，统一物模型' }}</p>
        </div>
        <Check v-if="frameworkReady" class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <LoaderCircle v-else class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <Cable v-if="!finished" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '协议生态就绪，新设备即插即用' : '正在加载行业协议栈' }}</span>
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
