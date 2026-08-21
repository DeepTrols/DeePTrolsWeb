<script setup lang="ts">
import {
  CircleCheck,
  Cpu,
  LoaderCircle,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  TriangleAlert,
  UserCheck,
  UserRound,
} from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import RuntimeGuardrailsSequence from '~/components/product/device-agent/runtime/RuntimeGuardrailsSequence.vue'
import {
  GR_ACTION_MS,
  GR_APPROVAL_MS,
  GR_APPROVED_MS,
  GR_DOT_A_END_MS,
  GR_DOT_B_END_MS,
  GR_EXEC_DONE_MS,
  GR_EXEC_MS,
  GR_RISK_MS,
  GR_TOTAL_MS,
  grCheckState,
  grProgress,
} from '~/components/product/device-agent/runtime/useGuardrailsTimeline'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const guardChecks = [
  { code: '01', title: '身份与权限', icon: UserCheck },
  { code: '02', title: '设备范围', icon: Cpu },
  { code: '03', title: '参数边界', icon: SlidersHorizontal },
  { code: '04', title: '运行安全策略', icon: ShieldCheck },
]

const { elapsed } = useRuntimeTimeline(GR_TOTAL_MS)

const actionOn = computed(() => elapsed.value >= GR_ACTION_MS)
const dotA = computed(() => grProgress(elapsed.value, GR_ACTION_MS, GR_DOT_A_END_MS))
const dotAOn = computed(() => elapsed.value >= GR_ACTION_MS && elapsed.value < GR_DOT_A_END_MS)
const riskOn = computed(() => elapsed.value >= GR_RISK_MS)
const dotB = computed(() => grProgress(elapsed.value, GR_RISK_MS, GR_DOT_B_END_MS))
const dotBOn = computed(() => elapsed.value >= GR_RISK_MS && elapsed.value < GR_DOT_B_END_MS)
const approvalActive = computed(() => elapsed.value >= GR_APPROVAL_MS)
const approved = computed(() => elapsed.value >= GR_APPROVED_MS)
const execOn = computed(() => elapsed.value >= GR_EXEC_MS)
const execDone = computed(() => elapsed.value >= GR_EXEC_DONE_MS)
const execDot = computed(() => grProgress(elapsed.value, GR_EXEC_MS, GR_EXEC_DONE_MS))
const execDotOn = computed(() => execOn.value && !execDone.value)

function checkStateClass(index: number): string {
  const state = grCheckState(elapsed.value, index)
  if (state === 'passed') {
    return 'text-emerald-400'
  }
  if (state === 'active') {
    return 'text-primary'
  }
  return 'text-muted'
}
</script>

