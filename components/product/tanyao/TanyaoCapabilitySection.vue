<script setup lang="ts">
import AlternatingTimelineSection from '~/components/common/AlternatingTimelineSection.vue'
import { tanyaoTimelineItems } from '~/data/tanyao'
</script>

<template>
  <AlternatingTimelineSection
    eyebrow="核心能力"
    title="为智能感知而生，每一层都深度融合"
    title-id="tanyao-capability-title"
    subtitle="不止连接设备，更融合边缘计算与 AI，让感知、分析、决策与执行形成闭环。"
    :items="tanyaoTimelineItems"
  />
</template>
