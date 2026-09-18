<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'

type ChipTone = 'violet' | 'blue' | 'pink' | 'emerald' | 'cyan'

interface StageNodeData {
  kind: 'stage'
  label: string
}

interface SourceNodeData {
  kind: 'source'
  label: string
  icon: Component
  tone: ChipTone
}

interface EndpointNodeData {
  kind: 'endpoint'
  label: string
  sublabel: string
  icon: Component
  tone: ChipTone
}

interface PanelNodeData {
  kind: 'engine' | 'gateway'
  label: string
  items: Array<{ label: string, icon: Component }>
}

interface LibraryNodeData {
  kind: 'library'
  label: string
  primary: {
    label: string
    tags: Array<{ label: string, icon: Component }>
  }
  nodes: Array<{ label: string }>
  finalNode: { label: string }
}

defineProps<{
  data: StageNodeData | SourceNodeData | EndpointNodeData | PanelNodeData | LibraryNodeData
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
  <div v-if="data.kind === 'stage'" class="pointer-events-none flex items-center whitespace-nowrap rounded-full border border-primary/30 bg-white px-3.5 py-1.5 shadow-md">
    <span class="text-xs font-semibold text-primary">{{ data.label }}</span>
  </div>

  <div v-else-if="data.kind === 'source'" :class="['flex h-12 w-[220px] items-center gap-3 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <component :is="data.icon" class="size-5 shrink-0" aria-hidden="true" />
    <span class="whitespace-nowrap text-sm font-semibold text-dt-text-highlighted">{{ data.label }}</span>
    <Handle type="source" :position="Position.Right" :class="handleClass" />
  </div>

  <div v-else-if="data.kind === 'endpoint'" :class="['flex h-14 w-[220px] items-center gap-3 rounded-lg border bg-white px-4 shadow-lg', toneClasses[data.tone]]">
    <Handle type="target" :position="Position.Left" :class="handleClass" />
    <component :is="data.icon" class="size-5 shrink-0" aria-hidden="true" />
    <div class="flex min-w-0 flex-col">
      <span class="whitespace-nowrap text-xs font-semibold text-dt-text-highlighted">{{ data.label }}</span>
      <span class="whitespace-nowrap text-[10px] font-medium text-dt-text-muted">{{ data.sublabel }}</span>
    </div>
  </div>

  <div v-else-if="data.kind === 'engine' || data.kind === 'gateway'" class="relative h-[260px] w-[170px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-4 py-3 text-left shadow-lg">
      <div class="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 py-1 pl-2 pr-3">
        <img :src="boyaoLogo" alt="" class="size-4 object-contain" loading="lazy">
        <span class="whitespace-nowrap text-[11px] font-semibold text-primary">{{ data.label }}</span>
      </div>
      <div class="mt-3 flex flex-1 flex-col justify-center gap-2">
        <div v-for="item in data.items" :key="item.label" class="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2">
          <component :is="item.icon" class="size-3.5 shrink-0 text-primary/60" aria-hidden="true" />
          <span class="whitespace-nowrap text-[10px] font-semibold text-dt-text-highlighted">{{ item.label }}</span>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>

  <div v-else-if="data.kind === 'library'" class="relative h-[460px] w-[240px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-5 py-4 text-left shadow-lg">
      <div class="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 py-1.5 pl-2 pr-3">
        <img :src="boyaoLogo" alt="" class="size-[18px] object-contain" loading="lazy">
        <span class="whitespace-nowrap text-xs font-semibold text-primary">{{ data.label }}</span>
      </div>
      <div class="mt-4 flex flex-1 flex-col justify-between">
        <div class="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
          <div class="mb-2 flex items-center gap-2">
            <div class="flex gap-0.5">
              <div class="h-2.5 w-5 rounded-sm bg-primary/40"></div>
              <div class="h-2.5 w-5 rounded-sm bg-primary/30"></div>
              <div class="h-2.5 w-5 rounded-sm bg-primary/20"></div>
            </div>
            <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-highlighted">{{ data.primary.label }}</span>
          </div>
          <div class="flex gap-1.5">
            <div v-for="tag in data.primary.tags" :key="tag.label" class="flex items-center gap-1 rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5">
              <component :is="tag.icon" class="size-3 shrink-0 text-primary/60" aria-hidden="true" />
              <span class="whitespace-nowrap text-[9px] font-medium text-primary/70">{{ tag.label }}</span>
            </div>
          </div>
        </div>
        <div v-for="node in data.nodes" :key="node.label" class="flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2">
          <div class="flex gap-0.5">
            <div class="h-2.5 w-5 rounded-sm bg-primary/30"></div>
            <div class="h-2.5 w-5 rounded-sm bg-primary/20"></div>
            <div class="h-2.5 w-5 rounded-sm bg-primary/15"></div>
          </div>
          <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-highlighted">{{ node.label }}</span>
        </div>
        <div class="flex items-center justify-center py-0.5">
          <span class="text-xs font-bold tracking-widest text-primary/40">......</span>
        </div>
        <div class="flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 opacity-70">
          <div class="flex gap-0.5">
            <div class="h-2.5 w-5 rounded-sm bg-primary/30"></div>
            <div class="h-2.5 w-5 rounded-sm bg-primary/20"></div>
            <div class="h-2.5 w-5 rounded-sm bg-primary/15"></div>
          </div>
          <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-highlighted">{{ data.finalNode.label }}</span>
        </div>
      </div>
      <Handle type="target" :position="Position.Left" :class="handleClass" />
      <Handle type="source" :position="Position.Right" :class="handleClass" />
    </div>
  </div>
</template>
