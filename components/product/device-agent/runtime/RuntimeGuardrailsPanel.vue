<script setup lang="ts">
import { CircleCheck, LoaderCircle, ShieldCheck, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { stageCount, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const PARAM_START_MS = 300
const PARAM_INTERVAL_MS = 150
const CHECK_START_MS = 1600
const CHECK_INTERVAL_MS = 800
const RISK_MS = 4800
const APPROVAL_MS = 5500
const APPROVE_MS = 6800
const APPROVED_MS = 7300
const EXECUTING_MS = 7600
const EXECUTION_MS = 8000
const POWER_DONE_MS = 8600
const CONFIRMED_MS = 9200

const actionParams = [
  ['设备', 'ESS-01'],
  ['指令', '降低充电功率'],
  ['当前功率', '500 kW'],
  ['目标功率', '400 kW'],
  ['调整幅度', '-20%'],
]

const guardChecks = ['权限检查', '设备范围检查', '参数校验', '安全策略检查']

const { elapsed } = useRuntimeTimeline(9800)

const visibleParams = computed(() => stageCount(elapsed.value, PARAM_START_MS, PARAM_INTERVAL_MS, actionParams.length))
const passedChecks = computed(() => stageCount(elapsed.value, CHECK_START_MS, CHECK_INTERVAL_MS, guardChecks.length))
const riskOn = computed(() => elapsed.value >= RISK_MS)
const approvalOn = computed(() => elapsed.value >= APPROVAL_MS)
const approvedPressed = computed(() => elapsed.value >= APPROVE_MS)
const approved = computed(() => elapsed.value >= APPROVED_MS)
const executing = computed(() => elapsed.value >= EXECUTING_MS)
const executionOn = computed(() => elapsed.value >= EXECUTION_MS)
const powerDone = computed(() => elapsed.value >= POWER_DONE_MS)
const confirmed = computed(() => elapsed.value >= CONFIRMED_MS)
</script>

<template>
  <RuntimePanelShell :icon="ShieldCheck" title="安全执行" badge="护栏已启用">
    <div class="grid min-h-0 flex-1 grid-cols-2 items-start gap-3">
      <div class="flex min-w-0 flex-col gap-1.5">
        <div class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2">
          <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
            <span class="text-xs font-semibold text-highlighted">待执行动作</span>
            <span class="font-mono text-[11px] text-primary">device.execute_command</span>
          </div>
          <div class="mt-1 grid gap-0.5">
            <div
              v-for="(param, index) in actionParams"
              :key="param[0]"
              class="flex items-baseline justify-between gap-1.5 text-[11px] leading-4 transition-opacity duration-300"
              :class="index < visibleParams ? 'opacity-100' : 'opacity-0'"
            >
              <span class="truncate text-muted">{{ param[0] }}</span>
              <span class="shrink-0 font-mono text-highlighted">{{ param[1] }}</span>
            </div>
          </div>
        </div>

        <div
          v-for="(check, index) in guardChecks"
          :key="check"
          class="flex items-center justify-between rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-2.5 py-1 transition-opacity duration-500"
          :class="index < passedChecks ? 'opacity-100' : 'opacity-0'"
        >
          <span class="text-xs text-muted">{{ check }}</span>
          <CircleCheck class="size-3.5 text-primary" aria-hidden="true" />
        </div>
      </div>

      <div class="flex min-w-0 flex-col gap-1.5">
        <div
          class="flex items-center gap-2 transition-opacity duration-500"
          :class="riskOn ? 'opacity-100' : 'opacity-0'"
        >
          <span class="shrink-0 text-[11px] text-muted">风险等级</span>
          <span
            class="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
          >
            <TriangleAlert class="size-3" aria-hidden="true" />
            中风险
          </span>
        </div>

        <div
          class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2 transition-opacity duration-500"
          :class="approvalOn ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-xs font-semibold text-highlighted">需要人工审批</p>
          <p class="mt-0.5 text-[11px] leading-4 text-muted">
            Device Agent 请求执行：将 ESS-01 充电功率从 500 kW 降低至 400 kW
          </p>
          <div class="mt-1.5 flex gap-2">
            <span
              class="rounded-lg border px-3 py-1 text-[11px] font-medium transition-all duration-300"
              :class="
                approvedPressed
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-dt-line-strong/60 bg-dt-bg-soft/20 text-highlighted'
              "
            >
              批准
            </span>
            <span
              class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-3 py-1 text-[11px] font-medium text-muted transition-opacity duration-300"
              :class="approvedPressed ? 'opacity-50' : 'opacity-100'"
            >
              拒绝
            </span>
          </div>
        </div>

        <div
          class="flex items-center gap-2 text-[11px] transition-opacity duration-500"
          :class="approved ? 'opacity-100' : 'opacity-0'"
        >
          <span class="font-medium text-primary">已批准</span>
          <span v-if="executing" class="flex items-center gap-1 text-muted">
            <LoaderCircle class="size-3 animate-spin text-primary" aria-hidden="true" />
            正在执行...
          </span>
        </div>

        <div
          class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2 transition-opacity duration-500"
          :class="executionOn ? 'opacity-100' : 'opacity-0'"
        >
          <p class="font-mono text-[11px] leading-4 text-muted">ESS-01 · 充电功率</p>
          <div class="mt-1 flex items-center gap-2 font-mono text-xs">
            <span class="transition-colors duration-500" :class="powerDone ? 'text-muted line-through' : 'text-highlighted'">
              500 kW
            </span>
            <span class="text-primary" aria-hidden="true">→</span>
            <span
              class="transition-opacity duration-500"
              :class="powerDone ? 'text-primary opacity-100' : 'text-muted opacity-40'"
            >
              400 kW
            </span>
          </div>
        </div>

        <div
          class="flex items-center gap-1.5 text-[11px] font-medium text-primary transition-opacity duration-500"
          :class="confirmed ? 'opacity-100' : 'opacity-0'"
        >
          <CircleCheck class="size-3.5" aria-hidden="true" />
          执行确认 · 设备状态正常
        </div>
      </div>
    </div>
  </RuntimePanelShell>
</template>
