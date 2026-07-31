<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import PageHero from '~/components/common/PageHero.vue'
import robotVisualSrc from '../../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/robot.webm?url'

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
    visual-label="DeepTrols Agentic solution 工作流示意"
  >
    <template #visual>
      <figure class="why-hero__figure relative m-0 h-[360px] w-full overflow-hidden lg:h-full">
        <video
          :src="robotVisualSrc"
          class="absolute left-1/2 top-[46%] h-[132%] w-[132%] !max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-[0.94] mix-blend-screen [filter:saturate(1.08)_contrast(1.04)] [mask-image:radial-gradient(76%_72%_at_50%_48%,#000_58%,rgba(0,0,0,0.72)_74%,transparent_100%)]"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
        ></video>
      </figure>
    </template>
  </PageHero>
</template>

<style scoped lang="scss">
.why-hero__figure {
  width: 100%;
}
</style>
