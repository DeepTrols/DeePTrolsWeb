<script setup lang="ts">
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import TagPlatformArchitectureFlow from '~/components/demo/tag-platform/TagPlatformArchitectureFlow.client.vue'
</script>

<template>
  <ProductArchitectureSection
    eyebrow="解决方案"
    title="轻松构建企业标签体系"
    title-id="dlp-solution-title"
    subtitle="统一标签标准、生产、治理与服务能力，让标签从创建到应用形成一体化闭环。"
    label="数曜·数据标签平台解决方案架构图"
    fallback-text="标签体系架构图加载中"
  >
    <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
      <div class="absolute left-1/2 top-1/2 h-[640px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
        <TagPlatformArchitectureFlow />
      </div>
    </div>
  </ProductArchitectureSection>
</template>
