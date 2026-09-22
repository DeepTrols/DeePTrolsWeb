<script setup lang="ts">
import { Check, Circle, FileImage, FileText, LoaderCircle, Sheet, Table2 } from '@lucide/vue'
import { computed } from 'vue'
import { useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const { elapsed } = useRuntimeTimeline(6200)
const files = [
  { label: 'PDF', icon: FileText },
  { label: 'Word', icon: FileText },
  { label: 'Image', icon: FileImage },
  { label: 'HTML', icon: Sheet },
]
const steps = ['版面分析', '内容识别', '表格还原', '结构输出']
const activeStep = computed(() => Math.min(3, Math.max(0, Math.floor((elapsed.value - 500) / 1300))))
const finished = computed(() => elapsed.value >= 5500)
</script>

<template>
  <div class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_0_16px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_0_28px_rgba(30,68,224,0.22)] lg:min-h-[360px]" aria-label="多模态文档精准解析动画">
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
          <p class="text-sm font-semibold text-highlighted">多模态解析引擎</p>
          <p class="mt-1 text-xs text-muted">复杂版面与跨页表格精准还原</p>
        </div>
        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">10+ 格式</span>
      </div>

      <div class="mt-4 grid grid-cols-4 gap-2">
        <div v-for="(file, index) in files" :key="file.label" class="flex min-w-0 flex-col items-center gap-1.5 rounded-lg border px-1 py-2 transition-colors" :class="elapsed >= 500 + index * 250 ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line'">
          <component :is="file.icon" class="size-4" :class="elapsed >= 500 + index * 250 ? 'text-emerald-600' : 'text-primary'" aria-hidden="true" />
          <span class="truncate text-[10px] font-medium text-default">{{ file.label }}</span>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div class="rounded-lg border border-dt-line p-2.5">
          <p class="text-[10px] font-medium text-muted">原始表格</p>
          <div class="mt-2 grid grid-cols-3 gap-px overflow-hidden rounded bg-dt-line">
            <span v-for="cell in 9" :key="cell" class="h-3 bg-dt-bg-soft/50"></span>
          </div>
        </div>
        <LoaderCircle v-if="!finished" class="size-5 animate-spin text-primary" aria-hidden="true" />
        <Check v-else class="size-5 text-emerald-600" aria-hidden="true" />
        <div class="rounded-lg border p-2.5" :class="finished ? 'border-emerald-200 bg-emerald-50/60' : 'border-dt-line'">
          <div class="flex items-center gap-1.5">
            <Table2 class="size-3.5 text-primary" aria-hidden="true" />
            <p class="text-[10px] font-medium text-muted">Markdown / JSON</p>
          </div>
          <p class="mt-2 font-mono text-[10px] leading-4 text-default">table.rows: 128<br>merge_cells: 6</p>
        </div>
      </div>

      <div class="mt-auto grid grid-cols-4 gap-1 pt-4">
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
