<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import SystemCards from '~/components/common/SystemCards.vue'
import { tanyaoSolutionCards } from '~/data/tanyao'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="解决方案"
    title="多源接入 → 边缘感知 → AI 驱动"
    title-id="tanyao-solution-title"
    subtitle="统一连接设备、传感器与工业系统，通过边缘实时采集与计算融合 AI 分析能力，让现场数据从实时感知走向智能决策。"
    label="探曜·AI物联感知平台解决方案流程图占位"
    fallback-text="解决方案流程图占位符"
  >
    <template #after>
      <SystemCards :cards="tanyaoSolutionCards" />
    </template>
  </ProductArchitectureSection>
</template>
