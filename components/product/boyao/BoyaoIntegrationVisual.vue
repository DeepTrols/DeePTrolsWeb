<script setup lang="ts">
import { ChevronsRight, Database, Files, Gauge, Share2, Sparkles } from '@lucide/vue'
import IsoCube from '~/components/common/IsoCube.vue'
import { boyaoLogo } from '~/data/boyao'
import type { Component } from 'vue'

interface DestNode {
  title: string
  icon: Component
  iconClass: string
  delay: string
}

const destNodes: DestNode[] = [
  {
    title: '知识库',
    icon: Database,
    iconClass: 'text-violet-500',
    delay: '[animation-delay:0.3s]',
  },
  {
    title: '知识图谱',
    icon: Share2,
    iconClass: 'text-blue-500',
    delay: '[animation-delay:0.5s]',
  },
  {
    title: '知识应用',
    icon: Sparkles,
    iconClass: 'text-cyan-500',
    delay: '[animation-delay:0.7s]',
  },
]
</script>

<template>
  <div class="relative flex h-[280px] w-full select-none items-center justify-center">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-primary/6 via-violet-500/5 to-blue-500/6 blur-3xl"
      ></div>
    </div>

    <div class="relative flex items-center gap-8">
      <div class="flex animate-value-flow flex-col items-center gap-2 motion-reduce:animate-none">
        <div class="flex size-12 items-center justify-center rounded-2xl border border-default bg-default shadow-sm">
          <Files class="size-6 text-muted" aria-hidden="true" />
        </div>
        <span class="text-[10px] font-medium whitespace-nowrap text-dimmed">非结构化数据</span>
      </div>

      <ChevronsRight class="size-4 text-primary/40" aria-hidden="true" />

      <div class="flex animate-value-flow-hub flex-col items-center motion-reduce:animate-none">
        <IsoCube size="sm">
          <img :src="boyaoLogo" alt="" class="size-8" loading="lazy" />
        </IsoCube>
        <div class="mt-4 text-center">
          <div class="text-xs font-semibold whitespace-nowrap text-highlighted">博曜·企业级知识管理平台</div>
          <div class="text-[10px] text-muted">解析 · 抽取 · 建模</div>
        </div>
      </div>

      <ChevronsRight class="size-4 text-primary/40" aria-hidden="true" />

      <div class="flex flex-col gap-2.5">
        <div
          v-for="node in destNodes"
          :key="node.title"
          class="flex animate-value-flow items-center gap-2 rounded-xl border border-default bg-default px-3.5 py-2 shadow-sm motion-reduce:animate-none"
          :class="node.delay"
        >
          <component :is="node.icon" class="size-4" :class="node.iconClass" aria-hidden="true" />
          <span class="text-[10px] font-medium text-muted">{{ node.title }}</span>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-primary/40 bg-default px-4 py-2 backdrop-blur-sm"
    >
      <Gauge class="size-4 text-primary" aria-hidden="true" />
      <div class="text-sm font-bold text-primary">10倍+</div>
      <div class="h-3.5 w-px bg-default"></div>
      <div class="text-[11px] font-medium text-muted">可用知识源规模</div>
    </div>
  </div>
</template>
