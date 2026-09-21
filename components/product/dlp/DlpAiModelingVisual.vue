<script setup lang="ts">
import { BrainCircuit, Check, Circle, CodeXml, Database, FileCheck2, LoaderCircle, Sparkles, Tags } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6400)

const steps = ['需求理解', '模型生成', '规则校验', '模型发布']
const generatedItems = [
  { label: '标签定义', value: 'high_value_customer', icon: Tags, readyAt: 2200 },
  { label: '对象模型', value: 'CustomerProfile', icon: Database, readyAt: 3200 },
  { label: '加工规则', value: 'amount_90d ≥ 10000', icon: CodeXml, readyAt: 4200 },
]

const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1350))))
const generatedCount = computed(() => generatedItems.filter(item => elapsed.value >= item.readyAt).length)
const finished = computed(() => elapsed.value >= 5700)
</script>

<template>
  <div class="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-sm lg:min-h-[460px]" aria-label="AI 辅助建标动画">
    <div class="flex items-center border-b border-muted px-4 py-3">
      <div class="flex gap-1.5">
        <div class="size-3 rounded-full bg-red-500/70"></div>
        <div class="size-3 rounded-full bg-yellow-500/70"></div>
        <div class="size-3 rounded-full bg-green-500/70"></div>
      </div>
    </div>

    <div class="flex min-h-0 flex-1 flex-col p-4 lg:p-5">
      <div class="flex items-start gap-3 rounded-xl border border-dt-line bg-dt-bg-soft/40 p-3">
        <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sparkles class="size-4" aria-hidden="true" />
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-3">
            <p class="text-xs font-semibold text-highlighted">业务需求</p>
            <span class="text-[10px] font-medium" :class="elapsed < 1500 ? 'text-primary' : 'text-emerald-600'">{{ elapsed < 1500 ? 'AI 理解中' : '语义已识别' }}</span>
          </div>
          <p class="mt-1 text-xs leading-5 text-default">识别近 90 天累计消费超过 1 万元的高价值客户，用于精准运营。</p>
        </div>
      </div>

      <div class="mt-3 grid min-h-0 flex-1 gap-3 sm:grid-cols-[0.8fr_1.2fr]">
        <div class="rounded-xl border border-dt-line p-3">
          <div class="flex items-center gap-2">
            <BrainCircuit class="size-4 text-primary" aria-hidden="true" />
            <p class="text-xs font-semibold text-highlighted">AI 语义理解</p>
          </div>
          <div class="mt-3 space-y-2">
            <div v-for="(item, index) in ['对象：客户', '时间范围：近 90 天', '条件：消费金额 ≥ 10000']" :key="item" class="flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors" :class="elapsed >= 700 + index * 350 ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line text-muted'">
              <Check v-if="elapsed >= 700 + index * 350" class="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              <LoaderCircle v-else-if="index === 0" class="size-3.5 shrink-0 animate-spin text-primary" aria-hidden="true" />
              <Circle v-else class="size-2.5 shrink-0 text-dt-text-muted" aria-hidden="true" />
              <span class="truncate text-[11px] font-medium text-default">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-dt-line p-3">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <FileCheck2 class="size-4 text-primary" aria-hidden="true" />
              <p class="text-xs font-semibold text-highlighted">智能建模结果</p>
            </div>
            <span class="text-[10px] font-medium text-muted">{{ generatedCount }}/3</span>
          </div>
          <div class="mt-3 space-y-2">
            <div v-for="item in generatedItems" :key="item.label" class="flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors" :class="elapsed >= item.readyAt ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line bg-white'">
              <component :is="item.icon" class="size-3.5 shrink-0" :class="elapsed >= item.readyAt ? 'text-emerald-600' : 'text-dt-text-muted'" aria-hidden="true" />
              <div class="min-w-0 flex-1">
                <p class="text-[10px] text-muted">{{ item.label }}</p>
                <p class="truncate font-mono text-[11px] font-semibold text-default">{{ item.value }}</p>
              </div>
              <Check v-if="elapsed >= item.readyAt" class="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              <Circle v-else class="size-2.5 shrink-0 text-dt-text-muted" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 rounded-lg border border-dt-line px-3 py-2">
        <LoaderCircle v-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span class="min-w-0 flex-1 truncate text-xs text-default">{{ finished ? '标签模型校验通过，已发布至标签目录' : '正在生成标准化标签模型与加工规则' }}</span>
      </div>

      <div class="mt-3 grid grid-cols-4 gap-1">
        <div v-for="(step, index) in steps" :key="step" class="relative flex min-w-0 flex-col items-center gap-1.5 text-center">
          <div v-if="index < 3" class="absolute left-1/2 top-2.5 h-px w-full bg-dt-line" aria-hidden="true"></div>
          <span class="relative z-10 grid size-5 place-items-center rounded-full border bg-white" :class="index < activeStep || finished ? 'border-emerald-500 bg-emerald-500 text-white' : index === activeStep ? 'border-primary text-primary' : 'border-dt-line text-dt-text-muted'">
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
