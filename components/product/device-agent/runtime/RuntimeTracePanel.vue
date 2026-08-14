<script setup lang="ts">
import { Activity, RotateCcw } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'
import { deviceAgentTraceSteps } from '~/data/device-agent'

const STEP_START_MS = 400
const STEP_INTERVAL_MS = 1100
const TOTAL_MS = 8000
const RUN_SECONDS = 8.4
const TOOL_STEP_INDEXES = [1, 2, 4, 5]
const SKILL_STEP_INDEX = 3

const { elapsed, finished, restart } = useRuntimeTimeline(TOTAL_MS)

const visibleSteps = computed(() =>
  Math.min(deviceAgentTraceSteps.length, Math.max(0, Math.floor((elapsed.value - STEP_START_MS) / STEP_INTERVAL_MS) + 1)),
)

const runSeconds = computed(() => {
  const doneAt = STEP_START_MS + STEP_INTERVAL_MS * (deviceAgentTraceSteps.length - 1)
  const ratio = Math.max(0, Math.min(1, elapsed.value / doneAt))
  return (ratio * RUN_SECONDS).toFixed(1)
})

const toolCalls = computed(() => TOOL_STEP_INDEXES.filter((index) => index < visibleSteps.value).length)

const skillCount = computed(() => (visibleSteps.value > SKILL_STEP_INDEX ? 3 : 0))

const stats = computed(() => [
  { label: '耗时', value: `${runSeconds.value} 秒` },
  { label: '工具调用', value: String(toolCalls.value) },
  { label: 'Skills', value: String(skillCount.value) },
])

function stepState(index: number): 'pending' | 'current' | 'done' {
  if (index >= visibleSteps.value) {
    return 'pending'
  }
  if (finished.value || index < visibleSteps.value - 1) {
    return 'done'
  }
  return 'current'
}
</script>

<template>
  <RuntimePanelShell :icon="Activity" title="运行 Trace" badge="采集中">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-2.5 py-1.5 text-center"
      >
        <p class="text-[11px] leading-4 text-muted">{{ stat.label }}</p>
        <p class="font-mono text-sm font-semibold text-highlighted">{{ stat.value }}</p>
      </div>
    </div>

    <div class="mt-2 flex min-h-0 flex-1 flex-col">
      <template v-for="(step, index) in deviceAgentTraceSteps" :key="step.time">
        <div
          class="flex items-center gap-2 transition-opacity duration-500"
          :class="stepState(index) === 'pending' ? 'opacity-0' : 'opacity-100'"
        >
          <span class="w-[72px] shrink-0 text-right font-mono text-[10px] leading-4 text-muted">{{ step.time }}</span>
          <div
            class="min-w-0 flex-1 rounded-lg border px-2.5 py-1 transition-all duration-500"
            :class="
              stepState(index) === 'current'
                ? 'border-primary/40 bg-primary/10'
                : 'border-dt-line-strong/60 bg-dt-bg-soft/20'
            "
          >
            <div class="flex items-center gap-2">
              <span
                class="shrink-0 text-[11px] font-semibold leading-4 transition-colors duration-500"
                :class="stepState(index) === 'current' ? 'text-primary' : 'text-highlighted'"
              >
                {{ step.kind }}
              </span>
              <span class="truncate font-mono text-[11px] leading-4 text-muted">{{ step.lines.join(' · ') }}</span>
            </div>
          </div>
        </div>
        <div v-if="index < deviceAgentTraceSteps.length - 1" class="flex items-center gap-2" aria-hidden="true">
          <span class="flex w-[72px] shrink-0 justify-center">
            <span
              class="h-2.5 w-px bg-primary/40 transition-opacity duration-500"
              :class="index + 1 < visibleSteps ? 'opacity-100' : 'opacity-0'"
            ></span>
          </span>
        </div>
      </template>
    </div>

    <button
      type="button"
      class="mx-auto mt-2 flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-3 py-1.5 text-xs font-medium text-highlighted transition-colors duration-300 hover:border-primary/40 hover:text-primary"
      @click="restart()"
    >
      <RotateCcw class="size-3.5" aria-hidden="true" />
      重放本次运行
    </button>
  </RuntimePanelShell>
</template>
