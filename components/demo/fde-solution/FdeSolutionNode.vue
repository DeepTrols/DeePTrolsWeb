<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'blue' | 'cyan' | 'emerald'

interface StageNodeData {
  kind: 'stage'
  label: string
  caption: string
  icon: Component
  tone: ChipTone
  rows: Array<{ label: string, caption: string, icon: Component }>
}

// 底座面板（1640×150）：内嵌 数曜/博曜/智曜 三张 logo 产品卡，
// 四个 Top source handle 按百分比对齐上排四段面板中心，向上输出支撑边
interface FoundationNodeData {
  kind: 'foundation'
  label: string
  caption: string
  products: Array<{ name: string, description: string, logo: string }>
}

defineProps<{
  data: StageNodeData | FoundationNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  cyan: 'border-cyan-500/25 shadow-cyan-500/15 text-cyan-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'stage'" class="flex h-[250px] w-[320px] flex-col rounded-2xl border border-primary/40 bg-white px-4 py-3.5 text-left shadow-lg">
    <div class="flex items-center gap-3">
      <div :class="['flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white shadow-md', toneClasses[data.tone]]">
        <component :is="data.icon" class="size-4" aria-hidden="true" />
      </div>
      <div class="flex min-w-0 flex-col">
        <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
        <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.caption }}</span>
      </div>
    </div>
    <div class="mt-3 flex flex-1 flex-col justify-center gap-2">
      <div v-for="row in data.rows" :key="row.label" class="flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2">
        <component :is="row.icon" class="size-4 shrink-0 text-primary/60" aria-hidden="true" />
        <div class="flex min-w-0 flex-col">
          <span class="whitespace-nowrap text-[11px] font-semibold text-dt-text-highlighted">{{ row.label }}</span>
          <span class="whitespace-nowrap text-[9px] font-medium text-dt-text-muted">{{ row.caption }}</span>
        </div>
      </div>
    </div>
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <Handle type="source" :position="Position.Right" :class="handleClass" />
    <Handle id="support" type="target" :position="Position.Bottom" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'foundation'" class="relative h-[150px] w-[1640px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-5 py-3.5 text-left shadow-lg">
      <div class="flex items-center gap-3">
        <span class="inline-flex whitespace-nowrap rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{{ data.label }}</span>
        <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.caption }}</span>
      </div>
      <div class="mt-3 flex flex-1 items-stretch gap-4">
        <div v-for="product in data.products" :key="product.name" class="flex flex-1 items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5">
          <img :src="product.logo" alt="" class="size-8 shrink-0 object-contain" loading="lazy">
          <div class="flex min-w-0 flex-col">
            <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ product.name }}</span>
            <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ product.description }}</span>
          </div>
        </div>
      </div>
      <Handle id="support-1" type="source" :position="Position.Top" :class="[handleClass, '!left-[9.76%]']" />
      <Handle id="support-2" type="source" :position="Position.Top" :class="[handleClass, '!left-[36.59%]']" />
      <Handle id="support-3" type="source" :position="Position.Top" :class="[handleClass, '!left-[63.41%]']" />
      <Handle id="support-4" type="source" :position="Position.Top" :class="[handleClass, '!left-[90.24%]']" />
    </div>
  </div>
</template>
