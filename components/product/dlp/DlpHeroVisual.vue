<script setup lang="ts">
import { ArrowRight, Boxes, Play, Search, Zap } from '@lucide/vue'
import type { Component } from 'vue'
import { dlpHeroFeatures, dlpHeroQueryResults, dlpHeroTagResults } from '~/data/dlp'
import { dlpHeroSqlLines, dlpSqlTokenClasses, tokenizeSql } from '~/components/product/dlp/heroSql'
import { useDlpHeroAnimation } from '~/components/product/dlp/useDlpHeroAnimation'
import type { DlpHeroTab } from '~/components/product/dlp/useDlpHeroAnimation'

interface DlpHeroTabItem {
  id: DlpHeroTab
  title: string
  icon: Component
}

const heroTabs: DlpHeroTabItem[] = [
  { id: 'generate', title: '标签生成', icon: Zap },
  { id: 'query', title: '标签查询', icon: Search },
]

const generationColumns = ['object', 'tag', 'type', 'value']
const queryColumns = ['tag', 'category', 'value', 'updated']
const generationCellColors = ['text-muted', 'text-highlighted', 'text-primary', 'text-emerald-500']
const queryCellColors = ['text-muted', 'text-highlighted', 'text-primary', 'text-emerald-500']

const {
  activeTab,
  activeFeature,
  generatedRows,
  isGenerationDone,
  isQueryRunning,
  queryRows,
  switchTab,
  runQuery,
  stopQuery,
} = useDlpHeroAnimation()
</script>

