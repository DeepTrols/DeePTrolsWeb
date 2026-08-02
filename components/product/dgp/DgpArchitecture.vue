<script setup lang="ts">
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SystemCards from '~/components/common/SystemCards.vue'
import { dgpSystemCards } from '~/data/dgp'
</script>

<template>
  <ProductSystemSection
    eyebrow="产品架构"
    title="数据接入 → 智能治理 → 数据赋能"
    title-id="dgp-architecture-title"
    subtitle="统一连接企业多源数据，构建标准化治理体系，持续输出高质量数据资产，为 AI 应用与业务创新提供可靠的数据底座"
    content-flush
    :heading-wide="false"
    :nowrap-subtitle="false"
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame
        label="数曜·数据治理平台产品架构图占位"
        fallback-text="产品架构图占位符"
      />
      <SystemCards :cards="dgpSystemCards" />
    </div>
  </ProductSystemSection>
</template>
