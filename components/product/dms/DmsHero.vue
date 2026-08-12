<script setup lang="ts">
import { HardDrive } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import DmsHeroVisual from '~/components/product/dms/DmsHeroVisual.vue'
import { dmsHeroActions } from '~/data/dms'
</script>

<template>
  <PageHero
    badge="数曜·数据要素监管平台"
    :badge-icon="HardDrive"
    title-id="dms-hero-title"
    title-line="让数据流通安全、可信"
    title-gradient="全流程监管平台"
    description="保障数据安全、合规、高效流通。"
    visual-label="SHUYAODMS_HORE_WEBM"
    :actions="dmsHeroActions"
  >
    <template #visual>
      <DmsHeroVisual />
    </template>
  </PageHero>
</template>
