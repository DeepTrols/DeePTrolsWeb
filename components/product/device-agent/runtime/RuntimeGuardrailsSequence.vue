<script setup lang="ts">
import { CirclePlay, FileText, ShieldCheck, UserRound } from '@lucide/vue'
import IconBox from '~/components/common/card/IconBox.vue'
import {
  GR_ACTION_MS,
  GR_APPROVAL_MS,
  GR_APPROVED_MS,
  GR_CHECK_DONE_MS,
  GR_DONE_MS,
  GR_EXEC_DONE_MS,
  GR_EXEC_MS,
} from '~/components/product/device-agent/runtime/useGuardrailsTimeline'

const props = defineProps<{ elapsed: number }>()

type StepState = 'pending' | 'active' | 'done'

const steps = [
  { name: '安全校验', subtitle: '权限·参数·策略校验', icon: ShieldCheck, start: GR_ACTION_MS, done: GR_CHECK_DONE_MS },
  { name: '人工审批', subtitle: '人工审批确认', icon: UserRound, start: GR_APPROVAL_MS, done: GR_APPROVED_MS },
  { name: '指令执行', subtitle: '指令下发执行', icon: CirclePlay, start: GR_EXEC_MS, done: GR_EXEC_DONE_MS },
  { name: '结果验证', subtitle: '执行结果验证', icon: FileText, start: GR_EXEC_DONE_MS, done: GR_DONE_MS },
]

function stepState(step: (typeof steps)[number]): StepState {
  if (props.elapsed >= step.done) {
    return 'done'
  }
  if (props.elapsed >= step.start) {
    return 'active'
  }
  return 'pending'
}

function stepClass(state: StepState): string {
  if (state === 'done') {
    return 'border-primary/30 bg-primary/5'
  }
  if (state === 'active') {
    return 'border-primary/40 bg-primary/10 shadow-sm shadow-primary/5'
  }
  return 'border-dt-line-strong/60 bg-dt-bg-soft/20'
}

function iconTone(state: StepState): 'primary' | 'soft' {
  return state === 'pending' ? 'soft' : 'primary'
}
</script>

<template>
  <div class="mt-auto grid grid-cols-2 gap-2 pt-3 xl:grid-cols-4">
    <article
      v-for="step in steps"
      :key="step.name"
      class="flex min-w-0 items-center gap-2.5 rounded-xl border p-2.5 transition-all duration-300"
      :class="stepClass(stepState(step))"
    >
      <IconBox :icon="step.icon" :tone="iconTone(stepState(step))" class="shrink-0" />
      <div class="min-w-0">
        <h4 class="truncate text-sm font-semibold leading-5 text-highlighted">{{ step.name }}</h4>
        <p class="mt-0.5 truncate text-xs leading-4 text-muted">{{ step.subtitle }}</p>
      </div>
    </article>
  </div>
</template>
