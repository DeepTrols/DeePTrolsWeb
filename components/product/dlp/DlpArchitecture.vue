<script setup lang="ts">
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import ProductSystemSection from '~/components/common/ProductSystemSection.vue'
</script>

<template>
  <ProductSystemSection
    eyebrow="解决方案"
    title="轻松构建企业标签体系"
    title-id="dlp-solution-title"
    subtitle="统一标签标准、生产、治理与服务能力，让标签从创建到应用形成一体化闭环。"
    content-flush
  >
    <div class="mt-12 lg:mt-16">
      <ProductSystemFlowFrame
        label="数曜·数据标签平台解决方案架构图占位"
        fallback-text="标签体系架构图占位符"
      />
    </div>
  </ProductSystemSection>
</template>
