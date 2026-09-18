<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import BoyaoIntegrationFlow from '~/components/demo/boyao-integration/BoyaoIntegrationFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="系统集成"
    title="集成 → 采集 → 调用"
    title-id="boyao-integration-title"
    subtitle="博曜提供强大的集成引擎，从异构系统中自动采集知识文档，形成整个组织的统一知识文档库，同时为异构系统提供知识文档的调用服务。"
    :nowrap-subtitle="false"
    label="博曜系统集成架构图"
    fallback-text="系统集成架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <ClientOnly>
          <BoyaoIntegrationFlow :viewport-y="16" />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </ProductArchitectureSection>
</template>
