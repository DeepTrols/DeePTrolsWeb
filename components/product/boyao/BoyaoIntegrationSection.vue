<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
</script>

<template>
  <ProductSystemSection
    eyebrow="系统集成"
    title="集成 → 采集 → 调用"
    title-id="boyao-integration-title"
    subtitle="博曜提供强大的集成引擎，从异构系统中自动采集知识文档，形成整个组织的统一知识文档库，同时为异构系统提供知识文档的调用服务。"
    content-flush
    :nowrap-subtitle="false"
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame label="博曜·企业级知识管理平台系统集成流程图占位" fallback-text="系统集成流程图占位符" />
    </div>
  </ProductSystemSection>
</template>
