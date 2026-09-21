<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import DlpAiModelingVisual from '~/components/product/dlp/DlpAiModelingVisual.vue'
</script>

<template>
  <section class="flow-root pb-32 lg:pb-44" aria-labelledby="dlp-ai-modeling-title">
    <div class="container grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <SectionHeader
        eyebrow="AI 辅助建标"
        title="通过 AI 快速完成标签设计与建模"
        title-id="dlp-ai-modeling-title"
        subtitle="基于大语言模型理解业务需求，自动生成标签定义、对象模型和加工规则，帮助业务人员快速完成标签设计。"
        align="left"
        width="wide"
      />

      <DlpAiModelingVisual />
    </div>
  </section>
</template>
