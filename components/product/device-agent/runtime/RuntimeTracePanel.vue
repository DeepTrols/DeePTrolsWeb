<script setup lang="ts">
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CircleCheck,
  CircleDashed,
  ClipboardCheck,
  Database,
  FileSearch,
  Gauge,
  LoaderCircle,
  Wrench,
  Zap,
} from '@lucide/vue'
import { computed } from 'vue'
import IconBox from '~/components/common/card/IconBox.vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { getRuntimeBarWidthClass, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'
import { deviceAgentTraceSteps } from '~/data/device-agent'
import type { Component } from 'vue'
import type { DeviceAgentTraceStep } from '~/data/device-agent'

const STEP_START_MS = 400
const STEP_INTERVAL_MS = 1100
const TOTAL_MS = 8000
const RUN_SECONDS = 8.4
const TOOL_STEP_INDEXES = [1, 2, 4, 5]
const SKILL_STEP_INDEX = 3

const { elapsed, finished } = useRuntimeTimeline(TOTAL_MS)

const activeIndex = computed(() =>
  Math.min(
    deviceAgentTraceSteps.length - 1,
    Math.max(0, Math.floor((elapsed.value - STEP_START_MS) / STEP_INTERVAL_MS)),
  ),
)

const runSeconds = computed(() => {
  const doneAt = STEP_START_MS + STEP_INTERVAL_MS * (deviceAgentTraceSteps.length - 1)
  const ratio = Math.max(0, Math.min(1, elapsed.value / doneAt))
  return (ratio * RUN_SECONDS).toFixed(1)
})

const toolCalls = computed(() => TOOL_STEP_INDEXES.filter((index) => index <= activeIndex.value || finished.value).length)

const skillCount = computed(() => (activeIndex.value >= SKILL_STEP_INDEX || finished.value ? 3 : 0))

const stats = computed(() => [
  { label: '耗时', value: `${runSeconds.value} 秒`, icon: Gauge },
  { label: '工具调用', value: String(toolCalls.value), icon: Wrench },
  { label: 'Skills', value: String(skillCount.value), icon: Zap },
])

function stepState(index: number): 'pending' | 'current' | 'done' {
  if (finished.value || index < activeIndex.value) {
    return 'done'
  }
  if (index === activeIndex.value) {
    return 'current'
  }
  return 'pending'
}

const traceIcons: Record<string, Component> = {
  事件: Zap,
  上下文: Database,
  知识检索: FileSearch,
  Skill: Zap,
  模型推理: BrainCircuit,
  工具调用: Wrench,
  执行结果: ClipboardCheck,
}

const fallbackTraceStep = deviceAgentTraceSteps[0] as DeviceAgentTraceStep
const currentStep = computed(() => deviceAgentTraceSteps[activeIndex.value] ?? fallbackTraceStep)
const currentDetail = computed(() => currentStep.value?.lines.join(' · ') ?? '')
const progressClass = computed(() => getRuntimeBarWidthClass(elapsed.value / TOTAL_MS, 100))

function traceIcon(kind: string): Component {
  return traceIcons[kind] ?? Activity
}

function stepCardClass(index: number): string {
  const state = stepState(index)
  if (state === 'done') {
    return 'border-emerald-400/25 bg-emerald-400/5'
  }
  if (state === 'current') {
    return 'border-primary/40 bg-primary/10 shadow-sm shadow-primary/5'
  }
  return 'border-dt-line-strong/60 bg-dt-bg-soft/20'
}

function stepTextClass(index: number): string {
  const state = stepState(index)
  if (state === 'done') {
    return 'text-emerald-400'
  }
  if (state === 'current') {
    return 'text-primary'
  }
  return 'text-muted'
}

function iconTone(index: number): 'primary' | 'soft' | 'success' {
  const state = stepState(index)
  if (state === 'done') {
    return 'success'
  }
  return state === 'current' ? 'primary' : 'soft'
}

function statusIcon(index: number): Component {
  const state = stepState(index)
  if (state === 'done') {
    return CircleCheck
  }
  if (state === 'current') {
    return LoaderCircle
  }
  return CircleDashed
}

function connectorClass(index: number): string {
  const nextState = stepState(index + 1)
  if (nextState === 'done') {
    return 'text-emerald-400'
  }
  if (nextState === 'current') {
    return 'text-primary'
  }
  return 'text-muted'
}
</script>

