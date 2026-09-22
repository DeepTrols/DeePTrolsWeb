<script setup lang="ts">
import { Bot, Check, Circle, LoaderCircle, ShieldAlert, Target, UserRound } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['人群圈选', '画像洞察', '策略执行', '效果回流']
const scenarios = [
  { label: '用户画像', desc: '精细化运营', icon: UserRound },
  { label: '精准营销', desc: '推荐与触达', icon: Target },
  { label: '风险识别', desc: '风险分析', icon: ShieldAlert },
  { label: 'AI 模型', desc: '智能体标签数据', icon: Bot },
]
// 四个场景依次点亮
const activeCount = computed(() => {
  if (elapsed.value < 600) return 0
  return Math.min(4, Math.floor((elapsed.value - 600) / 900) + 1)
})
// 覆盖人群随场景点亮增长（万）
const audience = computed(() => Math.min(1280, Math.floor(Math.max(0, elapsed.value - 600) / 4)))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="场景应用动画">
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
          <p class="text-sm font-semibold text-highlighted">标签场景应用</p>
          <p class="mt-1 text-xs text-muted">让标签真正进入业务流程</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">覆盖人群 {{ audience }} 万</span>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <div
          v-for="(scenario, index) in scenarios"
          :key="scenario.label"
          class="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors duration-300"
          :class="index < activeCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
        >
          <component :is="scenario.icon" class="size-4 shrink-0" :class="index < activeCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <div class="flex min-w-0 flex-col">
            <span class="truncate text-xs font-semibold text-default">{{ scenario.label }}</span>
            <span class="truncate text-[10px] font-medium text-muted">{{ scenario.desc }}</span>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签已驱动 4 类业务与 AI 场景' : '高质量标签持续注入业务场景' }}</span>
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
