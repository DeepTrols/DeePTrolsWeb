<script setup lang="ts">
import { ArrowRight, Check, Circle, Database, GitBranch, LoaderCircle, ShieldCheck, Tags, Workflow } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['血缘追踪', '质量监测', '版本管理', '生命周期']
const lineage = [
  { label: '源表 dwd_customer', icon: Database },
  { label: '加工任务', icon: Workflow },
  { label: '业务标签', icon: Tags },
]
const versions = ['v1.0', 'v1.1', 'v1.2']
// 血缘链路逐节点点亮
const lineageCount = computed(() => {
  if (elapsed.value < 600) return 0
  return Math.min(3, Math.floor((elapsed.value - 600) / 800) + 1)
})
// 版本依次生效
const versionIndex = computed(() => Math.min(2, Math.max(0, Math.floor((elapsed.value - 2400) / 900))))
// 质量分从 72 逐步提升到 98
const qualityScore = computed(() => Math.min(98, 72 + Math.floor(Math.max(0, elapsed.value - 800) / 160)))
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="标签治理动画">
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
          <p class="text-sm font-semibold text-highlighted">标签治理看板</p>
          <p class="mt-1 text-xs text-muted">血缘 · 版本 · 质量统一治理</p>
        </div>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" :class="finished ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'">质量分 {{ qualityScore }}</span>
      </div>

      <div class="mt-4 rounded-lg border border-dt-line px-3 py-2.5">
        <div class="flex items-center gap-1.5 text-[10px] font-medium text-muted">
          <GitBranch class="size-3.5 text-primary/70" aria-hidden="true" />
          标签血缘
        </div>
        <div class="mt-2 flex items-center gap-1">
          <template v-for="(node, index) in lineage" :key="node.label">
            <div
              class="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border px-2 py-1.5 transition-colors duration-300"
              :class="index < lineageCount ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line bg-white'"
            >
              <component :is="node.icon" class="size-3.5 shrink-0" :class="index < lineageCount ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
              <span class="truncate text-[10px] font-semibold text-default">{{ node.label }}</span>
            </div>
            <ArrowRight v-if="index < 2" class="size-3.5 shrink-0" :class="index + 1 < lineageCount ? 'text-emerald-500' : 'text-dt-text-muted/50'" aria-hidden="true" />
          </template>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2">
        <ShieldCheck class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span class="text-xs font-medium text-default">版本记录</span>
        <div class="flex gap-1.5">
          <span
            v-for="(version, index) in versions"
            :key="version"
            class="rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300"
            :class="index < versionIndex ? 'border-emerald-300 bg-emerald-50/60 text-emerald-700' : index === versionIndex ? 'border-primary/40 bg-primary/10 text-primary' : 'border-dt-line text-muted'"
          >{{ version }}</span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签来源清晰、口径一致、状态可控' : '正在监测质量、热度与使用状态' }}</span>
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
