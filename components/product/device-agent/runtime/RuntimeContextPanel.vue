<script setup lang="ts">
import { Activity, BookOpen, Box, ChartNoAxesCombined, CircleCheck, Cpu, Layers, LoaderCircle, Terminal } from '@lucide/vue'
import { computed } from 'vue'
import IconBox from '~/components/common/card/IconBox.vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const REALTIME_MS = 500
const REALTIME_DONE_MS = 1800
const TIMESERIES_DONE_MS = 3100
const DEVICE_MS = 3500
const DEVICE_DONE_MS = 4800
const KNOWLEDGE_MS = 5200
const KNOWLEDGE_DONE_MS = 6500
const BUILD_MS = 7000
const READY_MS = 7800

const sourceCards = [
  {
    title: '实时数据',
    description: '设备实时运行指标',
    status: '61.8°C · 500 kW',
    icon: Activity,
    startMs: REALTIME_MS,
    endMs: REALTIME_DONE_MS,
  },
  {
    title: '历史时序',
    description: '历史趋势与运行基线',
    status: '7 天 · 42.6°C',
    icon: ChartNoAxesCombined,
    startMs: REALTIME_DONE_MS,
    endMs: DEVICE_MS,
  },
  {
    title: '设备状态',
    description: '设备及子系统状态',
    status: 'BMS 告警',
    icon: Cpu,
    startMs: DEVICE_MS,
    endMs: KNOWLEDGE_MS,
  },
  {
    title: '知识库',
    description: '运维知识与处置规范',
    status: '2 条匹配',
    icon: BookOpen,
    startMs: KNOWLEDGE_MS,
    endMs: BUILD_MS,
  },
]

const contextFields = [
  { label: '运行状态', value: '充电中', atMs: REALTIME_MS, amber: false },
  { label: 'SOC', value: '86%', atMs: REALTIME_MS + 150, amber: false },
  { label: '最高温度', value: '61.8°C', atMs: REALTIME_MS + 300, amber: true },
  { label: '充电功率', value: '500 kW', atMs: REALTIME_MS + 450, amber: false },
  { label: '历史基线', value: '42.6°C', atMs: TIMESERIES_DONE_MS, amber: false },
  { label: '偏离幅度', value: '+45.1%', atMs: TIMESERIES_DONE_MS + 150, amber: false },
  { label: 'PCS', value: '正常', atMs: DEVICE_DONE_MS, amber: false },
  { label: 'BMS', value: '告警', atMs: DEVICE_DONE_MS + 150, amber: false },
]

const stages = [
  {
    startMs: REALTIME_MS,
    doneMs: REALTIME_DONE_MS,
    code: 'context.realtime({ device: "ESS-01" })',
    running: '读取实时设备数据...',
    done: '已读取',
  },
  {
    startMs: REALTIME_DONE_MS,
    doneMs: TIMESERIES_DONE_MS,
    code: 'context.timeseries({ device: "ESS-01", window: "7d" })',
    running: '正在查询历史时序...',
    done: '已聚合',
  },
  {
    startMs: DEVICE_MS,
    doneMs: DEVICE_DONE_MS,
    code: 'context.device({ device: "ESS-01" })',
    running: '读取设备与子系统状态...',
    done: '已关联',
  },
  {
    startMs: KNOWLEDGE_MS,
    doneMs: KNOWLEDGE_DONE_MS,
    code: 'context.knowledge({ query: "电芯持续高温" })',
    running: '检索相关运维知识...',
    done: '匹配 2 条',
  },
  {
    startMs: BUILD_MS,
    doneMs: READY_MS,
    code: 'context.build({ device: "ESS-01", sources: 4 })',
    running: '正在构建设备上下文...',
    done: 'Context Ready · 1.2s',
  },
]

const { elapsed } = useRuntimeTimeline(8800)

const ready = computed(() => elapsed.value >= READY_MS)
const knowledgeOn = computed(() => elapsed.value >= KNOWLEDGE_DONE_MS)

const activeStage = computed(() => {
  let current = -1
  stages.forEach((stage, index) => {
    if (elapsed.value >= stage.startMs) {
      current = index
    }
  })
  return current
})

const stageDone = computed(() => {
  const stage = activeStage.value >= 0 ? stages[activeStage.value] : undefined
  return stage !== undefined && elapsed.value >= stage.doneMs
})

const stageCode = computed(() => {
  const stage = activeStage.value >= 0 ? stages[activeStage.value] : undefined
  return stepCode(stage)
})

function stepCode(stage: (typeof stages)[number] | undefined): string {
  if (!stage) {
    return '// 初始化设备上下文引擎'
  }
  return stage.code
}

const stageStatusText = computed(() => {
  const stage = activeStage.value >= 0 ? stages[activeStage.value] : undefined
  if (!stage) {
    return '准备读取数据源...'
  }
  return elapsed.value >= stage.doneMs ? stage.done : stage.running
})

const cardBadge = computed(() => {
  if (ready.value) {
    return '已就绪'
  }
  if (elapsed.value >= REALTIME_MS && elapsed.value < REALTIME_DONE_MS) {
    return '读取中'
  }
  return '构建中'
})

