<script setup lang="ts">
import { CircleCheck, Plug } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const JUDGE_MS = 500
const CALL1_START_MS = 1800
const CALL1_PARAMS_MS = 2000
const CALL1_DONE_MS = 2600
const CALL1_RESULT_MS = 2800
const CALL2_START_MS = 4000
const CALL2_PARAMS_MS = 4200
const CALL2_DONE_MS = 4800
const CALL2_RESULT_MS = 5000
const NEXT_MS = 6200
const ROW_STAGGER_MS = 150

const tools = [
  { name: 'device.get_status', group: '设备工具' },
  { name: 'device.read_property', group: '设备工具' },
  { name: 'device.execute_command', group: '设备工具' },
  { name: 'timeseries.query', group: '数据工具' },
  { name: 'knowledge.search', group: '数据工具' },
  { name: 'workorder.create', group: '业务工具' },
]

const call1Params = [
  { label: '设备', value: 'ESS-01' },
  { label: '指标', value: '最高电芯温度' },
  { label: '时间范围', value: '近 7 天' },
]

const call1Results = ['基线 42.6°C', '当前 61.8°C', '偏离 +45.1%']
const call2Results = ['热管理异常', '电芯一致性异常', '充电倍率过高']

const { elapsed } = useRuntimeTimeline(7200)

const judgeOn = computed(() => elapsed.value >= JUDGE_MS)
const judgeActive = computed(() => elapsed.value >= JUDGE_MS && elapsed.value < CALL1_START_MS)
const call1Active = computed(() => elapsed.value >= CALL1_START_MS && elapsed.value < CALL2_START_MS)
const call1On = computed(() => elapsed.value >= CALL1_START_MS)
const call1Done = computed(() => elapsed.value >= CALL1_DONE_MS)
const call2Active = computed(() => elapsed.value >= CALL2_START_MS && elapsed.value < NEXT_MS)
const call2On = computed(() => elapsed.value >= CALL2_START_MS)
const call2Done = computed(() => elapsed.value >= CALL2_DONE_MS)
const nextOn = computed(() => elapsed.value >= NEXT_MS)

function revealed(atMs: number): string {
  return elapsed.value >= atMs ? 'opacity-100' : 'opacity-0'
}

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
  <RuntimePanelShell :icon="Plug" title="MCP 工具连接" badge="6 个可用" badge-dot>
    <div
      class="rounded-lg border p-2.5 transition-all duration-300"
      :class="[
        judgeOn ? 'opacity-100' : 'opacity-0',
        judgeActive ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20',
      ]"
    >
      <p class="text-xs font-semibold text-highlighted">Agent 判断</p>
      <p class="mt-0.5 text-[11px] leading-4 text-muted">
        检测到 ESS-01 电芯温度持续异常，需要进一步确认历史趋势、SOC、充电功率与设备运行状态。
      </p>
    </div>

    <div class="mt-2 grid grid-cols-2 gap-2">
      <div
        class="min-w-0 rounded-lg border p-2 transition-all duration-300"
        :class="[
          call1On ? 'opacity-100' : 'opacity-0',
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
          <div
            v-for="(param, index) in call1Params"
            :key="param.label"
            class="flex justify-between gap-1.5 transition-opacity duration-300"
            :class="revealed(CALL1_PARAMS_MS + index * ROW_STAGGER_MS)"
          >
            <span class="truncate text-muted">{{ param.label }}</span>
            <span class="shrink-0 font-mono text-highlighted">{{ param.value }}</span>
          </div>
        </div>
        <div class="mt-1 flex flex-wrap gap-1">
          <span
            v-for="(result, index) in call1Results"
            :key="result"
            class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary transition-opacity duration-300"
            :class="revealed(CALL1_RESULT_MS + index * ROW_STAGGER_MS)"
          >
            {{ result }}
          </span>
        </div>
      </div>

      <div
        class="min-w-0 rounded-lg border p-2 transition-all duration-300"
        :class="[
          call2On ? 'opacity-100' : 'opacity-0',
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
          <div class="flex justify-between gap-1.5 transition-opacity duration-300" :class="revealed(CALL2_PARAMS_MS)">
            <span class="shrink-0 text-muted">查询</span>
            <span class="truncate font-mono text-highlighted">电芯持续高温原因</span>
          </div>
        </div>
        <div class="mt-1">
          <p
            class="text-[11px] leading-4 text-muted transition-opacity duration-300"
            :class="revealed(CALL2_RESULT_MS)"
          >
            找到 3 条相关知识
          </p>
          <div class="mt-0.5 flex flex-wrap gap-1">
            <span
              v-for="(result, index) in call2Results"
              :key="result"
              class="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] leading-4 text-primary transition-opacity duration-300"
              :class="revealed(CALL2_RESULT_MS + (index + 1) * ROW_STAGGER_MS)"
            >
              {{ result }}
            </span>
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

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="max-w-xl text-sm text-muted line-clamp-2"
          title="Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。"
        >
          Agent 通过 MCP 协议连接设备、数据与业务工具，在消息流中完成读取、查询、检索与执行。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
