<script setup lang="ts">
import { CircleCheck, CircleDashed, Combine, Layers, LoaderCircle, Radio, ShieldCheck } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { stageCount, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const BAR_START_MS = 600
const BAR_INTERVAL_MS = 600
const TRIGGERED_MS = 2900
const PIPELINE_START_MS = 3500
const PIPELINE_INTERVAL_MS = 700

const events = [
  { title: '设备事件', detail: 'ESS-01 / 电芯温度异常', value: '61.8°C' },
  { title: '指标告警', detail: '最高电芯温度 > 55°C', value: '当前 61.8°C' },
  { title: '规则事件', detail: '持续高温规则', value: '已命中' },
  { title: '定时任务', detail: '储能柜巡检', value: '10:00' },
]

const pipelineSteps = [
  { title: '事件校验', icon: ShieldCheck },
  { title: '事件去重', icon: Combine },
  { title: '上下文构建', icon: Layers },
]

const { elapsed } = useRuntimeTimeline(5800)

const activeBars = computed(() => stageCount(elapsed.value, BAR_START_MS, BAR_INTERVAL_MS, events.length))
const triggered = computed(() => elapsed.value >= TRIGGERED_MS)

function stepState(index: number): 'pending' | 'active' | 'done' {
  const activeAt = PIPELINE_START_MS + index * PIPELINE_INTERVAL_MS
  const doneAt = activeAt + PIPELINE_INTERVAL_MS
  if (elapsed.value >= doneAt && index < pipelineSteps.length - 1) {
    return 'done'
  }
  if (elapsed.value >= activeAt) {
    return 'active'
  }
  return 'pending'
}

function stepCardClass(index: number): string {
  const state = stepState(index)
  if (state === 'active') {
    return 'border-primary/40 bg-primary/10'
  }
  if (state === 'done') {
    return 'border-primary/30 bg-primary/5'
  }
  return 'border-dt-line-strong/60 bg-dt-bg-soft/20'
}

function stepIconClass(index: number): string {
  return stepState(index) === 'pending' ? 'text-muted' : 'text-primary'
}
</script>

<template>
  <RuntimePanelShell :icon="Radio" title="事件触发器" badge="监听中">
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <div class="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Radio class="size-5 text-primary" aria-hidden="true" />
            <span class="absolute inset-0 animate-ping rounded-xl bg-primary/10" aria-hidden="true"></span>
          </div>
          <div class="min-w-0">
            <p class="text-xs font-medium text-primary">DEVICE AGENT</p>
            <p class="truncate font-mono text-base font-semibold text-highlighted">
              {{ triggered ? '事件已触发' : '等待事件' }}
            </p>
          </div>
        </div>
        <span class="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">实时</span>
      </div>
    </div>

    <div class="mt-1.5 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5">
      <div class="mb-2 flex items-center gap-2">
        <div
          v-for="(event, index) in events"
          :key="`bar-${event.title}`"
          class="h-1.5 flex-1 rounded-full transition-colors duration-200"
          :class="index < activeBars ? 'bg-primary' : 'bg-dt-bg-soft'"
        ></div>
      </div>
      <div class="grid gap-1">
        <div
          v-for="(event, index) in events"
          :key="event.title"
          class="flex items-baseline justify-between gap-2 text-xs leading-5 transition-opacity duration-500"
          :class="index < activeBars ? 'opacity-100' : 'opacity-0'"
        >
          <span class="min-w-0 truncate">
            <span class="font-semibold text-highlighted">{{ event.title }}</span>
            <span class="text-muted"> · {{ event.detail }}</span>
          </span>
          <span class="shrink-0 font-mono text-xs text-primary/80">{{ event.value }}</span>
        </div>
      </div>
    </div>

    <div class="mt-1.5 grid grid-cols-3 gap-1.5">
      <div
        v-for="(step, index) in pipelineSteps"
        :key="step.title"
        class="flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors duration-500"
        :class="stepCardClass(index)"
      >
        <div class="flex items-center gap-1">
          <component
            :is="step.icon"
            class="size-4 transition-colors duration-500"
            :class="stepIconClass(index)"
            aria-hidden="true"
          />
          <LoaderCircle
            v-if="stepState(index) === 'active'"
            class="size-3.5 animate-spin text-primary"
            aria-hidden="true"
          />
          <CircleCheck v-else-if="stepState(index) === 'done'" class="size-3.5 text-primary" aria-hidden="true" />
          <CircleDashed v-else class="size-3.5 text-muted" aria-hidden="true" />
        </div>
        <span
          class="text-xs leading-4 transition-colors duration-500"
          :class="stepState(index) === 'pending' ? 'text-muted' : 'text-highlighted'"
        >
          {{ step.title }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="max-w-xl text-sm text-muted lg:line-clamp-2"
          title="让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。"
        >
          让设备告警、指标异常、规则命中与定时任务直接触发 Agent，自动启动后续分析与处置。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
