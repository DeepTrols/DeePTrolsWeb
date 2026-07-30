<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import BaseButton from '~/components/common/BaseButton.vue'
import HomeCustomerLogos from '~/components/home/HomeCustomerLogos.vue'
import robotVisualSrc from '../../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/robot.webm?url'
</script>

<template>
  <section class="why-hero relative overflow-hidden bg-dt-bg" aria-labelledby="why-hero-title">
    <div class="why-hero__background" aria-hidden="true">
      <div class="why-hero__grid"></div>
      <div class="why-hero__glow why-hero__glow--left"></div>
      <div class="why-hero__glow why-hero__glow--right"></div>
    </div>

    <div class="container why-hero__body relative pt-24 pb-24 lg:pt-32 lg:pb-32">
      <div
        class="why-hero__inner flex flex-col items-center gap-12 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1fr)] lg:items-stretch lg:justify-center lg:gap-16"
      >
        <div class="why-hero__content w-full max-w-2xl text-center lg:text-left">
          <div class="why-hero__badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Sparkles class="why-hero__badge-icon" :size="16" aria-hidden="true" />
            <span>为什么选择 DeepTrols</span>
          </div>

          <div class="why-hero__title-block">
            <h1 id="why-hero-title">
              <span class="why-hero__title-line">数据、知识、智能统一</span>
              <span class="why-hero__title-gradient">企业级AI应用服务商</span>
            </h1>
          </div>

          <div class="why-hero__description-block">
            <p class="why-hero__description">
              从数据工程、知识工程到智能体应用，DeepTrols 为企业提供可落地、可交付、可持续演进的 AI 服务。
            </p>
          </div>

          <div class="why-hero__actions flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <BaseButton href="/contact" variant="primary" size="lg">立即咨询</BaseButton>
            <BaseButton href="/about" variant="secondary" size="lg">关于我们</BaseButton>
          </div>
        </div>

        <div class="why-hero__visual relative isolate flex w-full max-w-[820px] self-stretch justify-self-center overflow-visible">
          <div class="why-hero__visual-glow" aria-hidden="true"></div>
          <figure class="relative m-0 h-[360px] w-full overflow-hidden lg:h-full">
            <video
              :src="robotVisualSrc"
              class="absolute left-1/2 top-[46%] h-[132%] w-[132%] !max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-[0.94] mix-blend-screen [filter:saturate(1.08)_contrast(1.04)] [mask-image:radial-gradient(76%_72%_at_50%_48%,#000_58%,rgba(0,0,0,0.72)_74%,transparent_100%)]"
              aria-label="DeepTrols Agentic solution 工作流示意"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
            ></video>
          </figure>
        </div>
      </div>

      <div class="why-hero__logos mt-24 border-t border-dt-line pt-12 lg:mt-28">
        <HomeCustomerLogos />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-hero {
  isolation: isolate;
}

.why-hero__background {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  mask-image: linear-gradient(#000 55%, transparent 92%);
}

.why-hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(94, 78, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 78, 255, 0.08) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(80% 60% at 50% 40%, #000 30%, transparent 80%);
  opacity: 0.7;
}

.why-hero__glow {
  position: absolute;
  border-radius: 9999px;
  background: var(--dt-color-primary-soft);
  filter: blur(140px);
}

.why-hero__glow--left {
  top: -25%;
  left: -25%;
  width: 600px;
  height: 600px;
}

.why-hero__glow--right {
  top: -20%;
  right: -25%;
  width: 500px;
  height: 500px;
  opacity: 0.5;
}

.why-hero__badge {
  border: 1px solid rgba(94, 78, 255, 0.2);
  background: var(--dt-color-primary-soft);
  color: var(--dt-color-primary);

  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}

.why-hero__badge-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: var(--dt-color-primary);
}

.why-hero__title-block {
  margin: 0;
}

h1 {
  margin: 0 0 24px;
  color: var(--dt-color-text-highlighted);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
}

.why-hero__title-line,
.why-hero__title-gradient {
  display: block;
}

.why-hero__title-gradient {
  background: var(--dt-gradient-text);
  background-clip: text;
  color: transparent;
}

.why-hero__description-block {
  margin: 0;
}

.why-hero__description {
  max-width: 576px;
  margin: 0 auto 32px;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.625;
}

.why-hero__visual-glow {
  position: absolute;
  inset: -12%;
  z-index: -1;
  border-radius: 9999px;
  background:
    radial-gradient(closest-side at 50% 46%, rgba(94, 78, 255, 0.24), transparent 72%),
    radial-gradient(closest-side at 70% 36%, rgba(86, 154, 255, 0.14), transparent 76%);
  filter: blur(34px);
  opacity: 0.86;
}

.why-hero__logos :deep(.customer-logos) {
  padding-top: 0;
}

@media (min-width: 640px) {
  h1 {
    font-size: 48px;
  }

  .why-hero__description {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 60px;
  }

  .why-hero__description {
    margin-right: 0;
    margin-left: 0;
  }

  .why-hero__glow--left {
    width: 900px;
    height: 900px;
  }

  .why-hero__glow--right {
    width: 700px;
    height: 700px;
  }
}
</style>
