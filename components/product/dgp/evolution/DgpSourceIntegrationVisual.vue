<script setup lang="ts">
import { Building2, Check, Circle, Database, FileSpreadsheet, LoaderCircle, RadioTower, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6000)
const steps = ['连接检测', 'Schema 识别', '字段映射', '数据接入']
const sources = [
  { label: 'MySQL', icon: Database },
  { label: 'ERP', icon: Building2 },
  { label: 'Excel', icon: FileSpreadsheet },
  { label: 'Kafka', icon: RadioTower },
]
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1200))))
const conflict = computed(() => elapsed.value >= 2600 && elapsed.value < 3800)
const finished = computed(() => elapsed.value >= 5300)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-dt-line bg-white p-4 shadow-sm lg:min-h-[340px] lg:p-5" aria-label="多源数据统一接入动画">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-highlighted">多源数据接入</p>
        <p class="mt-1 text-xs text-muted">连接状态实时检测</p>
      </div>
      <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">4 个数据源</span>
    </div>

    <div class="relative mt-4 grid grid-cols-4 gap-2">
      <div class="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-dt-line" aria-hidden="true"></div>
      <span class="absolute left-[12.5%] top-[18px] size-1.5 animate-ping rounded-full bg-primary" aria-hidden="true"></span>
      <span class="absolute right-[12.5%] top-[18px] size-1.5 animate-ping rounded-full bg-primary [animation-delay:600ms]" aria-hidden="true"></span>
      <div
        v-for="(source, index) in sources"
        :key="source.label"
        class="relative z-10 flex min-w-0 flex-col items-center gap-2 rounded-lg border bg-white px-1 py-2.5 transition-colors duration-300"
        :class="conflict && index === 2 ? 'border-amber-400 bg-amber-50' : elapsed >= 700 + index * 300 ? 'border-emerald-300 bg-emerald-50/60' : 'border-dt-line'"
      >
        <component :is="source.icon" class="size-4" :class="conflict && index === 2 ? 'text-amber-600' : 'text-primary'" aria-hidden="true" />
        <span class="truncate text-[11px] font-medium text-default">{{ source.label }}</span>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-2 rounded-lg border border-dt-line bg-dt-bg-soft/40 px-3 py-2">
      <TriangleAlert v-if="conflict" class="size-4 shrink-0 text-amber-600" aria-hidden="true" />
      <LoaderCircle v-else-if="!finished" class="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
      <Check v-else class="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
      <span class="min-w-0 flex-1 truncate text-xs text-default">{{ conflict ? '字段类型冲突 · 正在自动映射' : finished ? '统一数据源目录已生成' : '正在同步数据源元信息' }}</span>
      <span class="text-xs font-semibold" :class="finished ? 'text-emerald-600' : 'text-primary'">{{ finished ? '100%' : `${Math.min(92, Math.round(elapsed / 58))}%` }}</span>
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
</template>
