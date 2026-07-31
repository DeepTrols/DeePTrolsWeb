<script setup lang="ts">
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import EnterpriseFlow from '~/components/flow/EnterpriseFlow.client.vue'
import { platformInputs, platformOutputs, productCards } from '~/data/home'
</script>

<template>
  <ProductSystemSection
    eyebrow="DeepTrols OPS"
    title="连接真实业务与人工智能"
    title-id="product-system-title"
    subtitle="以数据与知识底座桥接企业业务与人工智能。赋能 AI Agent，实现对真实业务的支撑。"
    desktop-flow-label="DeepTrols OPS platform architecture"
    mobile-flow-label="DeepTrolsOS 移动端能力结构"
    flow-fallback-text="DeepTrolsOS 能力图加载中"
    :inputs="platformInputs"
    :outputs="platformOutputs"
    :cards="productCards"
  >
    <template #desktop-flow>
      <ClientOnly>
        <EnterpriseFlow />
        <template #fallback>
          <div class="product-system__flow-fallback">DeepTrolsOS 能力图加载中</div>
        </template>
      </ClientOnly>
    </template>
  </ProductSystemSection>
</template>

<style scoped lang="scss">
.product-system__flow-fallback {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--dt-color-text-muted);
}
</style>
