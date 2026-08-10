<script setup lang="ts">
import { Code2, Workflow } from '@lucide/vue'
import type { Component } from 'vue'
import DdpFlowCanvas from '~/components/product/ddp/DdpFlowCanvas.client.vue'
import {
  ddpHeroSqlLines,
  ddpSqlCursorTopClasses,
  ddpSqlTokenClasses,
} from '~/components/product/ddp/ddpHeroSql'
import { useDdpHeroAnimation } from '~/components/product/ddp/useDdpHeroAnimation'
import type { DdpHeroTab } from '~/components/product/ddp/useDdpHeroAnimation'

interface DdpHeroTabItem {
  id: DdpHeroTab
  title: string
  icon: Component
}

const heroTabs: DdpHeroTabItem[] = [
  { id: 'sql', title: 'SQL 开发', icon: Code2 },
  { id: 'flow', title: '可视化编排', icon: Workflow },
]

const { activeTab, revealedLines, switchTab, pause, resume } = useDdpHeroAnimation(
  ddpHeroSqlLines.length,
)
</script>

<template>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl"
      aria-hidden="true"
    ></div>
    <div
      class="relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div class="flex items-center border-b border-muted px-4 py-3">
        <div class="flex gap-1.5">
          <div class="size-3 rounded-full bg-red-500/70"></div>
          <div class="size-3 rounded-full bg-yellow-500/70"></div>
          <div class="size-3 rounded-full bg-green-500/70"></div>
        </div>
      </div>
      <div class="flex border-b border-muted">
        <button
          v-for="tab in heroTabs"
          :key="tab.id"
          type="button"
          class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors"
          :class="
            activeTab === tab.id
              ? 'border-b-2 border-primary text-highlighted'
              : 'text-muted hover:text-highlighted'
          "
          @click="switchTab(tab.id)"
        >
          <component :is="tab.icon" class="size-4" aria-hidden="true" />
          {{ tab.title }}
        </button>
      </div>
      <div class="relative h-[368px]">
        <div
          :class="[
            'absolute inset-0 transition-opacity duration-300',
            activeTab === 'sql' ? 'opacity-100' : 'pointer-events-none opacity-0',
          ]"
        >
          <div class="relative h-full p-4">
            <div class="absolute left-4 top-4 flex flex-col font-mono text-xs text-dimmed/50">
              <span
                v-for="(line, index) in ddpHeroSqlLines"
                :key="`line-number-${line.id}`"
                class="h-6 leading-6 transition-opacity duration-300"
                :class="index < revealedLines ? 'opacity-100' : 'opacity-30'"
              >{{ index + 1 }}</span>
            </div>
            <div class="ml-8 font-mono text-sm leading-6">
              <div
                v-for="(line, index) in ddpHeroSqlLines"
                :key="line.id"
                class="whitespace-pre transition-all duration-300"
                :class="[
                  index < revealedLines ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  line.indent === 2 ? 'pl-6' : 'pl-0',
                ]"
              >
                <span
                  v-for="(token, tokenIndex) in line.tokens"
                  :key="`${line.id}-${tokenIndex}`"
                  :class="ddpSqlTokenClasses[token.type]"
                >{{ token.text }}</span>
              </div>
            </div>
            <div
              v-if="activeTab === 'sql' && revealedLines < ddpHeroSqlLines.length"
              class="absolute left-8 ml-8 h-5 w-0.5 animate-pulse bg-primary"
              :class="ddpSqlCursorTopClasses[revealedLines]"
            ></div>
          </div>
        </div>
        <div
          :class="[
            'absolute inset-0 transition-opacity duration-300',
            activeTab === 'flow' ? 'opacity-100' : 'pointer-events-none opacity-0',
          ]"
        >
          <ClientOnly>
            <DdpFlowCanvas />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
