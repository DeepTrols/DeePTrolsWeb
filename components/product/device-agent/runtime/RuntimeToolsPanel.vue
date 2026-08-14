<script setup lang="ts">
import { CircleCheck, Plug } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const JUDGE_MS = 600
const CALL1_START_MS = 1800
const CALL1_PARAMS_MS = 2400
const CALL1_DONE_MS = 3200
const CALL1_RESULT_MS = 3600
const CALL2_START_MS = 4800
const CALL2_PARAMS_MS = 5400
const CALL2_DONE_MS = 6200
const CALL2_RESULT_MS = 6600
const NEXT_MS = 7600

const tools = [
  { name: 'device.get_status', group: '设备工具' },
  { name: 'device.read_property', group: '设备工具' },
  { name: 'device.execute_command', group: '设备工具' },
  { name: 'timeseries.query', group: '数据工具' },
  { name: 'knowledge.search', group: '数据工具' },
  { name: 'workorder.create', group: '业务工具' },
]

const { elapsed } = useRuntimeTimeline(8500)

const judgeOn = computed(() => elapsed.value >= JUDGE_MS)
const call1Active = computed(() => elapsed.value >= CALL1_START_MS && elapsed.value < CALL2_START_MS)
const call1Params = computed(() => elapsed.value >= CALL1_PARAMS_MS)
const call1Done = computed(() => elapsed.value >= CALL1_DONE_MS)
const call1Result = computed(() => elapsed.value >= CALL1_RESULT_MS)
const call2Active = computed(() => elapsed.value >= CALL2_START_MS && elapsed.value < NEXT_MS)
const call2Params = computed(() => elapsed.value >= CALL2_PARAMS_MS)
const call2Done = computed(() => elapsed.value >= CALL2_DONE_MS)
const call2Result = computed(() => elapsed.value >= CALL2_RESULT_MS)
const nextOn = computed(() => elapsed.value >= NEXT_MS)

function toolHighlighted(tool: string): boolean {
  if (tool === 'timeseries.query') {
    return call1Active.value
  }
  if (tool === 'knowledge.search') {
    return call2Active.value
  }
  return false
}
</script>

<template>
  <RuntimePanelShell :icon="Plug" title="MCP 工具" badge="6 个可用">
    <div
      class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2.5 transition-opacity duration-500"
      :class="judgeOn ? 'opacity-100' : 'opacity-0'"
    >
      <p class="text-xs font-semibold text-highlighted">Agent 判断</p>
      <p class="mt-0.5 text-[11px] leading-4 text-muted">
        检测到 ESS-01 电芯温度持续异常，需要进一步确认历史趋势、SOC、充电功率与设备运行状态。
      </p>
    </div>

    <div class="mt-2 grid grid-cols-2 gap-2">
      <div
        class="min-w-0 rounded-lg border p-2 transition-all duration-500"
        :class="[
          call1Params ? 'opacity-100' : 'opacity-0',
          call1Active ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20',
        ]"
      >
        <div class="flex items-center justify-between gap-1.5">
          <span class="truncate text-xs font-semibold text-highlighted">查询历史时序</span>
          <span v-if="call1Done" class="flex shrink-0 items-center gap-1 font-mono text-[11px] text-primary">
            <CircleCheck class="size-3" aria-hidden="true" />
            284 ms
          </span>
        </div>
        <p class="mt-0.5 truncate font-mono text-[11px] text-muted">timeseries.query</p>
        <div class="mt-1 grid gap-0.5 text-[11px] leading-4">
          <div class="flex justify-between gap-1.5">
            <span class="text-muted">设备</span>
            <span class="shrink-0 font-mono text-highlighted">ESS-01</span>
          </div>
          <div class="flex justify-between gap-1.5">
            <span class="truncate text-muted">指标</span>
            <span class="shrink-0 font-mono text-highlighted">最高电芯温度</span>
          </div>
          <div class="flex justify-between gap-1.5">
            <span class="text-muted">时间范围</span>
            <span class="shrink-0 font-mono text-highlighted">近 7 天</span>
          </div>
        </div>
        <div
          class="mt-1 flex flex-wrap gap-1 transition-opacity duration-500"
          :class="call1Result ? 'opacity-100' : 'opacity-0'"
        >
          <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">基线 42.6°C</span>
          <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">当前 61.8°C</span>
          <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">偏离 +45.1%</span>
        </div>
      </div>

      <div
        class="min-w-0 rounded-lg border p-2 transition-all duration-500"
        :class="[
          call2Params ? 'opacity-100' : 'opacity-0',
          call2Active ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20',
        ]"
      >
        <div class="flex items-center justify-between gap-1.5">
          <span class="truncate text-xs font-semibold text-highlighted">查询知识库</span>
          <span v-if="call2Done" class="flex shrink-0 items-center gap-1 font-mono text-[11px] text-primary">
            <CircleCheck class="size-3" aria-hidden="true" />
            176 ms
          </span>
        </div>
        <p class="mt-0.5 truncate font-mono text-[11px] text-muted">knowledge.search</p>
        <div class="mt-1 grid gap-0.5 text-[11px] leading-4">
          <div class="flex justify-between gap-1.5">
            <span class="shrink-0 text-muted">查询</span>
            <span class="truncate font-mono text-highlighted">电芯持续高温原因</span>
          </div>
        </div>
        <div class="mt-1 transition-opacity duration-500" :class="call2Result ? 'opacity-100' : 'opacity-0'">
          <p class="text-[11px] leading-4 text-muted">找到 3 条相关知识</p>
          <div class="mt-0.5 flex flex-wrap gap-1">
            <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">热管理异常</span>
            <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">电芯一致性</span>
            <span class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary">充电倍率过高</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto grid grid-cols-2 gap-1.5 pt-2 sm:grid-cols-3">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="truncate rounded border px-2 py-1 text-center font-mono text-[11px] leading-4 transition-all duration-300"
        :class="
          toolHighlighted(tool.name)
            ? 'border-primary/40 bg-primary/10 text-primary'
            : 'border-dt-line-strong/60 bg-dt-bg-soft/20 text-muted'
        "
        :title="`${tool.group} · ${tool.name}`"
      >
        {{ tool.name }}
      </div>
    </div>

    <div
      class="mt-2 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 transition-opacity duration-500"
      :class="nextOn ? 'opacity-100' : 'opacity-0'"
    >
      <span class="shrink-0 text-[11px] text-muted">下一步动作</span>
      <span class="truncate text-xs font-semibold text-primary">创建储能运维工单</span>
    </div>
  </RuntimePanelShell>
</template>
