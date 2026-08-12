<script setup lang="ts">
import {
  Bot,
  Building2,
  Cloud,
  FileText,
  Inbox,
  Lightbulb,
  MessageCircleQuestion,
  Radio,
  Search,
  Sparkles,
} from '@lucide/vue'
import IconBox from '~/components/common/card/IconBox.vue'
import { boyaoCapabilityNodes, boyaoLogo } from '~/data/boyao'
import type { Component } from 'vue'

interface HeroSourceItem {
  title: string
  description: string
  icon: Component
}

interface HeroAppModule {
  title: string
  icon: Component
}

const sourceItems: HeroSourceItem[] = [
  { title: '原始素材', description: 'PDF、Word、PPT……', icon: FileText },
  { title: '业务系统', description: 'OA、ERP、CRM……', icon: Building2 },
  { title: '经验知识', description: '案例、问答、标准……', icon: Lightbulb },
]

const appModules: HeroAppModule[] = [
  { title: '智能检索', icon: Search },
  { title: '知识问答', icon: MessageCircleQuestion },
  { title: '智能助手', icon: Bot },
  { title: '智能体', icon: Sparkles },
]

const capabilityStyles = [
  {
    border: 'border-violet-500/30',
    bar: 'bg-violet-500',
    iconBox: 'bg-violet-500/10',
    icon: 'text-violet-500',
    label: 'text-violet-500',
  },
  {
    border: 'border-violet-400/30',
    bar: 'bg-violet-400',
    iconBox: 'bg-violet-400/10',
    icon: 'text-violet-400',
    label: 'text-violet-400',
  },
  {
    border: 'border-blue-400/30',
    bar: 'bg-blue-400',
    iconBox: 'bg-blue-400/10',
    icon: 'text-blue-400',
    label: 'text-blue-400',
  },
]

const nodeOneDots = [
  { opacity: '[opacity:0.55]', delay: '[animation-delay:0.15s]' },
  { opacity: '[opacity:0.8]', delay: '[animation-delay:0.3s]' },
  { opacity: '[opacity:0.3]', delay: '[animation-delay:0.45s]' },
  { opacity: '[opacity:0.55]', delay: '[animation-delay:0.6s]' },
]

const nodeTwoBars = ['[animation-delay:0.12s]', '[animation-delay:0.24s]', '[animation-delay:0.36s]']
</script>

