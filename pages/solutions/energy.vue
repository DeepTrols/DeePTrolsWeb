<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import EnergySavingCapabilityCardsSection from '~/components/solution/energy-saving/EnergySavingCapabilityCardsSection.vue'
import EnergySavingCustomerCasesSection from '~/components/solution/energy-saving/EnergySavingCustomerCasesSection.vue'
import EnergySavingHero from '~/components/solution/energy-saving/EnergySavingHero.vue'
import EnergySavingValueSection from '~/components/solution/energy-saving/EnergySavingValueSection.vue'
import { energySavingPains } from '~/data/solutions/energy-saving'

useSeoMeta({
  title: '智慧储能解决方案 - DeepTrols',
  description:
    '融合探曜·AI 物联感知与数曜·数据治理能力，构建贯通设备、数据与业务的储能数字化底座，支撑运行监测、能效分析、故障预警、健康评估与充放电策略智能优化。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <EnergySavingHero />
      <ProductFeatureGridSection
        class="pt-32"
        eyebrow="行业痛点"
        title="储能规模化运营，仍受制于设备异构、数据孤岛与智能协同不足"
        title-id="energy-saving-pain-title"
        subtitle="PCS、BMS、EMS 及各类计量与环境设备接入复杂，运行数据标准不一、系统相互独立，设备状态与业务数据难以统一关联，难以形成从实时感知、数据治理、状态分析到策略优化的智能运营闭环。"
        :items="energySavingPains"
        columns="two"
        header-width="wide"
      />
      <SectionShell title-id="energy-saving-system-title" spacing="compact">
        <div class="mb-12 text-center lg:mb-16">
          <SectionHeader
            title-id="energy-saving-system-title"
            eyebrow="行业痛点"
            title="构建设备感知与数据驱动的智慧储能运营体系"
            subtitle="融合探曜·AI 物联感知与数曜·数据治理能力，打通 PCS、BMS、EMS 及各类储能设备与业务系统，实现统一接入、实时感知、数据治理与运行分析，构建从设备监测、状态评估到故障预警与策略优化的一体化智慧储能解决方案。"
            align="center"
            width="wide"
          />
        </div>
        <ProductSystemFlowFrame label="储能智能运营能力图" />
      </SectionShell>
      <EnergySavingCapabilityCardsSection />
      <EnergySavingValueSection />
      <EnergySavingCustomerCasesSection />
      <CtaSection title-id="energy-saving-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>
