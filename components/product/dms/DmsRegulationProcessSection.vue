<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import { dmsProcessItems } from '~/data/dms'
</script>

<template>
  <ProductFeatureGridSection
    eyebrow="监管流程"
    title="事前预防 → 事中监控 → 事后处置 → 监管分析"
    title-id="dms-regulation-process-title"
    subtitle="从监管规则配置到事件闭环处置，实现数据要素流通全过程智能监管，持续提升风险防控与监管效率。"
    :items="dmsProcessItems"
    columns="three"
    nowrap-subtitle
  >
    <template #before>
      <div class="mb-12 lg:mb-16">
        <ProductSystemFlowFrame
          label="数据要素监管流程图占位"
          fallback-text="数据要素监管流程图占位符"
        />
      </div>
    </template>
  </ProductFeatureGridSection>
</template>
