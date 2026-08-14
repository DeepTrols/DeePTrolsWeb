<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import TanyaoCapabilitySection from '~/components/product/tanyao/TanyaoCapabilitySection.vue'
import TanyaoHero from '~/components/product/tanyao/TanyaoHero.vue'
import TanyaoSolutionSection from '~/components/product/tanyao/TanyaoSolutionSection.vue'
import TanyaoStatsSection from '~/components/product/tanyao/TanyaoStatsSection.vue'
import { tanyaoAgents, tanyaoChallenges, tanyaoCtaActions } from '~/data/tanyao'

useSeoMeta({
  title: '探曜·AI物联感知平台 - DeepTrols',
  description:
    '连接设备与现场数据，融合边缘计算、物联网与AI能力，实现设备统一接入、实时感知、智能分析与协同控制。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <TanyaoHero />
      <TanyaoStatsSection />
      <ProductFeatureGridSection
        eyebrow="挑战"
        title="AI 时代，IoT 平台面临新挑战"
        title-id="tanyao-challenge-title"
        subtitle="当 AI 从云端走向物理世界，传统 IoT 平台的能力边界正在被重新定义"
        :items="tanyaoChallenges"
        nowrap-subtitle
      />
      <TanyaoSolutionSection />
      <TanyaoCapabilitySection />
      <ProductFeatureGridSection
        eyebrow="Device Agent"
        title="让AI真正服务物理世界的运行与决策"
        title-id="tanyao-agent-title"
        subtitle="围绕loT实时数据、业务规则与场景流程，提供可直接落地的AI产品与应用"
        :items="tanyaoAgents"
        columns="three"
        nowrap-subtitle
      />
      <CtaSection
        title="让每一次连接都产生智能价值"
        title-id="tanyao-cta-title"
        description="连接设备与现场数据，以边缘计算与 AI 能力驱动实时感知、智能分析与高效决策。"
        :actions="tanyaoCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
