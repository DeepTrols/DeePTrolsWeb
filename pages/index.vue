<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'

useSeoMeta({
  title: 'DeepTrols - 构建企业级 AI 能力体系',
  description: '面向企业客户的数据、知识、智能体与 AI 基础设施建设服务。',
  ogTitle: 'DeepTrols - 构建企业级 AI 能力体系',
  ogDescription: '让数据成为资产，让知识驱动决策，让 AI 创造价值。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <HomeHero />
      <HomeDeliverables />
      <HomeProductSystem />
      <HomeSolutions />
      <HomeEcosystem />
      <HomeInsights />
      <HomeCta />
    </main>
    <SiteFooter />
  </div>
</template>
