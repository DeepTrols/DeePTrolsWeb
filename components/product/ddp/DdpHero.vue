<script setup lang="ts">
import { Network } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import DdpHeroVisual from '~/components/product/ddp/DdpHeroVisual.vue'
import { ddpHeroActions } from '~/data/ddp'
</script>

<template>
  <PageHero
    badge="数曜·数据开发平台"
    :badge-icon="Network"
    title-id="ddp-hero-title"
    title-line="标准、智能、高效"
    title-gradient="标签生产平台"
    description="连接数据采集、处理、开发与调度全流程，打造统一的数据工程体系，为企业 AI 与数据应用提供可靠的数据底座。"
    visual-label="SHUYAODDP_HORE_WEBM"
    :actions="ddpHeroActions"
  >
    <template #visual>
      <DdpHeroVisual />
    </template>
  </PageHero>
</template>
