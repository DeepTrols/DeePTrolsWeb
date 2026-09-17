<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import RegulationArchitectureFlow from '~/components/demo/regulation/RegulationArchitectureFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="解决方案"
    title="构建数据要素流通全过程监管体系"
    title-id="dms-solution-title"
    subtitle="以统一监管规则为核心，结合实时监测、智能预警、工单协同与监管驾驶舱，实现风险自动发现、自动预警、自动处置、全过程留痕。"
    label="数曜·数据要素监管平台解决方案架构图"
    fallback-text="数据要素监管体系架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[480px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <RegulationArchitectureFlow />
      </div>
    </div>
  </ProductArchitectureSection>
</template>
