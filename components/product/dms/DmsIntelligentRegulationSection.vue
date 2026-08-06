<script setup lang="ts">
import AlternatingTimelineSection from '~/components/common/AlternatingTimelineSection.vue'
import { dmsTimelineItems } from '~/data/dms'
</script>

<template>
  <AlternatingTimelineSection
    eyebrow="智能监管"
    title="智能监管，全程守护"
    title-id="dms-intelligent-regulation-title"
    subtitle="从规则制定到风险处置，全程保障数据要素安全、合规、高效流通。"
    :items="dmsTimelineItems"
  />
</template>
