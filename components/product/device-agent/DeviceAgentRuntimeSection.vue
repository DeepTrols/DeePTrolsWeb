<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { computed, ref } from 'vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import RuntimeContextPanel from '~/components/product/device-agent/runtime/RuntimeContextPanel.vue'
import RuntimeEventPanel from '~/components/product/device-agent/runtime/RuntimeEventPanel.vue'
import RuntimeGuardrailsPanel from '~/components/product/device-agent/runtime/RuntimeGuardrailsPanel.vue'
import RuntimeSkillsPanel from '~/components/product/device-agent/runtime/RuntimeSkillsPanel.vue'
import RuntimeToolsPanel from '~/components/product/device-agent/runtime/RuntimeToolsPanel.vue'
import RuntimeTracePanel from '~/components/product/device-agent/runtime/RuntimeTracePanel.vue'
import { deviceAgentRuntimeTabs } from '~/data/device-agent'
import type { DeviceAgentRuntimeTab } from '~/data/device-agent'
import type { Component } from 'vue'

const panels: Record<DeviceAgentRuntimeTab['id'], Component> = {
  events: RuntimeEventPanel,
  context: RuntimeContextPanel,
  tools: RuntimeToolsPanel,
  skills: RuntimeSkillsPanel,
  guardrails: RuntimeGuardrailsPanel,
  trace: RuntimeTracePanel,
}

const activeTab = ref(0)

const active = computed(() => deviceAgentRuntimeTabs[activeTab.value] ?? deviceAgentRuntimeTabs[0])
const activePanel = computed(() => panels[active.value?.id ?? 'events'])
</script>

<template>
  <SectionShell title-id="device-agent-runtime-title">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="device-agent-runtime-title"
        eyebrow="核心能力"
        title="为设备事件而生的 Agent Runtime"
        subtitle="从事件触发、多源上下文到工具调用与设备执行，构建设备侧 AI 的运行时基础，让预警、处置、派单与设备操作形成自动化闭环。"
        align="center"
        width="wide"
        nowrap-subtitle
      />
    </div>

    <div class="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10">
      <div class="flex flex-col gap-2">
        <button
          v-for="(tab, index) in deviceAgentRuntimeTabs"
          :key="tab.id"
          type="button"
          class="group relative flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300"
          :class="
            index === activeTab
              ? 'border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5'
              : 'border-transparent bg-transparent hover:bg-dt-bg-soft/50'
          "
          :aria-pressed="index === activeTab"
          @click="activeTab = index"
        >
          <span
            class="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-300"
            :class="index === activeTab ? 'opacity-100' : 'opacity-0'"
            aria-hidden="true"
          ></span>
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
            :class="
              index === activeTab ? 'bg-primary/15 text-primary' : 'bg-dt-bg-soft/60 text-muted group-hover:text-highlighted'
            "
          >
            <component :is="tab.icon" class="size-5" aria-hidden="true" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="block text-[15px] font-semibold transition-colors duration-300"
              :class="index === activeTab ? 'text-highlighted' : 'text-muted'"
            >
              {{ tab.label }}
            </span>
          </span>
          <ChevronRight
            class="size-4 shrink-0 transition-all duration-300"
            :class="
              index === activeTab
                ? 'translate-x-0 text-primary opacity-100'
                : '-translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-40'
            "
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="relative">
        <component :is="activePanel" :key="active?.id" />
      </div>
    </div>
  </SectionShell>
</template>
