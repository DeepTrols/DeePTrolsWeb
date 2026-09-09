<script setup lang="ts">
import { Boxes } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import DlpHeroVisual from '~/components/product/dlp/DlpHeroVisual.vue'
</script>

<template>
  <PageHero
    background-image-src="/images/products/product-hero-bg.png"
    badge="数曜·数据标签平台"
    :badge-icon="Boxes"
    title-id="dlp-hero-title"
    title-line="协同、智能、高效"
    title-gradient="标签生产平台"
    description="覆盖标签生产全流程，实现标签标准化、数据高质量和高效率生产，为精准运营与智能决策提供支撑"
    visual-label="SHUYAODGP_HORE_WEBM"
    visual-size="large"
  >
    <template #visual>
      <DlpHeroVisual />
    </template>
  </PageHero>
</template>
