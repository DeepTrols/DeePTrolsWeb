<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import BoyaoArchitectureSection from '~/components/product/boyao/BoyaoArchitectureSection.vue'
import BoyaoCapabilitySection from '~/components/product/boyao/BoyaoCapabilitySection.vue'
import BoyaoCoreValueSection from '~/components/product/boyao/BoyaoCoreValueSection.vue'
import BoyaoHero from '~/components/product/boyao/BoyaoHero.vue'
import BoyaoIntegrationSection from '~/components/product/boyao/BoyaoIntegrationSection.vue'
import { boyaoChallenges, boyaoCtaActions, boyaoFeatures } from '~/data/boyao'

useSeoMeta({
  title: '博曜·企业级知识管理平台 - DeepTrols',
  description:
    '连接企业分散知识，统一完成知识采集、解析、组织与管理，为智能检索、知识问答与企业 AI 应用提供高质量知识底座。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <BoyaoHero />
      <ProductFeatureGridSection
        eyebrow="挑战"
        title="传统管理模式很难对知识进行挖掘"
        title-id="boyao-challenge-title"
        subtitle="知识文档来源分散、安全合格要求严格,传统的管理模式很难对知识价值进行挖掘，进而有效支撑业务。"
        :items="boyaoChallenges"
        nowrap-subtitle
      />
      <BoyaoCoreValueSection />
      <BoyaoArchitectureSection />
      <BoyaoCapabilitySection />
      <ProductFeatureGridSection
        eyebrow="功能"
        title="安全·合规·高效·智能"
        title-id="boyao-feature-title"
        subtitle="六大核心功能-助力组织构建安全、合规、高效、智能的知识文档管理平台。"
        :items="boyaoFeatures"
        columns="three"
        nowrap-subtitle
      />
      <BoyaoIntegrationSection />
      <CtaSection
        title="开启企业知识智能化之旅"
        title-id="boyao-cta-title"
        description="让分散知识统一沉淀，让企业知识真正服务每一个业务场景。"
        :actions="boyaoCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
