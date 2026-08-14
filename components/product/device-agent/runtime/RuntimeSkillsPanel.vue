<script setup lang="ts">
import { ArrowRight, CircleCheck, LoaderCircle, Puzzle } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import {
  getRuntimeBarWidthClass,
  stageCount,
  useRuntimeTimeline,
} from '~/components/product/device-agent/useRuntimeTimeline'

const MATCHING_MS = 800
const BAR_START_MS = 1200
const BAR_STAGGER_MS = 150
const BAR_DURATION_MS = 1800
const SELECT_START_MS = 4000
const SELECT_INTERVAL_MS = 400
const CHAIN_START_MS = 5600
const CHAIN_INTERVAL_MS = 500
const READY_MS = 7600

const candidates = [
  { name: '设备巡检', match: 62, selected: false },
  { name: '告警分诊', match: 96, selected: true },
  { name: '热异常诊断', match: 93, selected: true },
  { name: '工单派发', match: 87, selected: true },
]

const chainNodes = ['告警分诊', '热异常分析', '处置决策', '工单派发']

const { elapsed } = useRuntimeTimeline(8200)

const eventOn = computed(() => elapsed.value >= 200)
const matching = computed(() => elapsed.value >= MATCHING_MS)
const selectedCount = computed(() => stageCount(elapsed.value, SELECT_START_MS, SELECT_INTERVAL_MS, 3))
const chainActive = computed(() => stageCount(elapsed.value, CHAIN_START_MS, CHAIN_INTERVAL_MS, chainNodes.length))
const ready = computed(() => elapsed.value >= READY_MS)

function barProgress(index: number): number {
  return Math.max(0, Math.min(1, (elapsed.value - (BAR_START_MS + index * BAR_STAGGER_MS)) / BAR_DURATION_MS))
}

function isSelected(index: number): boolean {
  if (!candidates[index]?.selected) {
    return false
  }
  const order = candidates.slice(0, index + 1).filter((candidate) => candidate.selected).length
  return order <= selectedCount.value
}
</script>

<template>
  <RuntimePanelShell :icon="Puzzle" title="Skills" badge="按需加载">
    <div
      class="flex items-center justify-between gap-2 rounded-lg border border-primary/40 bg-primary/5 px-2.5 py-2 transition-opacity duration-500"
      :class="eventOn ? 'opacity-100' : 'opacity-0'"
    >
      <div class="flex min-w-0 items-baseline gap-2">
        <span class="shrink-0 text-xs font-semibold text-highlighted">收到事件</span>
        <span class="truncate font-mono text-[11px] text-muted">ESS-01 · 电芯温度告警</span>
      </div>
      <span class="shrink-0 font-mono text-xs text-primary">61.8°C</span>
    </div>

    <div
      class="mt-2 flex items-center gap-1.5 text-[11px] text-muted transition-opacity duration-500"
      :class="matching ? 'opacity-100' : 'opacity-0'"
    >
      <LoaderCircle class="size-3.5 animate-spin text-primary" aria-hidden="true" />
      正在匹配 Skills...
    </div>

    <div class="mt-1.5 grid gap-1.5">
      <div
        v-for="(candidate, index) in candidates"
        :key="candidate.name"
        class="rounded-lg border px-2.5 py-1.5 transition-all duration-500"
        :class="[
          matching ? 'opacity-100' : 'opacity-0',
          isSelected(index) ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20',
        ]"
      >
        <div class="flex items-center justify-between gap-2 text-xs">
          <span class="flex items-center gap-1.5 font-medium text-highlighted">
            <CircleCheck v-if="isSelected(index)" class="size-3.5 text-primary" aria-hidden="true" />
            {{ candidate.name }}
          </span>
          <span class="font-mono text-[11px] text-muted">{{ Math.round(barProgress(index) * candidate.match) }}%</span>
        </div>
        <div class="mt-1 h-1 overflow-hidden rounded-full bg-dt-bg-soft/40">
          <div
            class="h-full rounded-full bg-primary/70 transition-all duration-200"
            :class="getRuntimeBarWidthClass(barProgress(index), candidate.match)"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-auto flex flex-wrap items-center justify-center gap-1 pt-2">
      <template v-for="(node, index) in chainNodes" :key="node">
        <div
          class="rounded-lg border px-2.5 py-1 text-[11px] font-medium leading-4 transition-all duration-500"
          :class="
            index < chainActive
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-dt-line-strong/60 bg-dt-bg-soft/20 text-muted'
          "
        >
          {{ node }}
        </div>
        <ArrowRight
          v-if="index < chainNodes.length - 1"
          class="size-3.5 shrink-0 transition-opacity duration-500"
          :class="index + 1 < chainActive ? 'text-primary opacity-100' : 'text-muted opacity-0'"
          aria-hidden="true"
        />
      </template>
    </div>

    <p
      class="pt-1.5 text-xs font-medium text-primary transition-opacity duration-500"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    >
      已挂载 3 个 Skills · 就绪
    </p>
  </RuntimePanelShell>
</template>
