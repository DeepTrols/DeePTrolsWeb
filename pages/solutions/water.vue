<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import HydraulicCapabilityCardsSection from '~/components/solution/hydraulic/HydraulicCapabilityCardsSection.vue'
import HydraulicCustomerCasesSection from '~/components/solution/hydraulic/HydraulicCustomerCasesSection.vue'
import HydraulicHero from '~/components/solution/hydraulic/HydraulicHero.vue'
import HydraulicValueSection from '~/components/solution/hydraulic/HydraulicValueSection.vue'
import { hydraulicPains } from '~/data/solutions/hydraulic'

useSeoMeta({
  title: '智慧水利解决方案 - DeepTrols',
  description:
    '融合数曜·数据治理与博曜·企业级知识管理能力，构建覆盖知识治理、知识图谱、智能检索与业务推理的智慧水利知识中枢，为防洪减灾、水资源管理及“四预”业务提供决策支撑。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <HydraulicHero />
      <ProductFeatureGridSection
        class="pt-32"
        eyebrow="行业痛点"
        title="水利数字化持续深化，数据与知识价值仍未充分释放"
        title-id="hydraulic-pain-title"
        subtitle="水利基础数据、实时监测数据与业务资料持续积累，但数据分散、标准不一，预案、规则、历史案例与专家经验难以形成统一知识体系，跨业务关联分析与智能决策仍高度依赖人工。"
        :items="hydraulicPains"
        columns="two"
        header-width="wide"
      />
      <SectionShell title-id="hydraulic-system-title" spacing="compact">
        <div class="mb-12 text-center lg:mb-16">
          <SectionHeader
            title-id="hydraulic-system-title"
            eyebrow="解决方案"
            title="构建数据与知识双轮驱动的智慧水利知识中枢"
            subtitle="以数曜构建统一、可信的水利数据底座，以博曜将预案、规则、历史场景、专业资料与专家经验转化为可管理、可检索、可关联、可推理的水利知识资产，形成从数据治理 → 知识构建 → 知识服务 → 智能决策的完整能力体系。"
            align="center"
            width="wide"
          />
        </div>
        <ProductSystemFlowFrame label="智慧水利知识中枢能力图" />
      </SectionShell>
      <HydraulicCapabilityCardsSection />
      <HydraulicValueSection />
      <HydraulicCustomerCasesSection />
      <CtaSection title-id="hydraulic-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>