<template>
  <RuntimePanelShell :icon="ShieldCheck" title="安全执行" badge="护栏已启用">
    <div
      class="grid min-h-0 flex-1 grid-cols-2 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)_auto_minmax(0,1fr)] xl:gap-4"
    >
      <div
        class="rounded-xl border p-3 transition-colors duration-300"
        :class="actionOn ? 'border-primary/30 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
      >
        <div class="flex items-center gap-1.5">
          <Terminal class="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <p class="truncate text-sm font-semibold text-highlighted">待执行动作</p>
        </div>
        <p class="mt-3 truncate font-mono text-xs leading-4 text-primary">device.command</p>
        <p class="mt-1.5 truncate text-sm font-semibold leading-5 text-highlighted">ESS-01</p>
        <p class="mt-0.5 truncate text-xs leading-4 text-muted">调整充电功率</p>
        <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line-strong/60 bg-dt-bg px-3 py-2">
          <span
            class="shrink-0 font-mono text-sm transition-colors duration-300"
            :class="execDone ? 'text-muted line-through' : 'text-highlighted'"
          >
            500 kW
          </span>
          <div class="relative h-2 min-w-0 flex-1" aria-hidden="true">
            <svg viewBox="0 0 40 8" preserveAspectRatio="none" class="absolute inset-0 h-full w-full overflow-visible">
              <line
                x1="2"
                y1="4"
                x2="34"
                y2="4"
                stroke-width="1"
                stroke-dasharray="3 4"
                stroke-linecap="round"
                class="transition-colors duration-300"
                :class="execOn ? 'stroke-primary/70' : 'stroke-primary/30'"
              />
              <path
                d="M 32 1 L 37 4 L 32 7"
                fill="none"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-colors duration-300"
                :class="execOn ? 'stroke-primary/70' : 'stroke-primary/30'"
              />
              <circle v-if="execDotOn" :cx="2 + 32 * execDot" cy="4" r="2.5" class="fill-primary" />
            </svg>
          </div>
          <span
            class="shrink-0 font-mono text-sm transition-colors duration-300"
            :class="execOn ? 'text-primary' : 'text-muted'"
          >
            420 kW
          </span>
        </div>
      </div>

      <div class="relative hidden w-5 self-stretch xl:block" aria-hidden="true">
        <svg viewBox="0 0 20 8" class="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-visible">
          <line
            x1="2"
            y1="4"
            x2="18"
            y2="4"
            stroke-width="1"
            stroke-dasharray="3 4"
            stroke-linecap="round"
            class="transition-colors duration-300"
            :class="actionOn ? 'stroke-primary/70' : 'stroke-primary/30'"
          />
          <g class="fill-primary drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]">
            <circle cx="2" cy="4" r="2.5" />
            <circle cx="18" cy="4" r="2.5" />
          </g>
          <circle v-if="dotAOn" :cx="2 + 16 * dotA" cy="4" r="2.5" class="fill-primary" />
        </svg>
      </div>

      <div
        class="rounded-xl border p-3 transition-colors duration-300"
        :class="riskOn ? 'border-primary/30 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
      >
        <div class="flex items-center gap-1.5">
          <ShieldCheck class="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <p class="truncate text-sm font-semibold text-highlighted">Guardrails 校验</p>
        </div>
        <div class="mt-2.5 grid gap-1 xl:mt-3 xl:gap-1.5">
          <div
            v-for="(check, index) in guardChecks"
            :key="check.code"
            class="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 transition-colors duration-300"
            :class="
              grCheckState(elapsed, index) === 'active'
                ? 'border-primary/40 bg-primary/5'
                : 'border-dt-line-strong/60 bg-dt-bg-soft/20'
            "
          >
            <span class="flex min-w-0 items-center gap-1.5 text-xs font-medium text-highlighted">
              <span class="shrink-0 font-mono text-muted">{{ check.code }}</span>
              <span class="truncate">{{ check.title }}</span>
            </span>
            <span class="flex shrink-0 items-center gap-1 text-[10px] leading-3" :class="checkStateClass(index)">
              <LoaderCircle
                v-if="grCheckState(elapsed, index) === 'active'"
                class="size-3 shrink-0 animate-spin"
                aria-hidden="true"
              />
              <CircleCheck
                v-else-if="grCheckState(elapsed, index) === 'passed'"
                class="size-3 shrink-0"
                aria-hidden="true"
              />
              <span v-else class="size-1.5 shrink-0 rounded-full border border-current" aria-hidden="true"></span>
            </span>
          </div>
        </div>
        <div class="mt-2.5 flex items-center gap-1.5 border-t border-dt-line-strong/40 pt-2 text-[11px] leading-4 xl:mt-3 xl:pt-2.5">
          <span class="flex shrink-0 items-center gap-1 font-medium text-amber-400">
            <TriangleAlert class="size-3 shrink-0" aria-hidden="true" />
            中风险
          </span>
          <span class="shrink-0 text-muted" aria-hidden="true">·</span>
          <span class="hidden truncate font-mono text-muted sm:inline">ALLOW_WITH_APPROVAL</span>
          <span class="hidden shrink-0 text-muted sm:inline" aria-hidden="true">·</span>
          <span class="shrink-0 font-medium text-highlighted">需人工审批</span>
        </div>
      </div>

      <div class="relative hidden w-5 self-stretch xl:block" aria-hidden="true">
        <svg viewBox="0 0 20 8" class="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-visible">
          <line
            x1="2"
            y1="4"
            x2="18"
            y2="4"
            stroke-width="1"
            stroke-dasharray="3 4"
            stroke-linecap="round"
            class="transition-colors duration-300"
            :class="riskOn ? 'stroke-primary/70' : 'stroke-primary/30'"
          />
          <g class="fill-primary drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]">
            <circle cx="2" cy="4" r="2.5" />
            <circle cx="18" cy="4" r="2.5" />
          </g>
          <circle v-if="dotBOn" :cx="2 + 16 * dotB" cy="4" r="2.5" class="fill-primary" />
        </svg>
      </div>

      <div
        class="col-span-2 rounded-xl border p-3 transition-colors duration-300 xl:col-span-1"
        :class="
          approved
            ? 'border-primary/30 bg-primary/5'
            : approvalActive
              ? 'border-primary/40 bg-primary/5'
              : 'border-dt-line-strong/60 bg-dt-bg-soft/20'
        "
      >
        <div class="flex items-center justify-between gap-2">
          <span class="flex min-w-0 items-center gap-1.5">
            <UserRound class="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span class="truncate text-sm font-semibold text-highlighted">人工审批</span>
          </span>
          <span
            class="flex shrink-0 items-center gap-1 text-[10px] font-medium transition-colors duration-300"
            :class="approved ? 'text-emerald-400' : 'text-amber-400'"
          >
            <CircleCheck v-if="approved" class="size-2.5 shrink-0" aria-hidden="true" />
            <span v-else class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true"></span>
            {{ approved ? '已批准' : '等待审批' }}
          </span>
        </div>
        <div class="mt-2.5 grid gap-1 text-xs leading-4 xl:mt-3">
          <p class="truncate font-semibold text-highlighted">ESS-01</p>
          <p class="truncate text-muted">调整充电功率</p>
          <p class="truncate font-mono text-muted">500 kW → 420 kW</p>
        </div>
        <div class="mt-2.5 flex gap-2 xl:mt-3">
          <span
            class="flex-1 rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 px-2 py-1.5 text-center text-[11px] font-medium text-muted transition-opacity duration-300"
            :class="approved ? 'opacity-50' : 'opacity-100'"
          >
            拒绝
          </span>
          <span
            class="flex-1 rounded-lg border px-2 py-1.5 text-center text-[11px] font-medium transition-colors duration-300"
            :class="
              approved
                ? 'border-primary bg-primary/20 text-primary'
                : approvalActive
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-dt-line-strong/60 bg-dt-bg-soft/20 text-highlighted'
            "
          >
            批准
          </span>
        </div>
      </div>
    </div>

    <RuntimeGuardrailsSequence :elapsed="elapsed" />

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <p
          class="truncate text-sm text-muted"
          title="Agent 通过 Guardrails 安全执行护栏，在执行前后进行多层校验，确保设备操作安全、合规、可追溯。"
        >
          Agent 通过 Guardrails 安全执行护栏，在执行前后进行多层校验，确保设备操作安全、合规、可追溯。
        </p>
      </div>
    </template>
  </RuntimePanelShell>
</template>
