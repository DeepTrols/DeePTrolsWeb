<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DdpArchitecture from '~/components/product/ddp/DdpArchitecture.vue'
import DdpCapabilityTimelineSection from '~/components/product/ddp/DdpCapabilityTimelineSection.vue'
import DdpHero from '~/components/product/ddp/DdpHero.vue'
import DdpUnifiedDevelopmentSection from '~/components/product/ddp/DdpUnifiedDevelopmentSection.vue'
import { ddpAdvantages, ddpChallengeItems, ddpCtaActions, ddpUseCaseItems } from '~/data/ddp'

useSeoMeta({
  title: '数曜·数据开发平台 - DeepTrols',
  description: '连接数据采集、处理、开发与调度全流程，打造统一的数据工程体系，为企业 AI 与数据应用提供可靠的数据底座。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DdpHero />
      <ProductFeatureGridSection
        id="ddp-challenge"
        eyebrow="挑战"
        title="数据开发，正在成为企业增长瓶颈"
        title-id="ddp-challenge-title"
        subtitle="随着企业数据规模持续增长，传统数据开发模式已难以满足敏捷交付、实时计算和规模化生产需求。"
        :items="ddpChallengeItems"
        nowrap-subtitle
      />
      <DdpArchitecture />
      <ProductFeatureGridSection
        eyebrow="核心优势"
        title="持续释放企业数据生产力"
        title-id="ddp-advantage-title"
        subtitle="通过统一的数据开发平台，实现开发标准化、流程自动化与资源智能化，让数据生产更加高效、可靠、可持续。"
        :items="ddpAdvantages"
        columns="two"
        nowrap-subtitle
      />
      <DdpCapabilityTimelineSection />
      <DdpUnifiedDevelopmentSection />
      <ProductFeatureGridSection
        eyebrow="应用场景"
        title="赋能企业数据工程实践"
        title-id="ddp-use-cases-title"
        subtitle="面向数据治理、实时计算、智能分析与 AI 应用等场景，提供覆盖数据开发全生命周期的平台能力，加速企业数据价值持续释放。"
        :items="ddpUseCaseItems"
        columns="three"
        nowrap-subtitle
      />
      <CtaSection
        title="开启企业数据治理新征程"
        title-id="ddp-cta-title"
        description="统一接入、智能治理、资产运营，让数据成为企业数字化转型与 AI 发展的核心生产力。"
        :actions="ddpCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
