<script setup lang="ts">
import { CircleCheck, LoaderCircle, Radio } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { stageCount, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const EVENT_APPEAR_INTERVAL_MS = 400
const EVENT_ACTIVATE_START_MS = 1800
const EVENT_ACTIVATE_INTERVAL_MS = 500
const AGENT_ON_MS = 4000
const PIPELINE_START_MS = 4700
const PIPELINE_INTERVAL_MS = 700

const events = [
  { title: '设备事件', detail: 'ESS-01 / 电芯温度异常', value: '61.8°C' },
  { title: '指标告警', detail: '最高电芯温度 > 55°C', value: '当前 61.8°C' },
  { title: '规则事件', detail: '持续高温规则', value: '已命中' },
  { title: '定时任务', detail: '储能柜巡检', value: '10:00' },
]

const pipelineSteps = ['事件校验', '事件去重', '上下文构建']

const { elapsed } = useRuntimeTimeline(7000)

const appearedCount = computed(() => stageCount(elapsed.value, 0, EVENT_APPEAR_INTERVAL_MS, events.length))
const activatedCount = computed(() =>
  stageCount(elapsed.value, EVENT_ACTIVATE_START_MS, EVENT_ACTIVATE_INTERVAL_MS, events.length),
)
const agentOn = computed(() => elapsed.value >= AGENT_ON_MS)
const pipelineDone = computed(() => stageCount(elapsed.value, PIPELINE_START_MS, PIPELINE_INTERVAL_MS, 3))
</script>

<template>
  <RuntimePanelShell :icon="Radio" title="事件触发器" badge="监听中">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(event, index) in events"
        :key="event.title"
        class="rounded-lg border p-2.5 transition-all duration-500"
        :class="[
          index < appearedCount ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
          index < activatedCount ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20',
        ]"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-semibold text-highlighted">{{ event.title }}</span>
          <span class="shrink-0 font-mono text-[11px] text-primary/80">{{ event.value }}</span>
        </div>
        <p class="mt-1 truncate text-[11px] text-muted">{{ event.detail }}</p>
      </div>
    </div>

    <div class="flex justify-center py-1">
      <div
        class="h-3 w-px bg-gradient-to-b from-primary/60 to-transparent transition-opacity duration-500"
        :class="agentOn ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
      ></div>
    </div>

    <div
      class="mx-auto flex w-fit flex-col items-center rounded-xl border px-5 py-1.5 text-center transition-all duration-500"
      :class="agentOn ? 'border-primary/30 bg-primary/10' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
    >
      <span
        class="font-mono text-xs font-semibold tracking-wide transition-colors duration-500"
        :class="agentOn ? 'text-primary' : 'text-muted'"
      >
        DEVICE AGENT
      </span>
      <span class="text-[11px] transition-colors duration-500" :class="agentOn ? 'text-highlighted' : 'text-muted'">
        {{ agentOn ? '事件已触发' : '等待事件' }}
      </span>
    </div>

    <div class="mt-1.5 grid gap-1">
      <div
        v-for="(step, index) in pipelineSteps"
        :key="step"
        class="flex items-center justify-between rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-2.5 py-1 transition-opacity duration-500"
        :class="index < pipelineDone ? 'opacity-100' : 'opacity-0'"
      >
        <span class="text-xs text-muted">{{ step }}</span>
        <LoaderCircle v-if="index === 2" class="size-3.5 animate-spin text-primary" aria-hidden="true" />
        <CircleCheck v-else class="size-3.5 text-primary" aria-hidden="true" />
      </div>
    </div>

    <p class="mt-auto pt-2 text-xs leading-relaxed text-muted">
      让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。
    </p>
  </RuntimePanelShell>
</template>