<template>
  <RuntimePanelShell :icon="Activity" title="运行 Trace" badge="采集中">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex items-center gap-2 rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-2 py-1"
      >
        <component :is="stat.icon" class="hidden size-3.5 shrink-0 text-primary sm:block" aria-hidden="true" />
        <div class="min-w-0">
          <p class="truncate text-xs leading-5 text-muted">{{ stat.label }}</p>
          <p class="font-mono text-sm font-semibold leading-5 text-highlighted">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="mt-2 grid min-h-0 flex-1 gap-2 xl:grid-cols-[minmax(0,1fr)_210px]">
      <div class="flex min-h-0 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2.5">
        <div class="flex items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-2">
            <span class="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
            <span class="truncate font-mono text-xs font-semibold text-primary">trace.run.ess-01</span>
          </div>
          <span class="shrink-0 rounded bg-dt-bg-soft/60 px-2 py-0.5 text-[10px] font-medium text-muted">
            {{ finished ? 'Trace 完成' : '采集中' }}
          </span>
        </div>

        <div class="mt-2 grid gap-2">
          <template v-for="(step, index) in deviceAgentTraceSteps" :key="step.time">
            <article
              class="grid grid-cols-[64px_auto_minmax(0,1fr)_auto] items-center gap-5 rounded-lg border px-2 py-1 transition-all duration-300"
              :class="stepCardClass(index)"
            >
              <span class="shrink-0 text-right font-mono text-[10px] leading-4 text-muted">{{ step.time }}</span>
              <span class="flex size-5 shrink-0 items-center justify-center rounded-md bg-dt-bg text-muted ring-1 ring-dt-line-strong/60 transition-colors duration-300">
                <component
                  :is="statusIcon(index)"
                  class="size-3"
                  :class="[stepTextClass(index), stepState(index) === 'current' ? 'animate-spin' : '']"
                  aria-hidden="true"
                />
              </span>
              <div class="min-w-0">
                <p class="flex min-w-0 items-center gap-1.5">
                  <span class="shrink-0 text-[11px] font-semibold leading-4 transition-colors duration-300" :class="stepTextClass(index)">
                    {{ step.kind }}
                  </span>
                  <span class="truncate font-mono text-[11px] leading-4 text-muted">{{ step.lines.join(' · ') }}</span>
                </p>
              </div>
              <ArrowRight
                v-if="index < deviceAgentTraceSteps.length - 1"
                class="size-3 shrink-0 rotate-90 transition-colors duration-300"
                :class="connectorClass(index)"
                aria-hidden="true"
              />
            </article>
          </template>
        </div>
      </div>

      <aside class="hidden min-h-0 flex-col rounded-xl border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2 xl:flex">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-semibold text-highlighted">当前 Span</span>
          <span class="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">span-{{ activeIndex + 1 }}</span>
        </div>

        <div class="mt-2 flex items-center gap-2.5">
          <IconBox :icon="traceIcon(currentStep.kind)" :tone="iconTone(activeIndex)" class="shrink-0" />
          <div
            class="min-w-0"
          >
            <p class="truncate text-sm font-semibold text-highlighted">{{ currentStep.kind }}</p>
            <p class="mt-0.5 truncate text-xs leading-4 text-muted">{{ currentDetail }}</p>
          </div>
        </div>

        <div class="mt-2 space-y-1">
          <div class="flex items-center justify-between gap-3 rounded-lg border border-dt-line-strong/60 bg-dt-bg px-2 py-1">
            <span class="text-xs text-muted">Trace ID</span>
            <span class="truncate font-mono text-xs text-highlighted">ess-01-runtime</span>
          </div>
          <div class="flex items-center justify-between gap-3 rounded-lg border border-dt-line-strong/60 bg-dt-bg px-2 py-1">
            <span class="text-xs text-muted">采样状态</span>
            <span class="font-mono text-xs" :class="finished ? 'text-emerald-400' : 'text-primary'">
              {{ finished ? 'closed' : 'streaming' }}
            </span>
          </div>
          <div class="rounded-lg border border-dt-line-strong/60 bg-dt-bg px-2 py-1">
            <div class="flex items-center justify-between gap-3">
              <span class="text-xs text-muted">运行进度</span>
              <span class="font-mono text-xs text-highlighted">{{ activeIndex + 1 }}/{{ deviceAgentTraceSteps.length }}</span>
            </div>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dt-bg-soft">
              <div class="h-full rounded-full bg-primary transition-all duration-300" :class="progressClass"></div>
            </div>
          </div>
        </div>

        <div class="mt-auto rounded-lg border border-primary/20 bg-primary/5 px-2 py-1">
          <p class="text-sm font-semibold text-primary">Observability</p>
          <p class="mt-2 text-xs leading-5 text-muted">事件、上下文、工具、Skills 与执行结果被统一记录，可回放、可追踪、可审计。</p>
        </div>
      </aside>
    </div>
  </RuntimePanelShell>
</template>
