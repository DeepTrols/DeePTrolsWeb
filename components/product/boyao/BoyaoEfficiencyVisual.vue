<script setup lang="ts">
import { ArrowRight, Building2, FileText, Lightbulb } from '@lucide/vue'
import IsoCube from '~/components/common/IsoCube.vue'
import { boyaoLogo } from '~/data/boyao'
import type { Component } from 'vue'

interface SourceItem {
  title: string
  icon: Component
  delay: string
}

const sourceItems: SourceItem[] = [
  { title: '企业文档', icon: FileText, delay: '[animation-delay:0s]' },
  { title: '业务系统', icon: Building2, delay: '[animation-delay:0.15s]' },
  { title: '经验知识', icon: Lightbulb, delay: '[animation-delay:0.3s]' },
]
</script>

<template>
  <div class="relative flex h-[320px] w-full select-none items-center justify-center">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/8 via-violet-500/5 to-blue-500/8 blur-3xl"
      ></div>
    </div>

    <div class="relative flex items-center gap-10">
      <div class="flex flex-col items-end gap-3">
        <div
          v-for="item in sourceItems"
          :key="item.title"
          class="relative flex w-40 animate-value-legacy items-center gap-2.5 rounded-xl border border-default bg-default px-4 py-2.5 shadow-sm motion-reduce:animate-none motion-reduce:opacity-50"
          :class="item.delay"
        >
          <div class="flex size-8 items-center justify-center rounded-lg bg-muted/50">
            <component :is="item.icon" class="size-4 text-dimmed" aria-hidden="true" />
          </div>
          <span class="text-xs font-medium text-dimmed">{{ item.title }}</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-1.5">
        <ArrowRight class="size-5 text-primary/50" aria-hidden="true" />
      </div>

      <div class="flex animate-value-hub flex-col items-center motion-reduce:animate-none">
        <IsoCube size="lg">
          <img :src="boyaoLogo" alt="" class="size-10" loading="lazy" />
        </IsoCube>
        <div class="mt-6 text-center">
          <div class="text-sm font-semibold text-highlighted">博曜·企业级知识管理平台</div>
          <div class="text-xs text-muted">统一知识平台</div>
        </div>
      </div>
    </div>
  </div>
</template>
