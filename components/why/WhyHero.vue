<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import WhyHeroVisual from '~/components/why/WhyHeroVisual.vue'

const heroActions = [
  { label: '立即咨询', href: '/contact', variant: 'primary' as const },
  { label: '关于我们', href: '/about', variant: 'secondary' as const },
]
</script>

<template>
  <PageHero
    badge="为什么选择 DeepTrols"
    :badge-icon="Sparkles"
    title-id="why-hero-title"
    title-line="数据、知识、智能统一"
    title-gradient="企业级AI应用服务商"
    description="从数据工程、知识工程到智能体应用，DeepTrols 为企业提供可落地、可交付、可持续演进的 AI 服务。"
    :actions="heroActions"
    visual-label="DeepTrols Agentic solution 架构示意"
    flush-bottom
    visual-size="large"
  >
    <template #visual>
      <figure class="why-hero__figure relative m-0 flex w-full items-center justify-center lg:h-full">
        <div class="w-full max-w-[728px]">
          <WhyHeroVisual />
        </div>
      </figure>
    </template>
  </PageHero>
</template>

<style scoped lang="scss">
.why-hero__figure {
  width: 100%;
}
</style>
