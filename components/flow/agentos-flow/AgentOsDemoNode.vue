<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { Component } from 'vue'

interface DemoItem {
  label: string
  subtitle?: string
  icon?: Component
}

interface DemoNodeData {
  kind: 'access' | 'agent' | 'platform' | 'side' | 'layer' | 'task'
  title?: string
  subtitle?: string
  badge?: string
  tone?: 'cyan' | 'violet' | 'teal'
  columns?: 5 | 6 | 9
  items?: DemoItem[]
  bullets?: string[]
  sizeClass?: string
}

defineProps<{
  data: DemoNodeData
}>()

const handleClass = '!h-3 !w-3 !border-0 !bg-transparent !opacity-0'
</script>

<template>
  <div :class="['relative text-white', data.sizeClass]">
    <Handle id="top-target" type="target" :position="Position.Top" :class="handleClass" />
    <Handle id="left-target" type="target" :position="Position.Left" :class="handleClass" />
    <Handle id="right-target" type="target" :position="Position.Right" :class="handleClass" />
    <Handle id="bottom-target" type="target" :position="Position.Bottom" :class="handleClass" />
    <Handle id="top-source" type="source" :position="Position.Top" :class="handleClass" />
    <Handle id="left-source" type="source" :position="Position.Left" :class="handleClass" />
    <Handle id="right-source" type="source" :position="Position.Right" :class="handleClass" />
    <Handle id="bottom-source" type="source" :position="Position.Bottom" :class="handleClass" />

    <div
      v-if="data.kind === 'access'"
      class="relative h-full rounded-[26px] border border-cyan-300/80 bg-blue-950/55 px-12 py-4 shadow-[0_0_42px_rgba(34,211,238,0.55),inset_0_-18px_32px_rgba(6,182,212,0.3),inset_0_18px_30px_rgba(59,130,246,0.24)]"
    >
      <div class="grid grid-cols-5 gap-4">
        <div v-for="item in data.items" :key="item.label" class="flex flex-col items-center gap-2 text-center">
          <component :is="item.icon" class="size-8 text-cyan-100 drop-shadow-[0_0_10px_rgba(125,211,252,0.9)]" aria-hidden="true" />
          <span class="text-[19px] font-semibold leading-6 tracking-wide">{{ item.label }}</span>
        </div>
      </div>
      <div class="absolute -bottom-4 left-1/2 flex h-9 -translate-x-1/2 items-center rounded-b-[20px] border border-cyan-300/80 bg-blue-900/85 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(56,189,248,0.7)]">
        {{ data.badge }}
      </div>
    </div>

    <div v-else-if="data.kind === 'agent'" class="relative flex h-full flex-col items-center justify-end">
      <div class="absolute top-0 size-32 rounded-full bg-cyan-200/35 blur-2xl"></div>
      <div class="relative flex h-24 w-28 items-center justify-center rounded-[34px] border-4 border-cyan-100 bg-slate-950 shadow-[0_0_36px_rgba(125,211,252,0.95)]">
        <span class="absolute -left-4 top-9 h-10 w-4 rounded-l-full border border-cyan-200 bg-cyan-400/70"></span>
        <span class="absolute -right-4 top-9 h-10 w-4 rounded-r-full border border-cyan-200 bg-cyan-400/70"></span>
        <span class="mr-5 size-4 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,1)]"></span>
        <span class="size-4 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,1)]"></span>
      </div>
      <div class="relative -mt-2 h-20 w-36 rounded-t-[56px] bg-gradient-to-b from-cyan-100 to-blue-300 shadow-[0_0_30px_rgba(147,197,253,0.75)]"></div>
      <div class="relative -mt-8 flex h-20 w-64 items-center justify-center rounded-[50%] border border-cyan-200 bg-blue-700/70 text-3xl font-bold shadow-[0_0_36px_rgba(34,211,238,0.85),inset_0_-20px_25px_rgba(2,132,199,0.7)]">
        AI 智能体
      </div>
    </div>

    <div
      v-else-if="data.kind === 'task'"
      class="flex h-full items-center justify-center rounded-xl border border-cyan-300/70 bg-blue-950/75 px-6 text-[18px] font-semibold leading-6 shadow-[0_0_24px_rgba(59,130,246,0.65),inset_0_0_18px_rgba(14,165,233,0.24)]"
    >
      {{ data.title }}
    </div>

    <div
      v-else-if="data.kind === 'platform'"
      class="relative h-full rounded-[30px] border border-cyan-300/90 bg-blue-950/80 px-8 pb-6 pt-8 shadow-[0_0_52px_rgba(14,165,233,0.8),inset_0_24px_60px_rgba(14,165,233,0.22),inset_0_-18px_40px_rgba(6,182,212,0.28)] [clip-path:polygon(4%_0,96%_0,100%_100%,0_100%)]"
    >
      <div class="absolute inset-x-8 top-0 h-px bg-cyan-200 shadow-[0_0_20px_rgba(125,211,252,1)]"></div>
      <h3 class="text-center text-[42px] font-bold leading-none tracking-wide">智曜 <span class="text-white">AgentOS</span></h3>
      <p class="mt-3 text-center text-2xl font-medium leading-7 text-cyan-50">{{ data.subtitle }}</p>
      <div class="mt-7 grid grid-cols-6 rounded-2xl border border-cyan-400/80 bg-blue-950/60 shadow-[inset_0_0_30px_rgba(14,165,233,0.28)]">
        <div v-for="item in data.items" :key="item.label" class="flex h-24 flex-col items-center justify-center gap-2 border-r border-cyan-400/40 last:border-r-0">
          <component :is="item.icon" class="size-9 text-cyan-200" aria-hidden="true" />
          <span class="text-[17px] font-semibold leading-6">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div
      v-else-if="data.kind === 'side'"
      :class="[
        'h-full rounded-xl border p-5 shadow-[0_0_28px_rgba(34,211,238,0.45),inset_0_0_30px_rgba(14,165,233,0.18)]',
        data.tone === 'violet' ? 'border-fuchsia-400 bg-purple-950/70' : data.tone === 'teal' ? 'border-teal-300 bg-teal-950/70' : 'border-cyan-300 bg-blue-950/70',
      ]"
    >
      <div class="flex items-center gap-3">
        <component :is="data.items?.[0]?.icon" class="size-8 text-cyan-100" aria-hidden="true" />
        <h3 class="text-2xl font-semibold leading-8">{{ data.title }}</h3>
      </div>
      <ul class="mt-4 space-y-2.5 text-[17px] leading-5 text-cyan-50">
        <li v-for="bullet in data.bullets" :key="bullet" class="flex gap-2"><span class="text-cyan-300">•</span>{{ bullet }}</li>
      </ul>
    </div>

    <div
      v-else
      class="relative h-full rounded-[22px] border border-cyan-300/85 bg-blue-950/75 px-12 py-4 shadow-[0_0_36px_rgba(14,165,233,0.62),inset_0_0_35px_rgba(37,99,235,0.22)]"
    >
      <div v-if="data.badge" class="absolute -top-6 left-1/2 rounded-t-2xl border border-cyan-300 bg-blue-950 px-9 py-2 text-2xl font-bold leading-8 shadow-[0_0_22px_rgba(34,211,238,0.65)]">
        {{ data.badge }}
      </div>
      <div
        :class="[
          'grid h-full divide-x divide-cyan-400/35',
          data.columns === 9 ? 'grid-cols-9' : data.columns === 6 ? 'grid-cols-6' : 'grid-cols-5',
        ]"
      >
        <div v-for="item in data.items" :key="item.label" class="flex flex-col items-center justify-center gap-2 text-center">
          <component :is="item.icon" class="size-7 text-cyan-200" aria-hidden="true" />
          <span class="text-[17px] font-semibold leading-6">{{ item.label }}</span>
          <small v-if="item.subtitle" class="text-sm leading-4 text-cyan-100/85">{{ item.subtitle }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
