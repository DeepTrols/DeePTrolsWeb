<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import HomeCustomerLogos from '~/components/home/HomeCustomerLogos.vue'

const agenticSolutionSrc = new URL('../../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/Agentic solution V1.gif', import.meta.url).href
</script>

<template>
  <section class="why-hero" aria-labelledby="why-hero-title">
    <div class="why-hero__background" aria-hidden="true">
      <div class="why-hero__grid"></div>
      <div class="why-hero__glow why-hero__glow--left"></div>
      <div class="why-hero__glow why-hero__glow--right"></div>
    </div>

    <div class="container why-hero__inner">
      <div class="why-hero__content">
        <p class="why-hero__eyebrow">企业级AI应用服务商</p>
        <h1 id="why-hero-title">
          为什么选择 <span>DeepTrols</span>
        </h1>
        <p class="why-hero__subtitle">数据、知识、智能统一</p>
        <p class="why-hero__description">
          从数据工程、知识工程到智能体应用，DeepTrols 为企业提供可落地、可交付、可持续演进的 AI 服务。
        </p>
        <div class="why-hero__actions">
          <BaseButton href="/contact" variant="primary" size="lg">立即咨询</BaseButton>
          <BaseButton href="/about" variant="secondary" size="lg">关于我们</BaseButton>
        </div>
      </div>

      <div class="why-hero__visual">
        <div class="why-hero__visual-glow" aria-hidden="true"></div>
        <figure>
          <img :src="agenticSolutionSrc" alt="DeepTrols Agentic solution 工作流示意" />
        </figure>
      </div>
    </div>

    <div class="container why-hero__logos">
      <HomeCustomerLogos />
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-hero {
  position: relative;
  overflow: hidden;
  background: var(--dt-color-bg);
  padding: 144px 0 96px;
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

.why-hero__inner {
  display: grid;
  align-items: center;
  gap: 48px;
}

.why-hero__content {
  max-width: 720px;
}

.why-hero__eyebrow {
  margin: 0 0 18px;
  color: var(--dt-color-accent-muted);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

h1 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 48px;
  font-weight: 760;
  line-height: 1.08;
  letter-spacing: 0;

  span {
    background: var(--dt-gradient-text);
    background-clip: text;
    color: transparent;
  }
}

.why-hero__subtitle {
  margin: 22px 0 0;
  color: var(--dt-color-text-highlighted);
  font-size: 24px;
  font-weight: 650;
  line-height: 1.35;
}

.why-hero__description {
  max-width: 640px;
  margin: 18px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.75;
}

.why-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 36px;
}

.why-hero__visual {
  position: relative;
  width: 100%;
  max-width: 620px;
  justify-self: center;
  isolation: isolate;
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

figure {
  position: relative;
  margin: 0;
}

img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: saturate(1.08) contrast(1.04);
  mask-image: radial-gradient(76% 72% at 50% 48%, #000 58%, rgba(0, 0, 0, 0.72) 74%, transparent 100%);
  mix-blend-mode: screen;
  opacity: 0.94;
}

.why-hero__logos {
  margin-top: 96px;
  border-top: 1px solid var(--dt-color-line);
}

.why-hero__logos :deep(.customer-logos) {
  padding-top: 48px;
}

@media (min-width: 1024px) {
  .why-hero {
    padding-top: 164px;
    padding-bottom: 112px;
  }

  .why-hero__inner {
    grid-template-columns: minmax(0, 1fr) minmax(420px, 0.78fr);
    gap: 72px;
  }

  h1 {
    font-size: 72px;
  }

  .why-hero__description {
    font-size: 20px;
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

@media (max-width: 640px) {
  .why-hero {
    padding-top: 112px;
  }

  h1 {
    font-size: 42px;
  }

  .why-hero__subtitle {
    font-size: 20px;
  }
}
</style>