<template>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute -inset-4 rounded-[48px] bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl"
      aria-hidden="true"
    />
    <div class="relative overflow-hidden rounded-[32px] border border-muted bg-default shadow-2xl">
      <div class="flex items-center justify-between border-b border-muted px-4 py-3">
        <div class="flex gap-1.5">
          <div class="size-3 rounded-full bg-red-500/70" />
          <div class="size-3 rounded-full bg-yellow-500/70" />
          <div class="size-3 rounded-full bg-green-500/70" />
        </div>
        <span class="text-xs font-medium text-muted">数曜·数据标签平台</span>
        <div class="w-12" />
      </div>
      <div class="flex border-b border-muted">
        <button
          v-for="tab in heroTabs"
          :key="tab.id"
          type="button"
          class="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors"
          :class="tab.id === activeTab
            ? 'border-b-2 border-primary text-highlighted'
            : 'text-muted hover:text-highlighted'"
          @click="switchTab(tab.id)"
        >
          <component :is="tab.icon" class="size-3.5" aria-hidden="true" />
          <span class="hidden sm:inline">{{ tab.title }}</span>
        </button>
      </div>
      <div class="h-[475px] overflow-hidden p-5">
        <template v-if="activeTab === 'generate'">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2 text-primary">
              <Zap class="size-4" aria-hidden="true" />
              <span class="text-sm font-semibold">实时标签生成</span>
            </div>
            <span class="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
              {{ dlpHeroFeatures.length }} 特征
            </span>
          </div>
          <div class="mb-4 space-y-2">
            <div
              v-for="(feature, index) in dlpHeroFeatures"
              :key="feature.key"
              class="flex items-center gap-3 rounded-[16px] border px-4 py-2.5 transition-all duration-500"
              :class="index === activeFeature ? 'border-primary/50 bg-primary/10' : 'border-muted bg-dt-bg-soft/30'"
            >
              <component
                :is="feature.icon"
                class="size-3.5 shrink-0 transition-all duration-300"
                :class="index === activeFeature ? 'text-primary' : 'text-muted'"
                aria-hidden="true"
              />
              <span class="min-w-0 flex-1 truncate font-mono text-xs text-primary">{{ feature.key }}</span>
              <span class="shrink-0 font-mono text-xs text-muted">{{ feature.value }}</span>
              <ArrowRight
                v-if="index === activeFeature"
                class="size-3 shrink-0 animate-pulse text-primary"
                aria-hidden="true"
              />
            </div>
          </div>
          <div class="relative my-4 flex items-center justify-center">
            <div class="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div class="relative flex size-9 items-center justify-center rounded-full border border-primary/30 bg-default">
              <Boxes class="size-5 text-primary" aria-hidden="true" />
            </div>
          </div>
          <div class="overflow-hidden rounded-[24px] border border-muted bg-dt-bg-soft/30">
            <div class="flex items-center justify-between border-b border-muted px-3 py-2">
              <span class="text-xs font-semibold text-highlighted">tag_results</span>
              <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                {{ generatedRows }} 行
              </span>
            </div>
            <div class="overflow-x-auto">
              <div class="grid min-w-[400px] grid-cols-4 gap-2 border-b border-muted bg-dt-bg-soft/50 px-3 py-1.5">
                <span
                  v-for="column in generationColumns"
                  :key="column"
                  class="text-[10px] font-semibold uppercase tracking-wider text-muted"
                >{{ column }}</span>
              </div>
              <div
                v-for="(row, index) in dlpHeroTagResults"
                :key="row.tag"
                class="grid min-w-[400px] grid-cols-4 gap-2 border-b border-dt-line-strong/50 px-3 py-1.5 transition-colors duration-300"
                :class="index === generatedRows - 1 && !isGenerationDone ? 'bg-primary/5' : ''"
              >
                <span
                  v-for="(cell, cellIndex) in [row.object, row.tag, row.type, row.value]"
                  :key="cellIndex"
                  class="truncate font-mono text-[11px] transition-opacity duration-300"
                  :class="[generationCellColors[cellIndex], index < generatedRows ? 'opacity-100' : 'opacity-0']"
                >{{ cell }}</span>
              </div>
            </div>
          </div>
          <div class="relative mt-3 h-[34px]">
            <div
              class="absolute inset-0 rounded-[16px] border border-muted bg-dt-bg-soft/30 px-3 py-2 transition-opacity duration-300"
              :class="!isGenerationDone && generatedRows > 0 ? 'opacity-100' : 'pointer-events-none opacity-0'"
            >
              <p class="flex items-center gap-2 text-xs font-medium text-muted">
                <span class="inline-block size-1.5 animate-pulse rounded-full bg-primary" /> 正在生成标签...
              </p>
            </div>
            <div
              class="absolute inset-0 rounded-[16px] border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 transition-opacity duration-500"
              :class="isGenerationDone ? 'opacity-100' : 'pointer-events-none opacity-0'"
            >
              <p class="text-xs font-medium text-emerald-500"> ✓ 标签已生成，可直接查询、分析与服务调用。</p>
            </div>
          </div>
        </template>
        <div v-else class="flex h-full flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-primary">
              <Search class="size-4" aria-hidden="true" />
              <span class="text-sm font-semibold">标签实时查询</span>
              <span class="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">主体画像</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                v-if="isQueryRunning"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-[12px] border border-muted bg-dt-bg-soft/50 px-2.5 py-1 text-[10px] font-semibold text-muted transition hover:bg-muted hover:text-highlighted"
                @click="stopQuery"
              >
                重置
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-[12px] px-2.5 py-1 text-[10px] font-semibold text-white transition"
                :class="isQueryRunning ? 'bg-primary/50' : 'animate-glow bg-primary hover:bg-primary/90'"
                @click="runQuery"
              >
                <Play class="size-3" aria-hidden="true" /> 查询标签
              </button>
            </div>
          </div>
          <div class="overflow-hidden rounded-[24px] border border-muted bg-dt-bg-soft/30">
            <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed"><div v-for="(line, lineIndex) in dlpHeroSqlLines" :key="lineIndex" class="flex"><span class="mr-4 inline-block w-4 select-none text-right text-dt-text-muted/50">{{ lineIndex + 1 }}</span><span><span v-for="(token, tokenIndex) in tokenizeSql(line)" :key="tokenIndex" :class="dlpSqlTokenClasses[token.type]">{{ token.text }}</span></span></div></pre>
          </div>
          <div class="h-[220px] overflow-hidden rounded-[24px] border border-muted bg-dt-bg-soft/30">
            <template v-if="isQueryRunning">
              <div class="flex items-center justify-between border-b border-muted px-3 py-2">
                <span class="text-xs font-semibold text-highlighted">tag_results</span>
                <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                  {{ queryRows }} 行
                </span>
              </div>
              <div class="overflow-x-auto">
                <div class="grid min-w-[400px] grid-cols-4 gap-2 border-b border-muted bg-dt-bg-soft/50 px-3 py-1.5">
                  <span
                    v-for="column in queryColumns"
                    :key="column"
                    class="text-[10px] font-semibold uppercase tracking-wider text-muted"
                  >{{ column }}</span>
                </div>
                <div
                  v-for="(row, index) in dlpHeroQueryResults"
                  :key="row.tag"
                  class="grid min-w-[400px] grid-cols-4 gap-2 border-b border-dt-line-strong/50 px-3 py-1.5 transition-all duration-300"
                  :class="index === queryRows - 1 ? 'bg-primary/5' : ''"
                >
                  <span
                    v-for="(cell, cellIndex) in [row.tag, row.category, row.value, row.updated]"
                    :key="cellIndex"
                    class="truncate font-mono text-[11px] transition-opacity duration-300"
                    :class="[queryCellColors[cellIndex], index < queryRows ? 'opacity-100' : 'opacity-0']"
                  >{{ cell }}</span>
                </div>
              </div>
            </template>
            <div v-else class="flex h-full items-center justify-center">
              <p class="text-xs text-muted">点击「查询标签」查看客户 A1024 的标签结果</p>
            </div>
          </div>
          <div class="relative h-[34px]">
            <div
              class="absolute inset-0 rounded-[16px] border border-muted bg-dt-bg-soft/30 px-3 py-2 transition-opacity duration-300"
              :class="isQueryRunning && queryRows < dlpHeroQueryResults.length
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'"
            >
              <p class="flex items-center gap-2 text-xs font-medium text-muted">
                <span class="inline-block size-1.5 animate-pulse rounded-full bg-primary" /> 正在查询标签...
              </p>
            </div>
            <div
              class="absolute inset-0 rounded-[16px] border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 transition-opacity duration-500"
              :class="queryRows === dlpHeroQueryResults.length ? 'opacity-100' : 'pointer-events-none opacity-0'"
            >
              <p class="text-xs font-medium text-emerald-500"> ✓ 已找到 3 个标签，可用于分析、分群与服务调用。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
