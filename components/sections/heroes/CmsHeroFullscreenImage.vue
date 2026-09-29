<script setup lang="ts">
import { computed } from 'vue'

// CMS hero · fullscreen-image 变体（015.18）：复制 HomeHero 模板与 scoped 样式（类名原样），
// 文案全部 props 化；背景图改 img 绝对定位 + object-cover（禁 inline style / background-image）
const props = defineProps<{
  titleId: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage: string
}>()

const lines = computed(() => (props.titleLines.length > 0 ? props.titleLines : ['']))
</script>

<template>
  <section class="home-hero" :aria-labelledby="titleId">
    <img class="home-hero__bg" :src="backgroundImage" alt="" aria-hidden="true">
    <div class="home-hero__overlay" aria-hidden="true"></div>
    <div class="home-shell home-hero__content pt-40 pb-32 lg:pb-44">
      <h1 :id="titleId">
        <span v-for="line in lines" :key="line">{{ line }}</span>
      </h1>
      <p v-if="subtitle" class="home-hero__subtitle">{{ subtitle }}</p>
      <NuxtLink v-if="ctaLabel && ctaHref" class="home-hero__cta" :to="ctaHref">
        <span>{{ ctaLabel }}</span>
        <span class="home-hero__cta-arrow" aria-hidden="true"></span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1920 / 655;
  min-height: 420px;
  color: #ffffff;
}

.home-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.home-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0, rgba(0, 0, 0, 0.26) 38%, rgba(0, 0, 0, 0) 62%);
  pointer-events: none;
}

.home-hero__content {
  position: relative;
  width: var(--dt-container);
  height: 100%;
  max-width: none;
}

h1 {
  position: absolute;
  top: clamp(78px, 10.729vw, 206px);
  left: 0;
  width: min(763px, 100%);
  max-width: 100%;
  margin: 0;
  background: linear-gradient(104.09deg, #1e44e0 -15.53%, #ffffff 36.62%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 500;
  line-height: clamp(38px, 3.75vw, 72px);
  letter-spacing: 0;
  -webkit-text-fill-color: transparent;

  span {
    display: block;
  }
}

.home-hero__subtitle {
  position: absolute;
  top: clamp(150px, 19.74vw, 379px);
  left: 0;
  width: min(494px, 100%);
  max-width: 100%;
  margin: 0;
  color: #ffffff;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: clamp(14px, 0.885vw, 17px);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 1px;
}

.home-hero__cta {
  position: absolute;
  top: clamp(205px, 24.375vw, 468px);
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 277px;
  height: 47px;
  gap: 8px;
  background: linear-gradient(90deg, #1e44e0, #6583ff);
  color: #ffffff;
  padding: 0 18px 0 24px;
  font-family: "Source Han Sans CN", "Noto Sans SC", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease,
    filter 200ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 12px 28px rgba(30, 68, 224, 0.24);
    filter: saturate(1.08);
    transform: translateY(-2px);
  }
}

.home-hero__cta-arrow {
  position: relative;
  width: 24px;
  height: 8px;
  flex: 0 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 0;
    width: 21px;
    height: 2px;
    background: currentcolor;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid currentcolor;
    border-right: 2px solid currentcolor;
    transform: rotate(45deg);
  }
}

@media (max-width: 700px) {
  .home-hero {
    aspect-ratio: auto;
    min-height: 540px;
  }

  .home-hero__bg {
    object-position: 63% 50%;
  }

  .home-hero__overlay {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.28) 68%, rgba(0, 0, 0, 0.05) 100%);
  }

  .home-hero__content {
    z-index: 1;
  }

  h1 {
    top: 142px;
    font-size: 32px;
    line-height: 1.32;
  }

  .home-hero__subtitle {
    top: 270px;
    font-size: 15px;
  }

  .home-hero__cta {
    top: 340px;
    width: min(277px, 100%);
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__cta {
    transition: none;
  }

  .home-hero__cta:hover,
  .home-hero__cta:focus-visible {
    transform: none;
  }
}
</style>
