<script setup lang="ts">
import { RadioTower } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import type { PageHeroAction } from '~/components/common/PageHero.vue'
import TanyaoHeroVisual from '~/components/product/tanyao/TanyaoHeroVisual.vue'

const heroActions: PageHeroAction[] = [
  { label: '立即咨询', href: '/contact', variant: 'primary' },
  { label: '申请试用', href: '/try', variant: 'secondary' },
]
</script>

<template>
  <PageHero
    badge="探曜·AI物联感知平台"
    :badge-icon="RadioTower"
    title-id="tanyao-hero-title"
    title-line="连接、感知、智能"
    title-gradient="AIoT智能物联底座"
    description="连接设备与现场数据，融合边缘计算、物联网与AI能力，实现设备统一接入、实时感知、智能分析与协同控制。"
    :actions="heroActions"
    visual-label="TANYAOIOT_HORE_WEBM"
    visual-size="large"
    flush-bottom
    flush-visual-end
  >
    <template #visual>
      <TanyaoHeroVisual />
    </template>
  </PageHero>
</template>
