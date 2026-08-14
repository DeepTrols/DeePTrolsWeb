<script setup lang="ts">
import {
  ArrowLeftRight,
  BatteryCharging,
  BrainCircuit,
  Cctv,
  CircuitBoard,
  Cpu,
  Factory,
  RadioTower,
  Wifi,
  Workflow,
} from '@lucide/vue'
import IconBox from '~/components/common/card/IconBox.vue'
import { boyaoLogo, deepseekLogo, kimiLogo, qwenLogo, shuyaoLogo, tanyaoIotLogo, zhiyaoLogo, zhipuLogo } from '~/data/tanyao'
import type { Component } from 'vue'

interface EdgeNode {
  title: string
  icon: Component
  border: string
  bar: string
  iconColor: string
  label: string
  pulse: string
  pulseLine: string
}

interface DeviceTile {
  title: string
  icon: Component
}

const edgeNodes: EdgeNode[] = [
  {
    title: '设备接入',
    icon: Wifi,
    border: 'border-violet-500/30',
    bar: 'bg-violet-500',
    iconColor: 'text-violet-500',
    label: 'text-violet-500',
    pulse: 'bg-violet-500',
    pulseLine: 'bg-violet-500/40',
  },
  {
    title: '边缘计算',
    icon: Cpu,
    border: 'border-fuchsia-500/30',
    bar: 'bg-fuchsia-500',
    iconColor: 'text-fuchsia-500',
    label: 'text-fuchsia-500',
    pulse: 'bg-fuchsia-500',
    pulseLine: 'bg-fuchsia-500/40',
  },
  {
    title: '策略执行',
    icon: ArrowLeftRight,
    border: 'border-blue-500/30',
    bar: 'bg-blue-500',
    iconColor: 'text-blue-500',
    label: 'text-blue-500',
    pulse: 'bg-blue-500',
    pulseLine: 'bg-blue-500/40',
  },
  {
    title: 'Node-RED',
    icon: Workflow,
    border: 'border-red-500/30',
    bar: 'bg-red-500',
    iconColor: 'text-red-500',
    label: 'text-red-500',
    pulse: 'bg-red-500',
    pulseLine: 'bg-red-500/40',
  },
  {
    title: 'Neuron',
    icon: BrainCircuit,
    border: 'border-emerald-500/30',
    bar: 'bg-emerald-500',
    iconColor: 'text-emerald-500',
    label: 'text-emerald-500',
    pulse: 'bg-emerald-500',
    pulseLine: 'bg-emerald-500/40',
  },
]

const deviceTiles: DeviceTile[] = [
  { title: '工业设备', icon: Factory },
  { title: '传感器', icon: RadioTower },
  { title: '能源设备', icon: BatteryCharging },
  { title: 'PLC', icon: CircuitBoard },
  { title: '摄像头', icon: Cctv },
]

const ecosystemPartners = [
  { name: 'DeepSeek', logo: deepseekLogo },
  { name: '千问', logo: qwenLogo },
  { name: '智谱', logo: zhipuLogo },
  { name: 'Kimi', logo: kimiLogo },
  { name: '数曜', logo: shuyaoLogo },
  { name: '智曜', logo: zhiyaoLogo },
  { name: '博曜', logo: boyaoLogo },
]

const protocolDots = [
  { opacity: '[opacity:0.55]', delay: '[animation-delay:0.12s]' },
  { opacity: '[opacity:0.8]', delay: '[animation-delay:0.24s]' },
  { opacity: '[opacity:0.3]', delay: '[animation-delay:0.36s]' },
  { opacity: '[opacity:0.55]', delay: '[animation-delay:0.48s]' },
  { opacity: '[opacity:0.8]', delay: '[animation-delay:0.6s]' },
]

const brokerBars = ['[animation-delay:0.1s]', '[animation-delay:0.2s]', '[animation-delay:0.3s]', '[animation-delay:0.4s]']
</script>

