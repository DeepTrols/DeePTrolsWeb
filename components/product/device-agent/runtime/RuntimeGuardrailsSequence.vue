<script setup lang="ts">
import { ArrowRight, CircleCheck, CirclePlay, FileText, LoaderCircle, ShieldCheck, UserRound } from '@lucide/vue'
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
  { name: '安全校验', icon: ShieldCheck, start: GR_ACTION_MS, done: GR_CHECK_DONE_MS, activeText: '校验中', doneText: '已通过' },
  { name: '人工审批', icon: UserRound, start: GR_APPROVAL_MS, done: GR_APPROVED_MS, activeText: '审批中', doneText: '已批准' },
  { name: '指令执行', icon: CirclePlay, start: GR_EXEC_MS, done: GR_EXEC_DONE_MS, activeText: '执行中', doneText: '已下发' },
  { name: '结果验证', icon: FileText, start: GR_EXEC_DONE_MS, done: GR_DONE_MS, activeText: '验证中', doneText: '验证通过' },
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
    return 'text-emerald-400'
  }
  if (state === 'active') {
    return 'text-primary'
  }
  return 'text-muted'
}

function stepStatusText(step: (typeof steps)[number]): string {
  const state = stepState(step)
  if (state === 'done') {
    return step.doneText
  }
  if (state === 'active') {
    return step.activeText
  }
  return '等待中'
}
</script>

<template>
  <div class="mt-auto flex items-center gap-1.5 pt-2 xl:gap-2 xl:pt-3">
    <template v-for="(step, index) in steps" :key="step.name">
      <div class="flex min-w-0 flex-1 items-center gap-1.5">
        <LoaderCircle
          v-if="stepState(step) === 'active'"
          class="size-3.5 shrink-0 animate-spin text-primary"
          aria-hidden="true"
        />
        <CircleCheck
          v-else-if="stepState(step) === 'done'"
          class="size-3.5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />
        <component
          :is="step.icon"
          v-else
          class="size-3.5 shrink-0 text-muted"
          aria-hidden="true"
        />
        <span
          class="truncate text-xs font-medium transition-colors duration-300"
          :class="stepClass(stepState(step))"
        >
          {{ step.name }}
        </span>
        <span
          class="ml-auto hidden shrink-0 text-[10px] leading-3 transition-colors duration-300 xl:inline"
          :class="stepClass(stepState(step))"
        >
          {{ stepStatusText(step) }}
        </span>
      </div>
      <ArrowRight
        v-if="index < steps.length - 1"
        class="size-3.5 shrink-0 transition-colors duration-300"
        :class="elapsed >= steps[index + 1]!.start ? 'text-primary' : 'text-muted'"
        aria-hidden="true"
      />
    </template>
  </div>
</template>
