<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import WhyHero from '~/components/why/WhyHero.vue'
import WhyHeroLogos from '~/components/why/WhyHeroLogos.vue'

useSeoMeta({
  title: 'Why DeepTrols - 为什么选择 DeepTrols',
  description: '了解 DeepTrols 如何通过数据工程、知识工程与智能体应用，帮助企业构建可落地、可交付、可持续演进的 AI 能力。',
  ogTitle: 'Why DeepTrols - 为什么选择 DeepTrols',
  ogDescription: '数据、知识、智能统一，构建企业级 AI 能力体系。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="why-page">
      <WhyHero />
      <WhyHeroLogos />
      <CtaSection title-id="why-cta-title" />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.why-page {
  background: var(--dt-color-bg);
}
</style>
