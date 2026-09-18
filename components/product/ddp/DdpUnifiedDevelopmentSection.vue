<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import DdpUnifiedDevelopmentFlow from '~/components/demo/ddp-unified-development/DdpUnifiedDevelopmentFlow.client.vue'
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
          label="统一数据开发流程图"
          fallback-text="统一数据开发流程图加载中"
        >
          <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
            <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
              <ClientOnly>
                <DdpUnifiedDevelopmentFlow :viewport-y="16" />
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
