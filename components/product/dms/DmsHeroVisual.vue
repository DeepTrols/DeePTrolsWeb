<script setup lang="ts">
import { CircleCheck, Database, LoaderCircle, TriangleAlert } from '@lucide/vue'
import { computed } from 'vue'
import {
  dmsHeroDisposalDone,
  dmsHeroDisposalEvent,
  dmsHeroDisposalFields,
  dmsHeroDisposalHint,
  dmsHeroDisposalSteps,
  dmsHeroIntakeBadge,
  dmsHeroIntakeFields,
  dmsHeroIntakeHint,
  dmsHeroIntakeSteps,
  dmsHeroRiskHint,
  dmsHeroRiskRules,
  dmsHeroRiskSummary,
  dmsHeroTabs,
  dmsHeroTitle,
} from '~/data/dms'
import { getProgressWidthClass, useDmsHeroAnimation } from '~/components/product/dms/useDmsHeroAnimation'

const {
  activeStage,
  progress,
  skipTransition,
  intakeDoneSteps,
  scannedRules,
  riskFound,
  disposalDoneSteps,
  disposalComplete,
  switchStage,
} = useDmsHeroAnimation()

const activeTab = computed(() => dmsHeroTabs[activeStage.value])

function progressWidthClass(index: number): string {
  return getProgressWidthClass(index, activeStage.value, progress.value)
}
</script>

