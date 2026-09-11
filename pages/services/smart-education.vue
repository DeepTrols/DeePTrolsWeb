<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ProductSystemFlowFrame from '~/components/common/ProductSystemFlowFrame.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import EducationAgentFlowSection from '~/components/solution/education/EducationAgentFlowSection.vue'
import EducationCapabilityCardsSection from '~/components/solution/education/EducationCapabilityCardsSection.vue'
import EducationCustomerCasesSection from '~/components/solution/education/EducationCustomerCasesSection.vue'
import EducationHero from '~/components/solution/education/EducationHero.vue'
import EducationValueSection from '~/components/solution/education/EducationValueSection.vue'
import { educationAgents, educationPains } from '~/data/solutions/education'

useSeoMeta({
  title: '智慧教育解决方案 - DeepTrols',
  description:
    '基于智曜·智能引擎，统一接入大模型、知识、工具与校园业务系统，构建面向教育场景的 AI 智能体与智能工作流，为教学、学习、教务和校园服务提供可持续扩展的智能能力，推动教育从数字化应用走向 AI 原生。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <EducationHero />
      <ProductFeatureGridSection
        class="pt-32"
        eyebrow="行业痛点"
        title="教育 AI 加速落地，仍面临模型、应用与业务流程的多重断点"
        title-id="education-pain-title"
        subtitle="大模型正在快速进入教育场景，但通用模型难以直接理解教学业务，AI 应用与教务、教学及校园系统相互割裂，模型、知识与工具缺乏统一连接，难以从简单问答真正走向可执行的教育智能体。"
        :items="educationPains"
        columns="two"
        header-width="wide"
      />
      <SectionShell title-id="education-system-title" spacing="compact">
        <div class="mb-12 text-center lg:mb-16">
          <SectionHeader
            title-id="education-system-title"
            eyebrow="解决方案"
            title="构建面向教育业务的 AI 智能体运行底座"
            subtitle="基于智曜统一连接大模型、知识、MCP、Tools 与校园业务系统，为教育智能体提供模型调用、任务编排、工具执行和运行治理能力，快速构建覆盖“教、学、管、服”的教育智能体体系，让 AI 从回答问题进一步走向理解任务、调用工具和完成业务。"
            align="center"
            width="wide"
          />
        </div>
        <ProductSystemFlowFrame label="教育智能体运行底座能力图" />
      </SectionShell>
      <EducationCapabilityCardsSection />
      <EducationValueSection />
      <EducationAgentFlowSection />
      <ProductFeatureGridSection
        eyebrow="教育智能体"
        title="为“教、学、管、研、服”配置专属 AI 智能体"
        title-id="education-agent-title"
        subtitle="基于智曜·智能引擎，将大模型、教育知识、业务数据与校园系统能力按场景组合，为教师、学生、管理人员和科研人员构建专属 AI 智能体，让智能能力深入备课、学习、教务、科研与校园服务全过程，从辅助问答进一步走向任务协同与业务执行。"
        :items="educationAgents"
        columns="three"
        header-width="wide"
        spacing="compact"
      />
      <EducationCustomerCasesSection />
      <CtaSection title-id="education-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>
