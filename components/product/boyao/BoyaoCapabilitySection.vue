<script setup lang="ts">
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
import { boyaoCapabilitiesPlaceholder } from '~/data/boyao'
</script>

<template>
  <ProductSystemSection
    eyebrow="核心能力"
    title="让企业知识真正理解业务"
    title-id="boyao-capability-title"
    subtitle="从知识加工、知识表示到知识应用，融合知识库、知识图谱与 AI 能力，让分散知识实现统一沉淀、深度关联与智能应用。"
    content-flush
    :nowrap-subtitle="false"
  >
    <div
      class="mt-12 grid place-items-center rounded-2xl border border-dashed border-muted bg-muted/20 px-6 py-24 text-center lg:mt-16"
      role="note"
    >
      <p class="text-sm text-muted">{{ boyaoCapabilitiesPlaceholder }}</p>
    </div>
  </ProductSystemSection>
</template>
