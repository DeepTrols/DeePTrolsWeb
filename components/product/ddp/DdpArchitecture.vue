<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
</script>

<template>
  <ProductSystemSection
    eyebrow="解决方案"
    title="构建智能数据开发体系"
    title-id="ddp-solution-title"
    subtitle="覆盖数据集成、开发、编排、调度与运维全流程，打造统一、高效、智能的数据开发平台，加速企业数据生产与价值释放。"
    content-flush
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame
        label="数曜·数据开发平台解决方案架构图占位"
        fallback-text="数据开发体系架构图占位符"
      />
    </div>
  </ProductSystemSection>
</template>
