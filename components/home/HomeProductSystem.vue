<script setup lang="ts">
import ProductSystemCards from '~/components/common/ProductSystemCards.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import DeepTrolsArchitectureFlow from '~/components/flow/DeepTrolsArchitectureFlow.client.vue'
import { productCards } from '~/data/home'
</script>

<template>
  <ProductSystemSection
    eyebrow="DeepTrols OPS"
    title="连接真实业务与人工智能"
    title-id="product-system-title"
    subtitle="以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。"
    padded-top
  >
    <ProductSystemFlowFrame
      label="DeepTrols OPS 产品架构图"
    >
      <div class="relative z-[1] mx-auto h-full w-[min(1600px,100%)]">
        <DeepTrolsArchitectureFlow />
      </div>
    </ProductSystemFlowFrame>
    <ProductSystemCards :cards="productCards" />
  </ProductSystemSection>
</template>
