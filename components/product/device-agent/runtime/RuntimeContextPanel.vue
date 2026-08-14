<script setup lang="ts">
import { Layers } from '@lucide/vue'
import { computed } from 'vue'
import RuntimePanelShell from '~/components/product/device-agent/runtime/RuntimePanelShell.vue'
import { stageCount, useRuntimeTimeline } from '~/components/product/device-agent/useRuntimeTimeline'

const SOURCE_START_MS = 400
const SOURCE_INTERVAL_MS = 900
const ENGINE_MS = 4000
const FIELD_START_MS = 4400
const FIELD_INTERVAL_MS = 200
const KNOWLEDGE_MS = 6200
const READY_MS = 6600

const sources = [
  {
    title: '实时数据',
    rows: [
      ['最高电芯温度', '61.8°C'],
      ['SOC', '86%'],
      ['充电功率', '500 kW'],
    ],
  },
  {
    title: '历史时序',
    rows: [
      ['近 7 天温度基线', '42.6°C'],
      ['当前偏离', '+45.1%'],
    ],
  },
  {
    title: '设备状态',
    rows: [
      ['ESS-01', '充电中'],
      ['PCS', '正常'],
      ['BMS', '告警'],
    ],
  },
  {
    title: '知识库',
    rows: [
      ['运维手册', 'KB-204'],
      ['热异常处置规范', 'KB-317'],
    ],
  },
]

const contextFields = [
  ['设备', 'ESS-01'],
  ['运行状态', '充电中'],
  ['SOC', '86%'],
  ['最高温度', '61.8°C'],
  ['历史基线', '42.6°C'],
  ['偏离幅度', '+45.1%'],
  ['充电功率', '500 kW'],
  ['BMS 状态', '告警'],
]

const { elapsed } = useRuntimeTimeline(7200)

const activatedSources = computed(() => stageCount(elapsed.value, SOURCE_START_MS, SOURCE_INTERVAL_MS, sources.length))
const engineOn = computed(() => elapsed.value >= ENGINE_MS)
const visibleFields = computed(() =>
  stageCount(elapsed.value, FIELD_START_MS, FIELD_INTERVAL_MS, contextFields.length),
)
const knowledgeOn = computed(() => elapsed.value >= KNOWLEDGE_MS)
const ready = computed(() => elapsed.value >= READY_MS)
</script>

<template>
  <RuntimePanelShell :icon="Layers" title="设备上下文" badge="正在构建">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="(source, index) in sources"
        :key="source.title"
        class="rounded-lg border p-2 transition-all duration-500"
        :class="
          index < activatedSources ? 'border-primary/40 bg-primary/5' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'
        "
      >
        <p class="text-[11px] font-semibold leading-4 text-highlighted">{{ source.title }}</p>
        <div
          v-for="row in source.rows"
          :key="row[0]"
          class="mt-0.5 flex items-baseline justify-between gap-1.5 text-[11px] leading-4"
        >
          <span class="truncate text-muted">{{ row[0] }}</span>
          <span class="shrink-0 font-mono text-highlighted">{{ row[1] }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-center py-0.5">
      <div
        class="h-2 w-px bg-gradient-to-b from-primary/60 to-transparent transition-opacity duration-500"
        :class="engineOn ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
      ></div>
    </div>

    <div
      class="mx-auto flex w-fit items-center gap-2 rounded-lg border px-3 py-1 transition-all duration-500"
      :class="engineOn ? 'border-primary/30 bg-primary/10' : 'border-dt-line-strong/60 bg-dt-bg-soft/20'"
    >
      <span class="text-xs font-semibold" :class="engineOn ? 'text-primary' : 'text-muted'">上下文引擎</span>
      <span class="font-mono text-[11px] text-muted">ESS-01</span>
    </div>

    <div class="mt-1.5 grid min-h-0 flex-1 grid-cols-2 items-start gap-2">
      <div
        class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2 transition-opacity duration-500"
        :class="visibleFields > 0 ? 'opacity-100' : 'opacity-0'"
      >
        <p class="text-[11px] font-semibold leading-4 text-highlighted">设备上下文</p>
        <div class="mt-1 grid gap-x-3 gap-y-0.5">
          <div
            v-for="(field, index) in contextFields"
            :key="field[0]"
            class="flex items-baseline justify-between gap-1.5 text-[11px] leading-4 transition-opacity duration-300"
            :class="index < visibleFields ? 'opacity-100' : 'opacity-0'"
          >
            <span class="truncate text-muted">{{ field[0] }}</span>
            <span class="shrink-0 font-mono text-highlighted">{{ field[1] }}</span>
          </div>
        </div>
      </div>

      <div
        class="rounded-lg border border-dt-line-strong/60 bg-dt-bg-soft/20 p-2 transition-opacity duration-500"
        :class="knowledgeOn ? 'opacity-100' : 'opacity-0'"
      >
        <p class="text-[11px] font-semibold leading-4 text-highlighted">知识参考</p>
        <p class="mt-1 text-[11px] leading-4 text-muted">
          持续高温可能与散热异常、电芯一致性下降或充电倍率过高相关。
        </p>
        <p class="mt-1 font-mono text-[11px] leading-4 text-muted">KB-204 · KB-317</p>
      </div>
    </div>

    <p
      class="pt-1.5 text-xs font-medium text-primary transition-opacity duration-500"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    >
      上下文已就绪 · 1.2 秒
    </p>
  </RuntimePanelShell>
</template>
