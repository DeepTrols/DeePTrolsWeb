<script setup lang="ts">
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
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
  >
    <SystemCards :cards="dgpSystemCards" />
  </ProductSystemSection>
</template>
