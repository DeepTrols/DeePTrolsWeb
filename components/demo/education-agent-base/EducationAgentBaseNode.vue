<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

type ChipTone = 'violet' | 'blue' | 'pink' | 'emerald' | 'cyan'

interface ResourceNodeData {
  kind: 'resource'
  label: string
  icon: Component
  tone: ChipTone
}

interface GatewayNodeData {
  kind: 'gateway'
  label: string
  logo: string
  items: Array<{ label: string, icon: Component }>
}

// 中央运行底座（400×360）：2×2 能力象限为本 flow 的差异化母题
interface RuntimeNodeData {
  kind: 'runtime'
  label: string
  logo: string
  caption: string
  quadrants: Array<{ label: string, caption: string, icon: Component }>
}

interface AgentNodeData {
  kind: 'agent'
  label: string
  badge: string
  sublabel: string
  icon: Component
  tone: ChipTone
}

interface StageNodeData {
  kind: 'stage'
  label: string
}

defineProps<{
  data: ResourceNodeData | GatewayNodeData | RuntimeNodeData | AgentNodeData | StageNodeData
}>()

const toneClasses = {
  violet: 'border-violet-500/25 shadow-violet-500/15 text-violet-500',
  blue: 'border-blue-500/25 shadow-blue-500/15 text-blue-500',
  pink: 'border-pink-500/25 shadow-pink-500/15 text-pink-500',
  emerald: 'border-emerald-500/25 shadow-emerald-500/15 text-emerald-500',
  cyan: 'border-cyan-500/25 shadow-cyan-500/15 text-cyan-500',
}
const handleClass = '!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'
</script>

<template>
  <div v-if="data.kind === 'resource'" :class="['flex h-12 w-[220px] items-center gap-3 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <component :is="data.icon" class="size-5 shrink-0" aria-hidden="true" />
    <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'gateway'" class="relative h-[420px] w-[240px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-4 py-3.5 text-left shadow-lg">
      <div class="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 py-1 pl-2 pr-3">
        <img :src="data.logo" alt="" class="size-4 object-contain" loading="lazy">
        <span class="whitespace-nowrap text-[11px] font-semibold text-primary">{{ data.label }}</span>
      </div>
      <div class="mt-3.5 flex flex-1 flex-col justify-center gap-2.5">
        <div v-for="item in data.items" :key="item.label" class="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2">
          <component :is="item.icon" class="size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
          <span class="whitespace-nowrap text-[10px] font-semibold text-dt-text-highlighted">{{ item.label }}</span>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>

  <div v-else-if="data.kind === 'runtime'" class="relative h-[360px] w-[400px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-4 py-3.5 text-left shadow-lg">
      <div class="flex items-center justify-between gap-3">
        <div class="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 py-1 pl-2 pr-3">
          <img :src="data.logo" alt="" class="size-4 object-contain" loading="lazy">
          <span class="whitespace-nowrap text-[11px] font-semibold text-primary">{{ data.label }}</span>
        </div>
        <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.caption }}</span>
      </div>
      <div class="mt-3.5 grid flex-1 grid-cols-2 gap-3">
        <div v-for="quadrant in data.quadrants" :key="quadrant.label" class="flex flex-col items-center justify-center gap-1 rounded-xl border border-primary/25 bg-primary/5 px-2 py-3 text-center">
          <component :is="quadrant.icon" class="size-5 shrink-0 text-primary/70" aria-hidden="true" />
          <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ quadrant.label }}</span>
          <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ quadrant.caption }}</span>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>

  <div v-else-if="data.kind === 'agent'" :class="['relative flex h-[88px] w-[268px] items-center gap-3 rounded-xl border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <component :is="data.icon" class="size-6 shrink-0" aria-hidden="true" />
    <div class="flex min-w-0 flex-col">
      <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
      <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-muted">{{ data.sublabel }}</span>
    </div>
    <span :class="['absolute right-3 top-3 rounded-full border bg-white px-2 py-0.5 text-[10px] font-semibold', toneClasses[data.tone]]">{{ data.badge }}</span>
  </div>

  <div v-else-if="data.kind === 'stage'" class="pointer-events-none flex items-center whitespace-nowrap rounded-full border border-primary/30 bg-white px-3.5 py-1.5 shadow-md">
    <span class="text-xs font-semibold text-primary">{{ data.label }}</span>
  </div>
</template>
