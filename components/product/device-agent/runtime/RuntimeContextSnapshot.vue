<script setup lang="ts">
import { BatteryMedium, BookOpen, Gauge, History, Thermometer, TriangleAlert, TrendingUp } from '@lucide/vue'

defineProps<{
  group: 'realtime' | 'timeseries' | 'device' | 'knowledge' | null
}>()

const snapshotFields = [
  { label: '运行状态', value: '充电中', icon: Gauge, group: 'realtime', tone: 'primary' },
  { label: '最高电芯温度', value: '61.8 °C', icon: Thermometer, group: 'realtime', tone: 'warning' },
  { label: 'SOC', value: '86%', icon: BatteryMedium, group: 'realtime', tone: 'default' },
  { label: '历史基线', value: '42.6 °C', icon: History, group: 'timeseries', tone: 'default' },
  { label: '偏离幅度', value: '+45.1 %', icon: TrendingUp, group: 'timeseries', tone: 'warning' },
  { label: 'BMS 状态', value: '告警', icon: TriangleAlert, group: 'device', tone: 'warning' },
  { label: '知识匹配', value: '2 条', icon: BookOpen, group: 'knowledge', tone: 'primary' },
] as const

function fieldActive(field: (typeof snapshotFields)[number], group: string | null): boolean {
  return group === field.group
}

function fieldClass(field: (typeof snapshotFields)[number], group: string | null): string {
  return fieldActive(field, group) ? 'border-primary/30 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'
}

function valueClass(field: (typeof snapshotFields)[number], group: string | null): string {
  if (field.tone === 'warning') {
    return 'text-amber-400'
  }
  if (field.tone === 'primary') {
    return 'text-primary'
  }
  return fieldActive(field, group) ? 'text-primary' : 'text-muted'
}
</script>

<template>
  <div class="mt-3">
    <div class="flex gap-1.5 overflow-x-auto xl:grid xl:grid-cols-7">
      <div
        v-for="field in snapshotFields"
        :key="field.label"
        class="min-w-[92px] flex-1 rounded-lg border p-1.5 transition-colors duration-300 xl:min-w-0"
        :class="fieldClass(field, group)"
      >
        <div class="flex items-center gap-1 text-[10px] leading-3 text-muted">
          <component
            :is="field.icon"
            class="size-3 shrink-0 transition-colors duration-300"
            :class="fieldActive(field, group) ? 'text-primary' : 'text-muted'"
            aria-hidden="true"
          />
          <span class="truncate">{{ field.label }}</span>
        </div>
        <p class="mt-0.5 truncate font-mono text-xs leading-4 transition-colors duration-300" :class="valueClass(field, group)">
          {{ field.value }}
        </p>
      </div>
    </div>
  </div>
</template>
