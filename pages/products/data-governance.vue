<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DgpArchitecture from '~/components/product/dgp/DgpArchitecture.vue'
import DgpEvolutionSection from '~/components/product/dgp/DgpEvolutionSection.vue'
import DgpHero from '~/components/product/dgp/DgpHero.vue'
import DgpUseCasesSection from '~/components/product/dgp/DgpUseCasesSection.vue'
import { dgpCapabilities, dgpCoreValues, dgpCtaActions } from '~/data/dgp'

useSeoMeta({
  title: '数曜·数据治理平台 - DeepTrols',
  description: '打通多源数据，建立标准化、资产化的数据体系，持续支撑AI应用落地。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DgpHero />
      <ProductFeatureGridSection
        eyebrow="核心价值"
        title="为什么选择数曜·治理数据平台"
        title-id="dgp-core-value-title"
        subtitle="让治理好的数据，安全、高效、稳定地供给业务"
        :items="dgpCoreValues"
        top-padding
      />
      <DgpArchitecture />
      <ProductFeatureGridSection
        eyebrow="产品能力"
        title="专为企业数据治理打造"
        title-id="dgp-capability-title"
        subtitle="统一连接企业多源数据，构建覆盖接入、治理、资产与服务的全生命周期数据治理体系，让数据真正成为企业数字化与 AI 创新的核心生产力。"
        :items="dgpCapabilities"
      />
      <DgpEvolutionSection />
      <DgpUseCasesSection />
      <CtaSection
        title="开启企业数据治理新征程"
        title-id="dgp-cta-title"
        description="统一接入、智能治理、资产运营，让数据成为企业数字化转型与 AI 发展的核心生产力。"
        :actions="dgpCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
