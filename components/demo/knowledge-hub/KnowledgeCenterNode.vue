<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { DatabaseZap, Network, Search, Tags } from '@lucide/vue'
import boyaoLogo from '~/assets/images/brand/boyao-logo.svg'

defineProps<{
  data: {
    label: string
    nodes: string[]
  }
}>()
</script>

<template>
  <div class="relative h-[460px] w-[240px]">
    <div class="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl border border-dashed border-primary/20 bg-white"></div>
    <div class="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl border border-dashed border-primary/30 bg-white"></div>
    <div class="relative flex h-full flex-col rounded-2xl border border-dashed border-primary/50 bg-white px-5 py-4 text-left shadow-lg">
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-1.5 pl-2 pr-3">
        <img :src="boyaoLogo" alt="" class="size-[18px] object-contain" />
        <span class="whitespace-nowrap text-xs font-semibold text-primary">{{ data.label }}</span>
      </div>
      <div class="mt-4 flex flex-1 flex-col justify-between">
        <div class="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
          <div class="mb-2 flex items-center gap-2">
            <div class="flex gap-0.5">
              <span class="h-2.5 w-5 rounded-sm bg-primary/40"></span>
              <span class="h-2.5 w-5 rounded-sm bg-primary/30"></span>
              <span class="h-2.5 w-5 rounded-sm bg-primary/20"></span>
            </div>
            <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-highlighted">企业知识库</span>
          </div>
          <div class="flex gap-1.5">
            <span class="flex items-center gap-1 rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5">
              <DatabaseZap class="size-3 text-primary/60" aria-hidden="true" />
              <span class="whitespace-nowrap text-[9px] font-medium text-primary/70">向量索引</span>
            </span>
            <span class="flex items-center gap-1 rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5">
              <Search class="size-3 text-primary/60" aria-hidden="true" />
              <span class="whitespace-nowrap text-[9px] font-medium text-primary/70">混合检索</span>
            </span>
          </div>
        </div>
        <template v-for="(node, index) in data.nodes" :key="node">
          <div v-if="node === '......'" class="flex items-center justify-center py-0.5">
            <span class="text-xs font-bold tracking-widest text-primary/40">......</span>
          </div>
          <div v-else :class="['flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2', index === data.nodes.length - 1 && 'opacity-70']">
            <div class="flex gap-0.5">
              <span class="h-2.5 w-5 rounded-sm bg-primary/30"></span>
              <span class="h-2.5 w-5 rounded-sm bg-primary/20"></span>
              <span class="h-2.5 w-5 rounded-sm bg-primary/15"></span>
            </div>
            <component :is="index % 2 ? Tags : Network" class="size-3 text-primary/50" aria-hidden="true" />
            <span class="whitespace-nowrap text-[11px] font-medium text-dt-text-highlighted">{{ node }}</span>
          </div>
        </template>
      </div>
      <Handle id="left" type="target" :position="Position.Left" class="!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
      <Handle id="right" type="source" :position="Position.Right" class="!size-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none" />
    </div>
  </div>
</template>
