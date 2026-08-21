<script setup lang="ts">
import { CircleCheck, Plug, Terminal } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import RuntimeToolsGraph from '~/components/product/device-agent/runtime/RuntimeToolsGraph.vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const CALL_MS = 3000
const DOT_A_MS = 300
const DOT_B_MS = 900
const EXEC_MS = 1500
const DONE_MS = 2200

const calls = [
  {
    name: 'tables.query',
    description: '查询储能柜历史时序数据',
    code: 'tools.tables.query({ device: "ESS-01", window: "7d" })',
    running: '调用中',
    done: '已完成',
    params: [
      { label: '设备', value: 'ESS-01' },
      { label: '时间范围', value: '近 7 天' },
      { label: '数据指标', value: '温度 / SOC / 功率' },
      { label: '采样粒度', value: '5 min' },
    ],
  },
  {
    name: 'device.command',
    description: '向储能柜下发运行控制指令',
    code: 'tools.device.command({ device: "ESS-01", action: "set_power" })',
    running: '执行中',
    done: '已完成',
    params: [
      { label: '设备', value: 'ESS-01' },
      { label: '控制动作', value: '调整充电功率' },
      { label: '目标功率', value: '420 kW' },
      { label: '执行模式', value: '单次执行' },
    ],
  },
  {
    name: 'humans.approve',
    description: '高风险动作请求人工确认',
    code: 'tools.humans.approve({ device: "ESS-01", action: "set_power" })',
    running: '等待审批',
    done: '已批准',
    params: [
      { label: '设备', value: 'ESS-01' },
      { label: '审批事项', value: '调整充电功率' },
      { label: '目标功率', value: '420 kW' },
      { label: '审批策略', value: '人工确认' },
    ],
  },
] as const

const { elapsed } = useRuntimeTimeline(CALL_MS * calls.length)

const activeCall = computed(() => {
  if (elapsed.value >= calls.length * CALL_MS) {
    return null
  }
  return Math.floor(elapsed.value / CALL_MS)
})

const currentCall = computed(() => calls[activeCall.value ?? 0] ?? calls[0])

const callTime = computed(() => (activeCall.value === null ? 0 : elapsed.value - activeCall.value * CALL_MS))

const callDone = computed(() => activeCall.value !== null && callTime.value >= DONE_MS)

const dot = computed(() => {
  const call = activeCall.value
  if (call === null) {
    return null
  }
  if (callTime.value >= DOT_A_MS && callTime.value < DOT_B_MS) {
    return { seg: 'a' as const, p: (callTime.value - DOT_A_MS) / (DOT_B_MS - DOT_A_MS), row: call }
  }
  if (callTime.value >= DOT_B_MS && callTime.value < EXEC_MS) {
    return { seg: 'b' as const, p: (callTime.value - DOT_B_MS) / (EXEC_MS - DOT_B_MS), row: call }
  }
  return null
})

const toolBadgeText = computed(() => {
  if (activeCall.value === null) {
    return '就绪'
  }
  return callDone.value ? currentCall.value.done : currentCall.value.running
})

const toolBadgeClass = computed(() =>
  activeCall.value !== null ? 'bg-primary/10 text-primary' : 'bg-dt-bg-soft/40 text-muted',
)

const terminalText = computed(() => {
  if (activeCall.value === null) {
    return '等待调用'
  }
  return callDone.value ? '✓ 调用成功 · 284 ms' : '执行中 ···'
})
</script>

<template>
  <RuntimePanelShell :icon="Plug" title="MCP 工具连接" badge="已连接" badge-dot>
    <div class="flex min-h-0 flex-1 flex-col gap-3 xl:flex-row">
      <div class="relative min-w-0 flex-1">
        <RuntimeToolsGraph :call="activeCall" :dot="dot" />
      </div>

      <div class="shrink-0 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-3 xl:w-[240px] xl:p-4">
        <div class="flex items-center justify-between gap-2">
          <span class="shrink-0 text-[11px] text-muted">当前工具</span>
          <span
            class="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors duration-300"
            :class="toolBadgeClass"
          >
            <CircleCheck v-if="callDone" class="size-3" aria-hidden="true" />
            <span v-else class="size-1 rounded-full bg-current" aria-hidden="true"></span>
            {{ toolBadgeText }}
          </span>
        </div>
        <div class="mt-1.5 flex items-center gap-2">
          <p class="truncate font-mono text-sm font-bold text-primary">{{ currentCall.name }}</p>
          <span class="flex shrink-0 items-center gap-1 text-[10px] text-emerald-400">
            <span class="size-1 rounded-full bg-emerald-400" aria-hidden="true"></span>
            已连接
          </span>
        </div>
        <p class="mt-0.5 truncate text-xs leading-4 text-highlighted">{{ currentCall.description }}</p>
        <div class="mt-3 hidden gap-2 xl:grid">
          <div v-for="param in currentCall.params" :key="param.label" class="flex justify-between gap-2 text-xs leading-4">
            <span class="truncate text-muted">{{ param.label }}</span>
            <span class="shrink-0 font-mono text-highlighted">{{ param.value }}</span>
          </div>
          <div class="flex justify-between gap-2 text-xs leading-4">
            <span class="truncate text-muted">完成状态</span>
            <span class="shrink-0 font-mono text-highlighted">✓ {{ currentCall.done }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 rounded-xl border border-dt-line-strong/60 bg-dt-bg p-2.5 xl:mt-4">
      <div class="flex items-center gap-1.5">
        <Terminal class="size-3.5 shrink-0 text-muted" aria-hidden="true" />
        <p class="truncate text-xs font-semibold text-highlighted">调用示例</p>
        <p
          class="ml-auto shrink-0 text-[11px] leading-4 transition-colors duration-300"
          :class="callDone ? 'text-primary' : activeCall !== null ? 'text-primary' : 'text-muted'"
        >
          {{ terminalText }}
        </p>
      </div>
      <p class="mt-1 truncate font-mono text-xs leading-4 text-muted">{{ currentCall.code }}</p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="truncate text-sm text-muted"
          title="Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。"
        >
          Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