<template>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl"
      aria-hidden="true"
    />
    <div class="relative overflow-hidden rounded-2xl border border-muted bg-default shadow-2xl">
      <div class="flex items-center justify-between border-b border-muted px-4 py-3">
        <div class="flex gap-1.5">
          <div class="size-3 rounded-full bg-red-500/70" />
          <div class="size-3 rounded-full bg-yellow-500/70" />
          <div class="size-3 rounded-full bg-green-500/70" />
        </div>
        <span class="text-xs font-medium text-muted">{{ dmsHeroTitle }}</span>
        <div class="w-12" />
      </div>

      <div class="flex border-b border-muted">
        <button
          v-for="(tab, index) in dmsHeroTabs"
          :key="tab.id"
          type="button"
          class="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium transition-colors"
          :class="activeStage === index
            ? 'border-b-2 border-primary text-highlighted'
            : 'text-muted hover:text-highlighted'"
          @click="switchStage(index)"
        >
          <component :is="tab.icon" class="size-3.5" aria-hidden="true" />
          <span class="hidden sm:inline">{{ tab.title }}</span>
        </button>
      </div>

      <div class="relative h-[320px]">
        <div v-if="activeTab?.id === 'intake'" class="p-5">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2 text-primary">
              <Database class="size-4" aria-hidden="true" />
              <span class="text-sm font-semibold">数据流通事件</span>
            </div>
            <span class="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
              {{ dmsHeroIntakeBadge }}
            </span>
          </div>
          <div class="rounded-xl border border-muted bg-muted p-3">
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
              <div
                v-for="field in dmsHeroIntakeFields"
                :key="field.label"
                class="flex items-center justify-between gap-2"
              >
                <span class="text-[11px] text-muted">{{ field.label }}</span>
                <span class="truncate font-mono text-[11px] text-highlighted">{{ field.value }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-4 gap-2">
            <div
              v-for="(step, index) in dmsHeroIntakeSteps"
              :key="step"
              class="flex items-center justify-center gap-1 rounded-lg border px-1 py-1.5 text-[10px] font-medium transition-all duration-500"
              :class="intakeDoneSteps > index
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-muted bg-muted text-muted'"
            >
              <CircleCheck v-if="intakeDoneSteps > index" class="size-3" aria-hidden="true" />
              {{ step }}
            </div>
          </div>
          <div
            v-if="intakeDoneSteps >= dmsHeroIntakeSteps.length"
            class="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2"
          >
            <p class="text-xs font-medium text-emerald-400">{{ dmsHeroIntakeHint }}</p>
          </div>
        </div>

        <div v-else-if="activeTab?.id === 'risk'" class="p-5">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <template v-if="riskFound">
                <TriangleAlert class="size-4 text-amber-400" aria-hidden="true" />
                <span class="text-sm font-semibold text-amber-400">发现风险</span>
              </template>
              <template v-else>
                <LoaderCircle class="size-4 animate-spin text-primary" aria-hidden="true" />
                <span class="text-sm font-semibold text-primary">规则扫描中</span>
              </template>
            </div>
            <span
              class="rounded-full px-2.5 py-1 text-[10px] font-semibold"
              :class="riskFound ? 'bg-amber-500/15 text-amber-400' : 'bg-primary/15 text-primary'"
            >
              {{ riskFound ? '中风险' : '规则校验' }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl border border-muted bg-muted p-3">
              <div class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">监管规则</div>
              <div class="space-y-1.5">
                <div
                  v-for="(rule, index) in dmsHeroRiskRules"
                  :key="rule.label"
                  class="flex items-center justify-between gap-2 rounded-md px-1.5 py-0.5 text-xs transition-all duration-500"
                  :class="scannedRules > index && rule.risk ? 'bg-amber-500/10 text-amber-400' : 'text-highlighted'"
                >
                  <span class="truncate">{{ rule.label }}</span>
                  <template v-if="scannedRules > index">
                    <TriangleAlert v-if="rule.risk" class="size-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                    <CircleCheck v-else class="size-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  </template>
                  <LoaderCircle
                    v-else-if="scannedRules === index"
                    class="size-3.5 shrink-0 animate-spin text-primary"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div class="rounded-xl border border-muted bg-muted p-3">
              <div class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">流通概要</div>
              <div class="space-y-1.5">
                <div
                  v-for="field in dmsHeroRiskSummary"
                  :key="field.label"
                  class="flex items-center justify-between gap-2 text-xs"
                >
                  <span class="text-muted">{{ field.label }}</span>
                  <span
                    class="truncate font-mono text-[11px]"
                    :class="riskFound && field.label === '敏感字段' ? 'text-amber-400' : 'text-highlighted'"
                  >
                    {{ field.value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="riskFound"
            class="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2"
          >
            <p class="text-xs font-medium text-amber-400">{{ dmsHeroRiskHint }}</p>
          </div>
        </div>

        <div v-else-if="activeTab?.id === 'disposal'" class="p-5">
          <div class="rounded-xl border border-muted bg-muted p-3">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <TriangleAlert class="size-4 text-amber-400" aria-hidden="true" />
                <span class="font-mono text-xs text-highlighted">{{ dmsHeroDisposalEvent.id }}</span>
              </div>
              <span class="rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                {{ dmsHeroDisposalEvent.level }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
              <div
                v-for="field in dmsHeroDisposalFields"
                :key="field.label"
                class="flex items-center justify-between gap-2"
              >
                <span class="text-[11px] text-muted">{{ field.label }}</span>
                <span class="truncate text-[11px] text-highlighted">{{ field.value }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 flex items-center">
            <template v-for="(step, index) in dmsHeroDisposalSteps" :key="step">
              <div
                class="flex flex-1 flex-col items-center gap-1 rounded-lg border px-1 py-2 text-[10px] font-medium transition-all duration-500"
                :class="disposalDoneSteps > index
                  ? 'border-primary/50 bg-primary/10 text-highlighted'
                  : disposalDoneSteps === index
                    ? 'border-primary/50 bg-primary/10 text-primary motion-safe:animate-pulse'
                    : 'border-muted bg-muted text-muted'"
              >
                <CircleCheck
                  v-if="disposalDoneSteps > index"
                  class="size-3.5 text-primary"
                  aria-hidden="true"
                />
                <LoaderCircle
                  v-else-if="disposalDoneSteps === index"
                  class="size-3.5 animate-spin text-primary"
                  aria-hidden="true"
                />
                {{ step }}
              </div>
              <div
                v-if="index < dmsHeroDisposalSteps.length - 1"
                class="h-px w-2 shrink-0 bg-muted"
                aria-hidden="true"
              />
            </template>
          </div>
          <div
            v-if="disposalComplete"
            class="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2"
          >
            <p class="text-xs font-medium text-emerald-400">{{ dmsHeroDisposalDone }}</p>
          </div>
          <p class="mt-3 text-xs text-dimmed">{{ dmsHeroDisposalHint }}</p>
        </div>
      </div>

      <div class="flex gap-1.5 border-t border-muted px-5 py-3">
        <div
          v-for="(tab, index) in dmsHeroTabs"
          :key="`progress-${tab.id}`"
          class="relative h-1 flex-1 overflow-hidden rounded-full bg-default"
        >
          <div class="absolute inset-0 rounded-full bg-primary/20" />
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-primary"
            :class="[
              progressWidthClass(index),
              { 'transition-all duration-100': !skipTransition, 'opacity-50': index < activeStage },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
