<script setup lang="ts">
import ProductSystemCards from '~/components/common/ProductSystemCards.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import HomeProductSystemFlow from '~/components/home/HomeProductSystemFlow.vue'
import HomeProductSystemMobileFlow from '~/components/home/HomeProductSystemMobileFlow.vue'
import { platformInputs, platformOutputs, productCards } from '~/data/home'
</script>

<template>
  <ProductSystemSection
    eyebrow="DeepTrols OPS"
    title="连接真实业务与人工智能"
    title-id="product-system-title"
    subtitle="以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。"
  >
    <HomeProductSystemFlow
      label="DeepTrols OPS platform architecture"
      fallback-text="DeepTrolsOS 能力图加载中"
    />
    <HomeProductSystemMobileFlow
      label="DeepTrolsOS 移动端能力结构"
      :inputs="platformInputs"
      :outputs="platformOutputs"
    />
    <ProductSystemCards :cards="productCards" />
  </ProductSystemSection>
</template>
