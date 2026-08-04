<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DlpAiModelingSection from '~/components/product/dlp/DlpAiModelingSection.vue'
import DlpArchitecture from '~/components/product/dlp/DlpArchitecture.vue'
import DlpCapabilityTimelineSection from '~/components/product/dlp/DlpCapabilityTimelineSection.vue'
import DlpHero from '~/components/product/dlp/DlpHero.vue'
import { dlpAdvantages, dlpAssetItems, dlpChallengeItems, dlpCtaActions, dlpUseCaseItems } from '~/data/dlp'

useSeoMeta({
  title: '数曜·数据标签平台 - DeepTrols',
  description: '覆盖标签生产全流程，实现标签标准化、数据高质量和高效率生产，为精准运营与智能决策提供支撑。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DlpHero />
      <ProductFeatureGridSection
        id="dlp-challenge"
        eyebrow="挑战"
        title="厌倦了低效的标签建设？"
        title-id="dlp-challenge-title"
        subtitle="传统的数据标签建设方式依赖人工开发与分散管理，难以支撑企业数据治理和 AI 应用的持续发展。"
        :items="dlpChallengeItems"
        nowrap-subtitle
      />
      <DlpArchitecture />
      <ProductFeatureGridSection
        eyebrow="核心优势"
        title="构建统一的企业标签体系"
        title-id="dlp-advantage-title"
        subtitle="专为企业数据治理、精准运营与 AI 应用打造的一体化标签平台。"
        :items="dlpAdvantages"
        nowrap-subtitle
      />
      <DlpCapabilityTimelineSection />
      <ProductFeatureGridSection
        eyebrow="标签沉淀"
        title="从数据对象到标签服务"
        title-id="dlp-asset-title"
        subtitle="围绕企业数据标签全生命周期，覆盖对象建模、标签定义、自动加工与服务发布，让标签快速转化为可共享、可复用的数据资产。"
        :items="dlpAssetItems"
        columns="two"
        nowrap-subtitle
      />
      <DlpAiModelingSection />
      <ProductFeatureGridSection
        eyebrow="应用场景"
        title="为企业 AI 场景赋能"
        title-id="dlp-use-cases-title"
        subtitle="构建统一的企业标签体系，支撑用户洞察、精准运营和 AI 应用，让标签持续释放数据价值。"
        :items="dlpUseCaseItems"
        columns="three"
        nowrap-subtitle
      />
      <CtaSection
        title="构建企业自身的AI能力"
        title-id="dlp-cta-title"
        description="让数据成为资产，让知识驱动决策，让AI创造价值"
        :actions="dlpCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
