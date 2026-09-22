<script setup lang="ts">
import { Check, Circle, ClipboardList, FileClock, LoaderCircle, ShieldAlert, UserRound, Users } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['工单创建', '协同分派', '状态跟踪', '审计留痕']
const assignees = [
  { label: '监管员', icon: UserRound },
  { label: '安全官', icon: ShieldAlert },
  { label: '运维组', icon: Users },
]
// 事件自动生成工单 → 角色依次接手 → 处置完成留痕
const created = computed(() => elapsed.value >= 700)
const assigneeCount = computed(() => {
  if (elapsed.value < 1800) return 0
  return Math.min(3, Math.floor((elapsed.value - 1800) / 700) + 1)
})
const resolved = computed(() => elapsed.value >= 4300)
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="智能工单闭环动画">
    <div class="flex items-center border-b border-muted px-4 py-3">
      <div class="flex gap-1.5">
        <div class="size-3 rounded-full bg-red-500/70"></div>
        <div class="size-3 rounded-full bg-yellow-500/70"></div>
        <div class="size-3 rounded-full bg-green-500/70"></div>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4 lg:p-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-highlighted">智能工单闭环</p>
          <p class="mt-1 text-xs text-muted">事件自动关联 · 全过程留痕</p>
        </div>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="resolved ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'">{{ resolved ? '已闭环' : '处理中' }}</span>
      </div>

      <div class="mt-4 rounded-lg border border-dt-line bg-dt-bg-soft/40 p-3">
        <div class="flex items-center gap-2">
          <ClipboardList class="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate font-mono text-[11px] font-semibold text-default">WO-20260921-017</span>
          <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" :class="resolved ? 'bg-emerald-500/10 text-emerald-600' : created ? 'bg-primary/10 text-primary' : 'bg-dt-bg-soft text-muted'">{{ resolved ? '已完成' : created ? '处理中' : '待创建' }}</span>
        </div>
        <p class="mt-1.5 truncate text-[10px] text-muted">关联事件：异常交易行为 · 高危</p>
        <div class="mt-2.5 flex items-center gap-1.5">
          <span
            v-for="(assignee, index) in assignees"
            :key="assignee.label"
            class="flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md border px-1.5 py-1 text-[10px] font-semibold transition-colors duration-300"
            :class="index < assigneeCount ? 'border-primary/40 bg-primary/5 text-primary' : 'border-dt-line text-muted'"
          >
            <component :is="assignee.icon" class="size-3 shrink-0" aria-hidden="true" />
            <span class="truncate">{{ assignee.label }}</span>
          </span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <FileClock v-if="!finished" class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '处置完成，全过程审计留痕可追溯' : resolved ? '工单处置完成，归档留痕中' : '多角色协同分派与状态跟踪' }}</span>
      </div>

      <div class="mt-auto grid grid-cols-4 gap-1 pt-4">
        <div v-for="(step, index) in steps" :key="step" class="relative flex min-w-0 flex-col items-center gap-1.5 text-center">
          <div v-if="index < 3" class="absolute left-1/2 top-2.5 h-px w-full bg-dt-line" aria-hidden="true"></div>
          <span class="relative z-10 grid size-5 place-items-center rounded-full border bg-white transition-colors" :class="index < activeStep || finished ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-primary text-primary' : 'border-dt-line text-dt-text-muted'">
            <Check v-if="index < activeStep || finished" class="size-3" aria-hidden="true" />
            <LoaderCircle v-else-if="index === activeStep" class="size-3 animate-spin" aria-hidden="true" />
            <Circle v-else class="size-2" aria-hidden="true" />
          </span>
          <span class="truncate text-[10px] leading-4" :class="index < activeStep || finished ? 'text-emerald-700' : index === activeStep ? 'font-medium text-primary' : 'text-muted'">{{ step }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
