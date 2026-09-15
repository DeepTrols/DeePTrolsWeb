<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DatacenterHero from '~/components/solution/datacenter/DatacenterHero.vue'
import DatacenterScenariosSection from '~/components/solution/datacenter/DatacenterScenariosSection.vue'
import {
  datacenterCapabilities,
  datacenterLoopLabel,
  datacenterPains,
  datacenterSolutionLabel,
} from '~/data/solutions/datacenter'

useSeoMeta({
  title: '算电协同运营方案 - DeepTrols',
  description:
    '统筹算力、电力、冷却与储能，统一预测算力需求、冷却负荷、电价、绿电出力及储能状态，动态优化能源供给和算力运行策略，实现算力与能源资源的协同运营。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DatacenterHero />
      <ProductFeatureGridSection
        class="pt-32"
        eyebrow="行业痛点"
        title="算力规模持续增长，传统分系统运营难以实现全局最优"
        title-id="datacenter-pain-title"
        subtitle="高密度 GPU 集群带来更高、更动态的能源需求，但算力调度、电力供应、制冷控制和储能运行通常由不同系统分别管理，缺乏统一预测和联动优化机制，容易出现资源错配、峰值负荷过高和能源成本增加。"
        :items="datacenterPains"
        columns="two"
        header-width="wide"
      />
      <SectionShell title-id="datacenter-solution-title" spacing="compact">
        <div class="mb-12 text-center lg:mb-16">
          <SectionHeader
            title-id="datacenter-solution-title"
            eyebrow="解决方案"
            title="构建算力与能源协同优化的统一运营体系"
            subtitle="以算力需求为核心，将电力、冷却、储能和新能源资源纳入统一预测与优化框架，持续计算不同运行策略下的成本、容量和运行约束，动态生成算力与能源协同调度策略。"
            align="center"
            width="wide"
          />
        </div>
        <ProductSystemFlowFrame :label="datacenterSolutionLabel" />
      </SectionShell>
      <ProductFeatureGridSection
        eyebrow="核心能力"
        title="从分系统优化走向算电协同全局优化"
        title-id="datacenter-capability-title"
        subtitle=""
        :items="datacenterCapabilities"
        columns="four"
      />
      <SectionShell title-id="datacenter-loop-title" spacing="compact">
        <div class="mb-12 text-center lg:mb-16">
          <SectionHeader
            title-id="datacenter-loop-title"
            eyebrow="运营闭环"
            title="预测、优化、执行、反馈持续闭环"
            align="center"
            width="wide"
          />
        </div>
        <ProductSystemFlowFrame :label="datacenterLoopLabel" />
      </SectionShell>
      <DatacenterScenariosSection />
      <CtaSection title-id="datacenter-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>
