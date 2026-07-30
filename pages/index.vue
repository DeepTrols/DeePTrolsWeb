<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'

useSeoMeta({
  title: 'DeepTrols - 构建企业级 AI 能力体系',
  description: '面向企业客户的数据、知识、智能体与 AI 基础设施建设服务。',
  ogTitle: 'DeepTrols - 构建企业级 AI 能力体系',
  ogDescription: '让数据成为资产，让知识驱动决策，让 AI 创造价值。',
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <div class="home-hero-deliverables">
        <video
          class="home-hero-deliverables__video"
          src="/花瓣素材_+暖蓝光泄漏背景可循环_465316undefined (1) 2.mp4"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          aria-hidden="true"
        ></video>
        <div class="home-hero-deliverables__mask" aria-hidden="true"></div>
        <HomeHero />
        <HomeDeliverables />
      </div>
      <HomeProductSystem />
      <HomeSolutions />
      <HomeEcosystem />
      <HomeCases />
      <HomeInsights />
      <HomeCta />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.home-hero-deliverables {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--dt-color-bg);
}

.home-hero-deliverables__video,
.home-hero-deliverables__mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home-hero-deliverables__video {
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-hero-deliverables__mask {
  z-index: -1;
  background:
    linear-gradient(
      180deg,
      rgba(21, 21, 21, 0.95) 0%,
      rgba(21, 21, 21, 0.78) 14%,
      rgba(21, 21, 21, 0) 36%,
      rgba(21, 21, 21, 0) 62%,
      var(--dt-color-bg) 100%
    ),
    rgba(21, 21, 21, 0.4);
}
</style>
