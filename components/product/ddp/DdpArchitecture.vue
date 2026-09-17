<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import SmartDataHubFlow from '~/components/demo/smart-data-hub/SmartDataHubFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="解决方案"
    title="构建智能数据开发体系"
    title-id="ddp-solution-title"
    subtitle="覆盖数据集成、开发、编排、调度与运维全流程，打造统一、高效、智能的数据开发平台，加速企业数据生产与价值释放。"
    label="数曜·数据开发平台解决方案架构图"
    fallback-text="数据开发体系架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <SmartDataHubFlow />
      </div>
    </div>
  </ProductArchitectureSection>
</template>
