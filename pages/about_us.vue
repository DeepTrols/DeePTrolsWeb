<script setup lang="ts">
import AboutAddressSection from '~/components/about/AboutAddressSection.vue'
import AboutContactSection from '~/components/about/AboutContactSection.vue'
import AboutHero from '~/components/about/AboutHero.vue'
import AboutIntroSection from '~/components/about/AboutIntroSection.vue'
import AboutValuesSection from '~/components/about/AboutValuesSection.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'

useSeoMeta({
  title: '关于深度数智（DEEPTROLS） - DeepTrols',
  description: '武汉深度数智科技有限公司专注企业级AI落地与能力构建，帮助企业将人工智能转化为业务生产力。',
  ogTitle: '关于深度数智（DEEPTROLS） - DeepTrols',
  ogDescription: '构建企业级AI能力体系，让智能成为业务增长的新引擎。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="about-page">
      <AboutHero />
      <AboutIntroSection />
      <AboutValuesSection />
      <AboutAddressSection />
      <AboutContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.about-page {
  background: var(--dt-color-bg);
}
</style>
