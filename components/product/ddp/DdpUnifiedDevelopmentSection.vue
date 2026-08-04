<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import { ddpUnifiedDevelopmentItems } from '~/data/ddp'
</script>

<template>
  <ProductFeatureGridSection
    eyebrow="统一数据开发"
    title="统一数据开发：从接入到交付"
    title-id="ddp-unified-development-title"
    subtitle="覆盖数据接入、开发、编排与持续交付全流程，构建统一、智能、高效的数据开发体系，为企业持续输出高质量数据资产。"
    :items="ddpUnifiedDevelopmentItems"
    nowrap-subtitle
  >
    <template #after>
      <div class="mt-12 lg:mt-16">
        <ProductSystemFlowFrame
          label="统一数据开发流程图占位"
          fallback-text="统一数据开发流程图占位符"
        />
      </div>
    </template>
  </ProductFeatureGridSection>
</template>
