<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import { deviceAgentValueItems } from '~/data/device-agent'
</script>

<template>
  <ProductFeatureGridSection
    eyebrow="核心价值"
    title="Device Agent解决的三个关键问题"
    title-id="device-agent-value-title"
    subtitle="Device Agent 打通设备事件、实时数据、AI 决策与设备执行，让 Agent 能够感知现场、理解状态并自主完成工业任务。"
    :items="deviceAgentValueItems"
    columns="three"
    :icon-bordered="false"
    nowrap-subtitle
  />
</template>
