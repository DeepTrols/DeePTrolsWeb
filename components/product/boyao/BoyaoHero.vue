<script setup lang="ts">
import { BookOpen } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import BoyaoHeroVisual from '~/components/product/boyao/BoyaoHeroVisual.vue'
</script>

<template>
  <PageHero
    background-image-src="/images/products/product-hero-bg.png"
    badge="博曜·企业级知识管理平台"
    :badge-icon="BookOpen"
    title-id="boyao-hero-title"
    title-line="汇聚、理解、激活"
    title-gradient="企业知识管理平台"
    description="连接企业分散知识，统一完成知识采集、解析、组织与管理，为智能检索、知识问答与企业 AI 应用提供高质量知识底座。"
    visual-label="BOYAOKNOWLEDGE_HORE_WEBM"
    visual-size="large"
  >
    <template #visual>
      <BoyaoHeroVisual />
    </template>
  </PageHero>
</template>
