<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
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
        <div class="why-hero__badge">
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
  padding: 144px 0 0;
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
  width: 100%;
  max-width: 672px;
  text-align: center;
}

.why-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  border: 1px solid rgba(94, 78, 255, 0.2);
  border-radius: 9999px;
  background: var(--dt-color-primary-soft);
  color: var(--dt-color-primary);
  padding: 8px 16px;

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

.why-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.why-hero__visual {
  position: relative;
  width: 100%;
  max-width: 760px;
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

  &::after {
    position: absolute;
    inset: -1px;
    background:
      linear-gradient(180deg, var(--dt-color-bg) 0%, rgba(21, 21, 21, 0.68) 9%, rgba(21, 21, 21, 0) 24%, rgba(21, 21, 21, 0) 76%, rgba(21, 21, 21, 0.7) 91%, var(--dt-color-bg) 100%),
      linear-gradient(90deg, var(--dt-color-bg) 0%, rgba(21, 21, 21, 0.66) 8%, rgba(21, 21, 21, 0) 24%, rgba(21, 21, 21, 0) 76%, rgba(21, 21, 21, 0.66) 92%, var(--dt-color-bg) 100%);
    content: "";
    pointer-events: none;
  }
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

@media (min-width: 640px) {
  h1 {
    font-size: 48px;
  }

  .why-hero__description {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .why-hero {
    padding-top: 164px;
  }

  .why-hero__inner {
    grid-template-columns: minmax(0, 0.88fr) minmax(520px, 1fr);
    gap: 64px;
  }

  .why-hero__content {
    text-align: left;
  }

  h1 {
    font-size: 60px;
  }

  .why-hero__description {
    margin-right: 0;
    margin-left: 0;
  }

  .why-hero__actions {
    justify-content: flex-start;
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
}
</style>