<template>
  <div class="hidden w-full max-w-xl lg:block 2xl:max-w-2xl">
    <div class="pointer-events-none relative mx-auto h-[600px] w-full max-w-[600px]">
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/8 via-fuchsia-500/6 to-amber-400/8 blur-3xl"
        ></div>
      </div>

      <!-- SVG 双向流动光点轨道 -->
      <svg class="absolute inset-0 h-full w-full" viewBox="0 0 560 560" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="tanyaoFlowGradientUp" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.6" />
            <stop offset="35%" stop-color="#d946ef" stop-opacity="0.6" />
            <stop offset="70%" stop-color="#60a5fa" stop-opacity="0.65" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.65" />
          </linearGradient>
          <linearGradient id="tanyaoFlowGradientDown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6" />
            <stop offset="35%" stop-color="#60a5fa" stop-opacity="0.6" />
            <stop offset="70%" stop-color="#d946ef" stop-opacity="0.65" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.65" />
          </linearGradient>
          <filter id="tanyaoEdgeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M 252 492 L 252 68" stroke="url(#tanyaoFlowGradientUp)" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="6 10" fill="none">
          <animate attributeName="stroke-dashoffset" values="0;-32" dur="2.8s" repeatCount="indefinite" />
        </path>
        <path d="M 308 68 L 308 492" stroke="url(#tanyaoFlowGradientDown)" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="6 10" fill="none">
          <animate attributeName="stroke-dashoffset" values="0;32" dur="2.8s" repeatCount="indefinite" />
        </path>
        <circle cx="280" cy="452" r="5" fill="#8b5cf6" fill-opacity="0.7" />
        <circle cx="280" cy="280" r="7" fill="#d946ef" fill-opacity="0.9" />
        <circle cx="280" cy="96" r="5" fill="#60a5fa" fill-opacity="0.7" />
        <circle cx="252" r="5" fill="#8b5cf6" filter="url(#tanyaoEdgeGlow)">
          <animate attributeName="cy" values="492;68" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="308" r="4" fill="#f59e0b" filter="url(#tanyaoEdgeGlow)">
          <animate attributeName="cy" values="68;492" dur="2.9s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;1;0" dur="2.9s" begin="0.3s" repeatCount="indefinite" />
        </circle>
      </svg>

      <!-- 顶部卡片｜平台层 -->
      <div class="absolute left-1/2 top-[18px] w-[460px] -translate-x-1/2">
        <div
          class="group relative overflow-hidden rounded-[24px] border border-primary/25 bg-default px-5 py-3.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div class="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-violet-500/70 to-blue-500/70"></div>
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <IconBox :size="48" tone="soft">
                <img :src="tanyaoIotLogo" alt="探曜 logo" class="size-7" loading="lazy" />
              </IconBox>
              <div class="min-w-0">
                <div class="text-[16px] font-semibold text-highlighted">探曜AIoT</div>
                <div class="text-[12px] text-muted">智能物联底座</div>
              </div>
            </div>
            <span
              class="rounded-full border border-default bg-dt-bg-soft/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted"
            >
              AI Powered
            </span>
          </div>
          <div class="mt-2.5 h-px w-full bg-linear-to-r from-transparent via-dt-line-strong to-transparent opacity-60"></div>
          <div class="mt-3 flex items-center justify-between gap-3">
            <span class="text-[11px] font-semibold uppercase tracking-wide text-muted">链接生态</span>
            <div class="flex items-center gap-3">
              <IconBox v-for="partner in ecosystemPartners" :key="partner.name" :size="40" tone="soft" :aria-label="partner.name">
                <img :src="partner.logo" :alt="`${partner.name} logo`" class="size-5" loading="lazy" />
              </IconBox>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间卡片｜边缘层 -->
      <div class="absolute left-1/2 top-[208px] w-[504px] xl:w-[560px] -translate-x-1/2">
        <div class="relative rounded-[32px] border border-primary/20 bg-primary/5 p-4 shadow-lg shadow-primary/10">
          <div class="pointer-events-none absolute inset-0 rounded-[32px] bg-linear-to-b from-violet-500/10 via-fuchsia-500/6 to-amber-400/8"></div>
          <div class="relative mb-4 flex items-center justify-center">
            <div class="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-default px-4 py-1.5 shadow-sm">
              <Cpu class="size-5 text-primary" aria-hidden="true" />
              <span class="text-[14px] font-semibold text-primary">探曜 Edge</span>
            </div>
          </div>
          <div class="relative grid grid-cols-5 gap-2">
            <div
              v-for="(node, index) in edgeNodes"
              :key="node.title"
              class="group relative overflow-hidden rounded-[24px] border bg-default p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg xl:p-4"
              :class="node.border"
            >
              <div class="absolute inset-x-0 top-0 h-[2px] opacity-70" :class="node.bar"></div>
              <div class="flex flex-col items-center gap-2">
                <component
                  :is="node.icon"
                  class="size-9 transition-transform duration-300 group-hover:scale-105"
                  :class="node.iconColor"
                  aria-hidden="true"
                />
                <span class="text-[12px] font-semibold" :class="node.label">{{ node.title }}</span>

                <div v-if="index === 0" class="flex items-center gap-0.5">
                  <div
                    v-for="(dot, dotIndex) in protocolDots"
                    :key="dotIndex"
                    class="size-1.5 animate-pulse rounded-full bg-violet-500 [animation-duration:1.1s]"
                    :class="[dot.opacity, dot.delay]"
                  ></div>
                </div>
                <div v-else-if="index === 1" class="flex gap-0.5">
                  <div
                    v-for="(delay, barIndex) in brokerBars"
                    :key="barIndex"
                    class="h-1.5 w-3 animate-pulse-bar rounded-full bg-fuchsia-500/60 xl:w-3.5"
                    :class="delay"
                  ></div>
                </div>
                <div v-else class="flex items-center gap-1">
                  <span class="size-1.5 animate-pulse-dot rounded-full" :class="node.pulse"></span>
                  <span class="h-[1.5px] w-3" :class="node.pulseLine"></span>
                  <span class="size-1.5 animate-pulse-dot rounded-full [animation-delay:0.24s]" :class="node.pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部卡片｜设备层 -->
      <div class="absolute bottom-[46px] left-1/2 w-[460px] -translate-x-1/2">
        <div class="grid grid-cols-5 gap-3">
          <div
            v-for="tile in deviceTiles"
            :key="tile.title"
            class="group flex flex-col items-center gap-2 rounded-[24px] border border-default bg-default px-3 py-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <component :is="tile.icon" class="size-9 text-muted" aria-hidden="true" />
            <span class="text-[12px] font-medium text-muted">{{ tile.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
