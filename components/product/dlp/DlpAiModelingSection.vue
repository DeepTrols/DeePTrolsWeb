<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
</script>

<template>
  <section class="pb-32 lg:pb-44" aria-labelledby="dlp-ai-modeling-title">
    <div class="container grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <SectionHeader
        eyebrow="AI 辅助建标"
        title="通过 AI 快速完成标签设计与建模"
        title-id="dlp-ai-modeling-title"
        subtitle="基于大语言模型理解业务需求，自动生成标签定义、对象模型和加工规则，帮助业务人员快速完成标签设计。"
        align="left"
        width="wide"
      />

      <div
        class="relative min-h-[320px] overflow-hidden rounded-2xl bg-dt-bg-soft/40 lg:min-h-[460px]"
        role="img"
        aria-label="AI 辅助建标图片占位符"
      >
        <div
          class="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] bg-[position:center_center]"
          aria-hidden="true"
        ></div>
        <div class="absolute inset-x-10 top-12 h-24 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
        <div class="absolute inset-8 rounded-2xl border border-dt-line-strong bg-dt-bg/55" aria-hidden="true"></div>
        <div class="absolute inset-0 grid place-items-center text-sm font-medium text-dt-text-muted">
          图片占位符
        </div>
      </div>
    </div>
  </section>
</template>
