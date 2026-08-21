<script setup lang="ts">
import EngineLinksSection from '~/components/common/EngineLinksSection.vue'
import { whyEngineLinks } from '~/data/why'

const engineDescription =
  '重塑引擎是DeepTrols持续实现自我重塑的核心能力体系。它推动我们不断打造更专业、更深厚的行业与技术能力，以 AI 赋能服务交付，持续引领技术创新，并沉淀最先进的工具、方法论与实践体系。'
</script>

<template>
  <EngineLinksSection
    eyebrow="Reinvention Engine"
    title="重塑引擎"
    title-id="why-engine-title"
    :description="engineDescription"
    :links="whyEngineLinks"
  />
</template>
