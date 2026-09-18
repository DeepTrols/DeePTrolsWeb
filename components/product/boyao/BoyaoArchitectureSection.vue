<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import KnowledgeHubFlow from '~/components/demo/knowledge-hub/KnowledgeHubFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="架构图"
    title="统一知识架构：连接、理解与应用"
    title-id="boyao-architecture-title"
    subtitle="以统一知识架构贯通知识采集、加工、组织与应用，让企业知识从分散沉淀走向智能理解与持续应用。"
    label="博曜·企业级知识管理平台统一知识架构图"
    fallback-text="统一知识架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[520px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <ClientOnly>
          <KnowledgeHubFlow />
          <template #fallback>
            <div class="size-full" aria-hidden="true"></div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </ProductArchitectureSection>
</template>
