<script setup lang="ts">
import { CircleCheck, LoaderCircle, Puzzle, Terminal } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import {
  getRuntimeBarWidthClass,
  stageCount,
  useRuntimeTimeline,
} from '~/components/product/device-agent/useRuntimeTimeline'

const BAR_START_MS = 1200
const BAR_STAGGER_MS = 150
const BAR_DURATION_MS = 1800
const BARS_DONE_MS = 3450
const SELECT_START_MS = 4000
const SELECT_INTERVAL_MS = 400
const READY_MS = 4800

const candidates = [
  { name: '设备巡检', match: 62, selected: false },
  { name: '告警分诊', match: 96, selected: true },
  { name: '热异常诊断', match: 93, selected: true },
  { name: '工单派发', match: 87, selected: true },
]

const { elapsed } = useRuntimeTimeline(6000)

const selectedCount = computed(() => stageCount(elapsed.value, SELECT_START_MS, SELECT_INTERVAL_MS, 3))
const barsDone = computed(() => elapsed.value >= BARS_DONE_MS)
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

const mountedSkills = computed(() =>
  candidates.filter((_candidate, index) => isSelected(index)).map((candidate) => candidate.name),
)

const mountCode = computed(() => `skills.mount([${mountedSkills.value.map((name) => `"${name}"`).join(', ')}])`)

const topStatusText = computed(() => {
  if (ready.value) {
    return '3 Skills mounted'
  }
  return barsDone.value ? '正在挂载 Skills...' : '正在匹配 Skills...'
})

const mountStatusText = computed(() => {
  if (ready.value) {
    return '3 Skills mounted'
  }
  return barsDone.value ? '挂载中' : '匹配中'
})
</script>

<template>
  <RuntimePanelShell :icon="Puzzle" title="Skills" badge="按需加载">
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <div class="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Puzzle class="size-5 text-primary" aria-hidden="true" />
            <span class="absolute inset-0 animate-ping rounded-xl bg-primary/10" aria-hidden="true"></span>
          </div>
          <div class="min-w-0">
            <p class="truncate text-xs font-medium text-primary">ESS-01 · 电芯温度告警</p>
            <p class="truncate font-mono text-base font-semibold text-highlighted">收到事件</p>
          </div>
        </div>
        <span class="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">61.8°C</span>
      </div>
    </div>

    <div
      class="mt-2 flex items-center gap-1.5 text-[11px] transition-colors duration-300"
      :class="ready ? 'text-primary' : 'text-muted'"
    >
      <LoaderCircle v-if="!ready" class="size-3.5 shrink-0 animate-spin text-primary" aria-hidden="true" />
      <CircleCheck v-else class="size-3.5 shrink-0" aria-hidden="true" />
      {{ topStatusText }}
    </div>

    <div class="mt-1.5 grid gap-1">
      <div
        v-for="(candidate, index) in candidates"
        :key="candidate.name"
        class="rounded-lg border px-2.5 py-1 transition-colors duration-300"
        :class="isSelected(index) ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
      >
        <div class="flex items-center justify-between gap-2 text-xs">
          <span class="flex items-center gap-1.5 font-medium text-highlighted">
            <CircleCheck v-if="isSelected(index)" class="size-3.5 text-primary" aria-hidden="true" />
            {{ candidate.name }}
          </span>
          <span class="font-mono text-[11px] text-muted">{{ Math.round(barProgress(index) * candidate.match) }}%</span>
        </div>
        <div class="mt-0.5 h-1 overflow-hidden rounded-full bg-dt-bg-soft/40">
          <div
            class="h-full rounded-full bg-primary/70 transition-all duration-200"
            :class="getRuntimeBarWidthClass(barProgress(index), candidate.match)"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-auto rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5">
      <div class="flex items-center gap-1.5">
        <Terminal class="size-3.5 shrink-0 text-muted" aria-hidden="true" />
        <p class="truncate text-xs font-semibold text-highlighted">Skill 挂载序列</p>
        <div class="ml-auto flex shrink-0 items-center gap-1 text-[11px] leading-4 text-primary">
          <LoaderCircle v-if="!ready" class="size-3 shrink-0 animate-spin" aria-hidden="true" />
          <CircleCheck v-else class="size-3 shrink-0" aria-hidden="true" />
          {{ mountStatusText }}
        </div>
      </div>
      <p class="mt-1 truncate font-mono text-xs leading-4 text-muted">{{ mountCode }}</p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="truncate text-sm text-muted"
          title="Agent 通过 Skills 按需挂载能力，在运行时动态组合知识与工具，完成感知、分析与执行。"
        >
          Agent 通过 Skills 按需挂载能力，在运行时动态组合知识与工具，完成感知、分析与执行。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
