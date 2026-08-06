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
    title-line="数据流通安全、可信"
    title-gradient="全流程监管平台"
    description="面向数据要素流通全过程，提供规则配置、风险监测、事件预警、工单处置、监管分析一体化能力，实现事前预防、事中监控、事后追溯的闭环监管"
    visual-label="SHUYAODMS_HORE_WEBM"
    :actions="dmsHeroActions"
  >
    <template #visual>
      <DmsHeroVisual />
    </template>
  </PageHero>
</template>
