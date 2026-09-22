<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import DmsRegulationProcessFlow from '~/components/demo/dms-regulation-process/DmsRegulationProcessFlow.client.vue'
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
      <div class="mb-12 max-lg:hidden lg:mb-16">
        <ProductSystemFlowFrame
          label="数据要素监管流程图"
          fallback-text="数据要素监管流程图加载中"
        >
          <div class="relative z-[1] mx-auto h-full w-full overflow-hidden @container">
            <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2 scale-[min(1,calc(100cqw/1704px))]">
              <ClientOnly>
                <DmsRegulationProcessFlow />
                <template #fallback>
                  <div class="size-full" aria-hidden="true"></div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </ProductSystemFlowFrame>
      </div>
    </template>
  </ProductFeatureGridSection>
</template>