type SourceState = 'idle' | 'active' | 'done'

function sourceState(card: (typeof sourceCards)[number]): SourceState {
  if (ready.value) {
    return 'done'
  }
  if (elapsed.value >= card.startMs && elapsed.value < card.endMs) {
    return 'active'
  }
  if (elapsed.value >= card.endMs) {
    return 'done'
  }
  return 'idle'
}

function sourceCardClass(card: (typeof sourceCards)[number]): string {
  const state = sourceState(card)
  if (state === 'active') {
    return 'border-primary/30 bg-primary/5'
  }
  if (state === 'done') {
    return 'border-primary/20 bg-primary/5'
  }
  return 'border-dt-line-strong/60 bg-dt-bg-soft/20'
}

function sourceIconTone(card: (typeof sourceCards)[number]): 'primary' | 'soft' {
  return sourceState(card) === 'idle' ? 'soft' : 'primary'
}

function sourceStatusClass(card: (typeof sourceCards)[number]): string {
  return sourceState(card) === 'idle' ? 'text-muted' : 'text-primary'
}
</script>

<template>
  <RuntimePanelShell :icon="Layers" title="设备上下文引擎" badge="实时构建" badge-dot>
    <div class="rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <div class="flex min-w-0 items-center gap-2.5 sm:w-[170px] sm:shrink-0 sm:flex-col sm:items-start sm:gap-1.5">
          <div class="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <Box class="size-4 text-primary" aria-hidden="true" />
            <span
              class="absolute inset-0 animate-ping rounded-lg bg-primary/10 transition-opacity duration-500"
              :class="ready ? 'opacity-0' : 'opacity-100'"
              aria-hidden="true"
            ></span>
          </div>
          <div class="min-w-0 flex-1 sm:flex-none">
            <div class="flex items-center justify-between gap-1.5 sm:justify-start sm:gap-2">
              <p class="truncate text-sm font-semibold text-highlighted">ESS-01 设备上下文</p>
              <span class="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {{ cardBadge }}
              </span>
            </div>
            <p class="mt-0.5 hidden text-xs leading-4 text-muted sm:block sm:line-clamp-2">
              正在融合实时状态、历史时序、设备信息与知识数据。
            </p>
          </div>
        </div>
        <div class="grid flex-1 grid-cols-2 gap-x-6 gap-y-1">
          <div
            v-for="field in contextFields"
            :key="field.label"
            class="flex items-baseline justify-between gap-1.5 transition-opacity duration-500"
            :class="elapsed >= field.atMs ? 'opacity-100' : 'opacity-0'"
          >
            <span class="truncate text-xs leading-4 text-muted">{{ field.label }}</span>
            <span
              class="shrink-0 font-mono text-xs font-medium leading-4"
              :class="field.amber ? 'text-amber-500' : 'text-highlighted'"
            >
              {{ field.value }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="mt-1.5 flex items-baseline gap-1.5 text-xs leading-4 transition-opacity duration-500"
        :class="knowledgeOn ? 'opacity-100' : 'opacity-0'"
      >
        <span class="shrink-0 font-medium text-highlighted">知识参考</span>
        <span class="truncate text-muted">持续高温可能与散热异常、电芯一致性下降或充电倍率过高相关。</span>
      </div>
    </div>

    <div class="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      <div
        v-for="card in sourceCards"
        :key="card.title"
        class="flex items-center gap-2 rounded-lg border p-1 transition-all duration-300 sm:p-1.5"
        :class="sourceCardClass(card)"
      >
        <IconBox :icon="card.icon" :size="40" :icon-size="20" :tone="sourceIconTone(card)" class="shrink-0" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-semibold leading-4 text-highlighted">{{ card.title }}</p>
          <p class="hidden truncate text-[11px] leading-4 text-muted xl:block">{{ card.description }}</p>
          <p
            class="truncate font-mono text-[11px] leading-4 transition-colors duration-300"
            :class="sourceStatusClass(card)"
          >
            {{ card.status }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-1.5 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5">
      <div class="flex items-center gap-1.5">
        <Terminal class="size-3.5 shrink-0 text-muted" aria-hidden="true" />
        <p class="truncate text-xs font-semibold text-highlighted">上下文构建序列</p>
        <div
          class="ml-auto flex shrink-0 items-center gap-1 text-[11px] leading-4 transition-colors duration-300"
          :class="activeStage >= 0 ? 'text-primary' : 'text-muted'"
        >
          <LoaderCircle
            v-if="activeStage >= 0 && !stageDone"
            class="size-3 shrink-0 animate-spin"
            aria-hidden="true"
          />
          <CircleCheck v-else-if="stageDone" class="size-3 shrink-0" aria-hidden="true" />
          {{ stageStatusText }}
        </div>
      </div>
      <p class="mt-1 truncate font-mono text-xs leading-4 text-muted">{{ stageCode }}</p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="max-w-xl text-sm text-muted line-clamp-2"
          title="Agent 自动融合实时状态、历史时序、设备信息与知识数据，为每一次运行动态构建设备级上下文。"
        >
          Agent 自动融合实时状态、历史时序、设备信息与知识数据，为每一次运行动态构建设备级上下文。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
