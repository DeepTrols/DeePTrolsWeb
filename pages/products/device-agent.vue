<script setup lang="ts">
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import DeviceAgentArchitectureSection from '~/components/product/device-agent/DeviceAgentArchitectureSection.vue'
import DeviceAgentHero from '~/components/product/device-agent/DeviceAgentHero.vue'
import DeviceAgentRuntimeSection from '~/components/product/device-agent/DeviceAgentRuntimeSection.vue'
import DeviceAgentValueSection from '~/components/product/device-agent/DeviceAgentValueSection.vue'
import { tanyaoAgents } from '~/data/tanyao'

useSeoMeta({
  title: 'Device Agent - DeepTrols',
  description:
    'Device Agent是运行在本地或云端的事件驱动Agent Runtime，原生连接时序数据、知识库与设备，可快速实现设备自动预警、事件处置、工单派发等任务。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <DeviceAgentHero />
      <ProductFeatureGridSection
        eyebrow="智能体生态"
        title="让 AI 进入 IoT 业务现场的场景智能体"
        title-id="device-agent-ecosystem-title"
        subtitle="围绕设备、运维、报告、能耗与管理场景，探曜将 AI 封装为可落地的场景智能体，帮助企业更低门槛地把 AI 用在真实业务中。"
        :items="tanyaoAgents"
        columns="three"
        nowrap-subtitle
      />
      <DeviceAgentArchitectureSection />
      <DeviceAgentValueSection />
      <DeviceAgentRuntimeSection />
    </main>
    <SiteFooter />
  </div>
</template>
