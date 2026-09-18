<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import FdeDeliveryFlow from '~/components/demo/fde-delivery/FdeDeliveryFlow.client.vue'
import FdeSolutionFlow from '~/components/demo/fde-solution/FdeSolutionFlow.client.vue'
import FdeWorkModeFlow from '~/components/demo/fde-work-mode/FdeWorkModeFlow.client.vue'
import FdeCapabilityCardsSection from '~/components/solution/fde/FdeCapabilityCardsSection.vue'
import FdeCustomerCasesSection from '~/components/solution/fde/FdeCustomerCasesSection.vue'
import FdeEvolutionSection from '~/components/solution/fde/FdeEvolutionSection.vue'
import FdeHero from '~/components/solution/fde/FdeHero.vue'
import FdeUseCasesSection from '~/components/solution/fde/FdeUseCasesSection.vue'
import FdeValueSection from '~/components/solution/fde/FdeValueSection.vue'
import {
  fdeDeliveryLabel,
  fdePainPoints,
  fdeSolutionItems,
  fdeSolutionLabel,
  fdeWorkModeLabel,
} from '~/data/solutions/fde'
</script>

<template>
  <main id="main-content">
    <FdeHero />
    <ProductFeatureGridSection
      class="pt-32"
      eyebrow="行业痛点"
      title="企业不缺 AI 技术，真正缺的是把 AI 带进业务现场"
      title-id="fde-pain-title"
      subtitle="大模型、Agent 与 AI 开发工具快速成熟，但企业真实业务往往涉及复杂数据、专业知识、既有系统与组织流程。标准化 AI 产品难以直接适配，传统项目交付又难以跟上 AI 快速迭代的节奏，导致大量项目停留在 Demo 和 PoC 阶段。"
      :items="fdePainPoints"
      columns="two"
      header-width="wide"
    />
    <FdeEvolutionSection />
    <ProductFeatureGridSection
      eyebrow="解决方案"
      title="让工程团队与业务团队共同完成 AI 落地"
      title-id="fde-solution-title"
      subtitle="DeepTrols FDE 以客户真实业务问题为起点，将产品、AI、数据与工程能力带入业务现场，与客户团队共同完成场景识别、数据连接、原型验证、系统集成和生产上线，并基于真实使用反馈持续迭代，让 AI 能力真正融入业务流程。"
      :items="fdeSolutionItems"
      columns="four"
      header-width="wide"
      spacing="compact"
    >
      <template #before>
        <ProductSystemFlowFrame
          :label="fdeSolutionLabel"
          :fallback-text="`${fdeSolutionLabel}加载中`"
          class="mb-10"
        >
          <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
            <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
              <ClientOnly>
                <FdeSolutionFlow :viewport-y="-17" />
                <template #fallback>
                  <div class="size-full" aria-hidden="true"></div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </ProductSystemFlowFrame>
      </template>
    </ProductFeatureGridSection>
    <SectionShell title-id="fde-work-mode-title" spacing="compact">
      <div class="mb-12 lg:mb-16">
        <SectionHeader
          title-id="fde-work-mode-title"
          eyebrow="FDE工作模式"
          title="从业务问题到生产系统，建立 AI 落地闭环"
          align="left"
          width="wide"
        />
      </div>
      <ProductSystemFlowFrame
        :label="fdeWorkModeLabel"
        :fallback-text="`${fdeWorkModeLabel}加载中`"
      >
        <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
          <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
            <ClientOnly>
              <FdeWorkModeFlow :viewport-y="10" />
              <template #fallback>
                <div class="size-full" aria-hidden="true"></div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </ProductSystemFlowFrame>
    </SectionShell>
    <FdeCapabilityCardsSection />
    <FdeValueSection />
    <FdeUseCasesSection />
    <SectionShell title-id="fde-delivery-title" spacing="compact">
      <div class="mb-12 lg:mb-16">
        <SectionHeader
          title-id="fde-delivery-title"
          eyebrow="交付流程"
          title="与业务一起构建，在真实使用中持续迭代"
          align="left"
          width="wide"
        />
      </div>
      <ProductSystemFlowFrame
        :label="fdeDeliveryLabel"
        :fallback-text="`${fdeDeliveryLabel}加载中`"
      >
        <div class="relative z-[1] mx-auto h-full w-[min(1704px,100%)] overflow-hidden">
          <div class="absolute left-1/2 top-1/2 h-[560px] w-[1704px] -translate-x-1/2 -translate-y-1/2">
            <ClientOnly>
              <FdeDeliveryFlow :viewport-y="46" />
              <template #fallback>
                <div class="size-full" aria-hidden="true"></div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </ProductSystemFlowFrame>
    </SectionShell>
    <FdeCustomerCasesSection />
    <CtaSection title-id="fde-cta-title" />
  </main>
</template>
