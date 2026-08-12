<script setup lang="ts">
import { Database } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import type { PageHeroAction } from '~/components/common/PageHero.vue'
import DgpHeroVisual from '~/components/product/dgp/DgpHeroVisual.vue'

const heroActions: PageHeroAction[] = [
    { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '申请试用', href: '', variant: 'secondary' as const },
]
</script>

<template>
  <PageHero
    badge="数曜·数据治理平台"
    :badge-icon="Database"
    title-id="dgp-hero-title"
    title-line="可用、可管、可信"
    title-gradient="企业数据底座"
    description="打通多源数据，建立标准化、资产化的数据体系，持续支撑AI应用落地"
    :actions="heroActions"
    visual-label="SHUYAODGP_HORE_WEBM"
    visual-size="large"
  >
    <template #visual>
      <DgpHeroVisual />
    </template>
  </PageHero>
</template>
