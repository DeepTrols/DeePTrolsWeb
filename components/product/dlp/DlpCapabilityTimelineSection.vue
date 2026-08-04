<script setup lang="ts">
import AlternatingTimelineSection from '~/components/common/AlternatingTimelineSection.vue'
import { dlpTimelineItems } from '~/data/dlp'
</script>

<template>
  <AlternatingTimelineSection
    eyebrow="核心能力"
    title="让每一个标签创造价值"
    title-id="dlp-capability-flow-title"
    subtitle="数曜·数据标签平台覆盖标签建模、生产、治理、服务与应用全流程，让企业标签更易构建、更易管理、更易复用。"
    :items="dlpTimelineItems"
  />
</template>