<template>
  <div class="hidden w-full max-w-2xl lg:block">
    <div class="pointer-events-none relative mx-auto h-[520px] w-full max-w-[680px]">
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute left-1/3 top-1/3 h-[280px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-violet-500/12 via-violet-400/10 to-blue-400/10 blur-3xl"
        ></div>
      </div>

      <!-- 左上：企业知识资产 / 知识采集 -->
      <div class="absolute left-[8px] top-[20px] w-[200px]">
        <div
          class="group relative overflow-hidden rounded-[24px] border border-blue-400/25 bg-default px-5 py-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div class="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-blue-400/70 to-blue-400/40"></div>
          <div class="mb-4 flex items-center gap-3">
            <IconBox :size="40" tone="soft">
              <Inbox class="size-5 text-blue-400" aria-hidden="true" />
            </IconBox>
            <div>
              <div class="text-[14px] font-semibold text-highlighted">企业知识资产</div>
              <div class="text-[11px] text-blue-400">知识采集</div>
            </div>
          </div>
          <div class="space-y-2">
            <div
              v-for="item in sourceItems"
              :key="item.title"
              class="flex items-center gap-2.5 rounded-[16px] border border-default bg-[var(--dt-color-bg-soft)]/40 px-3 py-2"
            >
              <component :is="item.icon" class="size-4 shrink-0 text-default" aria-hidden="true" />
              <div class="min-w-0">
                <div class="text-[11px] font-medium text-highlighted">{{ item.title }}</div>
                <div class="truncate text-[9px] text-muted">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中央：博曜·企业级知识管理平台 -->
      <div class="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
        <div class="relative rounded-[32px] border border-violet-500/30 bg-violet-500/8 p-5 shadow-lg shadow-violet-500/15">
          <div
            class="pointer-events-none absolute inset-0 rounded-[32px] bg-linear-to-br from-violet-500/20 via-violet-400/14 to-blue-400/16"
          ></div>
          <div class="relative mb-4 flex items-center justify-center">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-violet-500/50 bg-default px-4 py-1.5 shadow-sm"
            >
              <img :src="boyaoLogo" alt="博曜 logo" class="size-5" loading="lazy" />
              <span class="text-[13px] font-semibold text-violet-500">博曜·企业级知识管理平台</span>
            </div>
          </div>
          <div class="relative grid grid-cols-3 gap-2">
            <div
              v-for="(node, index) in boyaoCapabilityNodes"
              :key="node.title"
              class="group/core relative overflow-hidden rounded-[24px] border bg-default p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              :class="capabilityStyles[index]?.border"
            >
              <div class="absolute inset-x-0 top-0 h-[2px] opacity-70" :class="capabilityStyles[index]?.bar"></div>
              <div class="flex flex-col items-center gap-2">
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-[16px]"
                  :class="capabilityStyles[index]?.iconBox"
                >
                  <component
                    :is="node.icon"
                    class="size-5 transition-transform duration-300 group-hover/core:scale-105"
                    :class="capabilityStyles[index]?.icon"
                    aria-hidden="true"
                  />
                </div>
                <div class="text-center">
                  <span class="block text-[10px] font-semibold" :class="capabilityStyles[index]?.label">
                    {{ node.title }}
                  </span>
                  <span class="block text-[8px] text-muted">{{ node.description }}</span>
                </div>

                <div class="mt-1 flex items-center justify-center gap-0.5">
                  <template v-if="index === 0">
                    <div
                      v-for="(dot, dotIndex) in nodeOneDots"
                      :key="dotIndex"
                      class="size-1 animate-pulse rounded-full bg-violet-500"
                      :class="[dot.opacity, dot.delay]"
                    ></div>
                  </template>
                  <template v-else-if="index === 1">
                    <div
                      v-for="(delay, barIndex) in nodeTwoBars"
                      :key="barIndex"
                      class="h-1 w-3 animate-pulse-bar rounded-full bg-violet-400/70"
                      :class="delay"
                    ></div>
                  </template>
                  <template v-else>
                    <span class="size-1 animate-pulse-dot rounded-full bg-blue-400"></span>
                    <span class="h-[1px] w-2 bg-blue-400/40"></span>
                    <span class="size-1 animate-pulse-dot rounded-full bg-blue-400 [animation-delay:0.3s]"></span>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="relative mt-3 flex items-center justify-center gap-1">
            <div class="h-px w-8 bg-linear-to-r from-transparent via-violet-500/55 to-transparent"></div>
            <Radio class="size-3 text-violet-400/70" aria-hidden="true" />
            <div class="h-px w-8 bg-linear-to-r from-transparent via-blue-400/55 to-transparent"></div>
          </div>
        </div>
      </div>

      <!-- 右下：智能应用 / 企业场景 -->
      <div class="absolute bottom-[10px] right-[-20px] w-[440px]">
        <div
          class="group relative overflow-hidden rounded-[24px] border border-violet-500/25 bg-default px-5 py-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div class="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-violet-500/70 to-violet-400/40"></div>
          <div class="mb-4 flex items-center gap-3">
            <IconBox :size="40" tone="soft">
              <Cloud class="size-5 text-violet-500" aria-hidden="true" />
            </IconBox>
            <div>
              <div class="text-[15px] font-semibold text-highlighted">智能应用</div>
              <div class="text-[12px] text-violet-400">企业场景</div>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-3">
            <IconBox
              v-for="module in appModules"
              :key="module.title"
              :size="56"
              tone="soft"
              class="col-span-2"
              :aria-label="module.title"
            >
              <component :is="module.icon" class="size-5 text-violet-400" aria-hidden="true" />
            </IconBox>
            <div
              class="col-span-4 flex h-14 items-center justify-center gap-2 rounded-[12px] border border-default bg-[var(--dt-color-bg-soft)]/40 px-3 text-left"
            >
              <span class="text-[11px] font-semibold leading-[1.1] whitespace-nowrap text-highlighted">业务系统</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SVG 流动光点 -->
      <svg
        class="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 680 520"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="boyaoSignalGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle r="4.5" fill="#60a5fa" filter="url(#boyaoSignalGlow)">
          <animate attributeName="cx" values="188;250;250" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="85;85;195" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="4.5" fill="#8b5cf6" filter="url(#boyaoSignalGlow)">
          <animate attributeName="cx" values="430;500;500" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="385;385;445" keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="188" cy="85" r="8" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0">
          <animate attributeName="r" values="6;20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="85" r="6" fill="#60a5fa" fill-opacity="0.3" filter="url(#boyaoSignalGlow)">
          <animate attributeName="fill-opacity" values="0.3;0.6;0.3" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="195" r="6" fill="#8b5cf6" fill-opacity="0.4" filter="url(#boyaoSignalGlow)">
          <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="430" cy="385" r="8" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0">
          <animate attributeName="r" values="6;20" dur="2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="385" r="6" fill="#d946ef" fill-opacity="0.3" filter="url(#boyaoSignalGlow)">
          <animate attributeName="fill-opacity" values="0.3;0.6;0.3" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="445" r="6" fill="#f59e0b" fill-opacity="0.4" filter="url(#boyaoSignalGlow)">
          <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  </div>
</template>
