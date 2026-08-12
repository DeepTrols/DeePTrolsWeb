<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DmsArchitecture from '~/components/product/dms/DmsArchitecture.vue'
import DmsBusinessValueSection from '~/components/product/dms/DmsBusinessValueSection.vue'
import DmsHero from '~/components/product/dms/DmsHero.vue'
import DmsIntelligentRegulationSection from '~/components/product/dms/DmsIntelligentRegulationSection.vue'
import DmsRegulationProcessSection from '~/components/product/dms/DmsRegulationProcessSection.vue'
import { dmsCapabilities, dmsChallengeItems, dmsCtaActions, dmsUseCaseItems } from '~/data/dms'

useSeoMeta({
  title: '数曜·数据要素监管平台 - DeepTrols',
  description: '实现数据要素全流程智能监管，保障数据安全、合规、高效流通。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DmsHero />
      <ProductFeatureGridSection
        id="dms-challenge"
        eyebrow="挑战"
        title="数据流通不断扩大 监管能力亟需升级"
        title-id="dms-challenge-title"
        subtitle="随着数据产品开发、交易、交付与应用规模不断增长，传统人工监管方式难以及时识别风险、统一执行规则，也难以形成完整的监管闭环"
        :items="dmsChallengeItems"
        nowrap-subtitle
      />
      <DmsArchitecture />
      <ProductFeatureGridSection
        eyebrow="核心能力"
        title="要素全流程监管能力"
        title-id="dms-capability-title"
        subtitle="覆盖数据要素流通全过程，实现风险可感知、事件可追溯、监管可闭环。"
        :items="dmsCapabilities"
        columns="three"
        nowrap-subtitle
      />
      <DmsIntelligentRegulationSection />
      <DmsBusinessValueSection />
      <DmsRegulationProcessSection />
      <ProductFeatureGridSection
        eyebrow="应用场景"
        title="赋能多场景数据要素监管"
        title-id="dms-use-cases-title"
        subtitle="面向数据要素流通全生命周期，为监管部门、交易平台、运营机构等不同角色提供智能化监管能力，保障数据流通安全、合规、有序开展。"
        :items="dmsUseCaseItems"
        columns="two"
        nowrap-subtitle
      />
      <CtaSection
        title="开启智能化数据要素监管"
        title-id="dms-cta-title"
        description="构建智能化数据要素监管体系，护航数据安全、高效、可信流通。"
        :actions="dmsCtaActions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
