<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
</script>

<template>
  <ProductSystemSection
    eyebrow="架构图"
    title="统一知识架构：连接、理解与应用"
    title-id="boyao-architecture-title"
    subtitle="以统一知识架构贯通知识采集、加工、组织与应用，让企业知识从分散沉淀走向智能理解与持续应用。"
    content-flush
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame label="博曜·企业级知识管理平台统一知识架构图占位" fallback-text="统一知识架构图占位符" />
    </div>
  </ProductSystemSection>
</template>
