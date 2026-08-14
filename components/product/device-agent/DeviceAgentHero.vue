<script setup lang="ts">
import { Cpu } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import DeviceAgentHeroVisual from '~/components/product/device-agent/DeviceAgentHeroVisual.vue'
</script>

<template>
  <PageHero
    badge="Device Agent"
    :badge-icon="Cpu"
    title-id="device-agent-hero-title"
    title-line="让Agent基于实时数据决策与行动"
    title-gradient="串联事件、记忆、执行和决策"
    description="Device Agent是运行在本地或云端的事件驱动Agent Runtime，原生连接时序数据、知识库与设备，可快速实现设备自动预警、事件处置、工单派发等任务。"
    :actions="[]"
    visual-label="DEVICEAGENT_HORE_WEBM"
    align="center"
  >
    <template #visual>
      <DeviceAgentHeroVisual />
    </template>
  </PageHero>
</template>
