<script setup lang="ts">
import ProductSystemCards from '~/components/common/ProductSystemCards.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import { productCards } from '~/data/home'
</script>

<template>
  <ProductSystemSection
    eyebrow="DeepTrols OPS"
    title="连接真实业务与人工智能"
    title-id="product-system-title"
    subtitle="以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。"
  >
    <ProductSystemFlowFrame
      label="DeepTrols OPS 产品架构图占位"
      fallback-text="产品架构图占位符"
    />
    <ProductSystemCards :cards="productCards" />
  </ProductSystemSection>
</template>
