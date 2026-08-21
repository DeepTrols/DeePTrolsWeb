<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import SystemCards from '~/components/common/SystemCards.vue'
import { dgpSystemCards } from '~/data/dgp'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="产品架构"
    title="数据接入 → 智能治理 → 数据赋能"
    title-id="dgp-architecture-title"
    subtitle="统一连接企业多源数据，构建标准化治理体系，持续输出高质量数据资产，为 AI 应用与业务创新提供可靠的数据底座"
    label="数曜·数据治理平台产品架构图占位"
    fallback-text="产品架构图占位符"
  >
    <template #after>
      <SystemCards :cards="dgpSystemCards" />
    </template>
  </ProductArchitectureSection>
</template>
