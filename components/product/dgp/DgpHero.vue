<script setup lang="ts">
import { Database } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import DgpHeroVisual from '~/components/product/dgp/DgpHeroVisual.vue'
</script>

<template>
  <PageHero
    background-image-src="/images/products/product-hero-bg.png"
    badge="数曜·数据治理平台"
    :badge-icon="Database"
    title-id="dgp-hero-title"
    title-line="可用、可管、可信"
    title-gradient="企业数据底座"
    description="打通多源数据，建立标准化、资产化的数据体系，持续支撑AI应用落地"
    visual-label="SHUYAODGP_HORE_WEBM"
    visual-size="large"
  >
    <template #visual>
      <DgpHeroVisual />
    </template>
  </PageHero>
</template>
