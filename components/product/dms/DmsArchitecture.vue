<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
</script>

<template>
  <ProductSystemSection
    eyebrow="解决方案"
    title="构建数据要素流通全过程监管体系"
    title-id="dms-solution-title"
    subtitle="以统一监管规则为核心，结合实时监测、智能预警、工单协同与监管驾驶舱，实现风险自动发现、自动预警、自动处置、全过程留痕。"
    content-flush
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame
        label="数曜·数据要素监管平台解决方案架构图占位"
        fallback-text="数据要素监管体系架构图占位符"
      />
    </div>
  </ProductSystemSection>
</template>
