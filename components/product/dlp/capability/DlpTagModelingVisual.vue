<script setup lang="ts">
import { Check, Circle, FolderTree, LoaderCircle, PencilRuler, Tags } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['目录规划', '口径定义', '规范校验', '模型发布']
const models = [
  { label: 'customer/visit_count', type: '基础标签', icon: Tags },
  { label: 'customer/order_amount', type: '规则标签', icon: PencilRuler },
  { label: 'customer/high_value_flag', type: '组合标签', icon: FolderTree },
]
const doneCount = computed(() => {
  if (elapsed.value < 600) return 0
  return Math.min(3, Math.floor((elapsed.value - 600) / 1000) + 1)
})
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="标签建模动画">
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
          <p class="text-sm font-semibold text-highlighted">标签模型设计</p>
          <p class="mt-1 text-xs text-muted">统一目录 · 命名规范 · 业务口径</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">统一命名规范</span>
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <div
          v-for="(model, index) in models"
          :key="model.label"
          class="flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300"
          :class="index < doneCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
        >
          <component :is="model.icon" class="size-4 shrink-0" :class="index < doneCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="min-w-0 flex-1 truncate text-xs font-semibold text-default">{{ model.label }}</span>
          <span class="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary/80">{{ model.type }}</span>
          <Check v-if="index < doneCount" class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
          <LoaderCircle v-else class="size-4 shrink-0 text-dt-text-muted/50" aria-hidden="true" />
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签模型已发布，全企业口径一致' : `正在沉淀标签模型 ${doneCount}/3` }}</span>
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
