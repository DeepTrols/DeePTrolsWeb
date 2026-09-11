<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import ManufacturingCapabilityCardsSection from '~/components/solution/manufacturing/ManufacturingCapabilityCardsSection.vue'
import ManufacturingCustomerCasesSection from '~/components/solution/manufacturing/ManufacturingCustomerCasesSection.vue'
import ManufacturingHero from '~/components/solution/manufacturing/ManufacturingHero.vue'
import {
  manufacturingAdvantages,
  manufacturingPains,
  manufacturingSolutionItems,
} from '~/data/solutions/manufacturing'

useSeoMeta({
  title: '智能制造解决方案 - DeepTrols',
  description:
    '融合数曜数据智能、博曜知识中枢、探曜物联感知与智曜 AI 引擎，贯通制造企业设备、数据、知识与业务流程，构建制造智能体系。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <ManufacturingHero />
      <ProductFeatureGridSection
        class="pt-32"
        eyebrow="行业痛点"
        title="制造业智能化转型，仍面临数据、设备、知识与 AI 的多重割裂"
        title-id="manufacturing-pain-title"
        subtitle="设备连接复杂、数据标准不一、系统相互割裂，制造知识难以沉淀复用，AI 与生产现场和业务流程缺乏有效连接，难以形成从感知、分析、决策到执行的智能闭环。"
        :items="manufacturingPains"
        columns="two"
      />
      <ProductFeatureGridSection
        eyebrow="解决方案"
        title="融合数据、知识、物联与 AI，构建制造智能闭环"
        title-id="manufacturing-solution-title"
        subtitle="贯通设备、数据、知识与业务，让 AI 深入制造核心场景，实现从感知、分析到决策与执行的智能闭环。"
        :items="manufacturingSolutionItems"
        spacing="compact"
      >
        <template #before>
          <ProductSystemFlowFrame label="制造智能闭环能力图" class="mb-10" />
        </template>
      </ProductFeatureGridSection>
      <ManufacturingCapabilityCardsSection />
      <ProductFeatureGridSection
        eyebrow=""
        title="为什么选择深度数智"
        title-id="manufacturing-why-title"
        subtitle="融合数据、知识、物联与AI能力，打通从生产现场到企业智能的关键链路，让数据可治理、知识可复用、设备可感知、AI可执行。"
        :items="manufacturingAdvantages"
        columns="three"
        spacing="tight"
        container-spacing="top"
      />
      <ManufacturingCustomerCasesSection />
      <CtaSection title-id="manufacturing-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>
