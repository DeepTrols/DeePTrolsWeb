<script setup lang="ts">
import AlternatingTimelineSection from '~/components/common/AlternatingTimelineSection.vue'
import { ddpTimelineItems } from '~/data/ddp'
</script>

<template>
  <AlternatingTimelineSection
    eyebrow="核心能力"
    title="覆盖数据开发全生命周期"
    title-id="ddp-capability-flow-title"
    subtitle="从数据集成、开发、编排到调度与运维，提供完整的数据开发能力，帮助企业构建高质量、高效率的数据生产体系。"
    :items="ddpTimelineItems"
  />
</template>
