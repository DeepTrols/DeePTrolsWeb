<script setup lang="ts">
import ContactFormSection from '~/components/contact/ContactFormSection.vue'
import ContactHero from '~/components/contact/ContactHero.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'

useSeoMeta({
  title: '联系我们 - DeepTrols',
  description:
    '联系 DeepTrols：提交业务场景与智能化需求，1 个工作日内获得企业级 AI 专属方案反馈；或通过邮箱与我们联系。',
  ogTitle: '联系我们 - DeepTrols',
  ogDescription:
    '联系 DeepTrols：提交业务场景与智能化需求，1 个工作日内获得企业级 AI 专属方案反馈；或通过邮箱与我们联系。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="contact-page">
      <ContactHero />
      <ContactFormSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.contact-page {
  background: var(--dt-color-bg);
}
</style>
