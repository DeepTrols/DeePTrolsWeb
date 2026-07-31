<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import type { Component } from 'vue'

export interface PageHeroAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

withDefaults(
  defineProps<{
    badge: string
    badgeIcon?: Component
    titleId: string
    titleLine: string
    titleGradient: string
    description: string
    actions: PageHeroAction[]
    visualLabel?: string
  }>(),
  {
    badgeIcon: undefined,
    visualLabel: undefined,
  },
)
</script>

<template>
  <section class="page-hero relative overflow-hidden bg-dt-bg" :aria-labelledby="titleId">
    <div class="page-hero__background" aria-hidden="true">
      <div class="page-hero__grid"></div>
      <div class="page-hero__glow page-hero__glow--left"></div>
      <div class="page-hero__glow page-hero__glow--right"></div>
    </div>

    <div class="container page-hero__body relative pt-24 pb-24 lg:pt-32 lg:pb-32">
      <div
        class="page-hero__inner flex flex-col items-center gap-12 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1fr)] lg:items-stretch lg:justify-center lg:gap-16"
      >
        <div class="page-hero__content w-full max-w-2xl text-center lg:text-left">
          <div class="page-hero__badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <component
              :is="badgeIcon"
              v-if="badgeIcon"
              class="page-hero__badge-icon"
              :size="16"
              aria-hidden="true"
            />
            <span>{{ badge }}</span>
          </div>

          <div class="page-hero__title-block">
            <h1 :id="titleId">
              <span class="page-hero__title-line">{{ titleLine }}</span>
              <span class="page-hero__title-gradient">{{ titleGradient }}</span>
            </h1>
          </div>

          <div class="page-hero__description-block">
            <p class="page-hero__description">{{ description }}</p>
          </div>

          <div class="page-hero__actions flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <BaseButton
              v-for="action in actions"
              :key="action.label"
              :href="action.href"
              :variant="action.variant ?? 'primary'"
              size="lg"
            >
              {{ action.label }}
            </BaseButton>
          </div>
        </div>

        <div
          class="page-hero__visual relative isolate flex w-full max-w-[820px] self-stretch justify-self-center overflow-visible"
          :aria-label="visualLabel"
        >
          <div class="page-hero__visual-glow" aria-hidden="true"></div>
          <slot name="visual" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-hero {
  isolation: isolate;
}

.page-hero__background {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  mask-image: linear-gradient(#000 55%, transparent 92%);
}

.page-hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(94, 78, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 78, 255, 0.08) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(80% 60% at 50% 40%, #000 30%, transparent 80%);
  opacity: 0.7;
}

.page-hero__glow {
  position: absolute;
  border-radius: 9999px;
  background: var(--dt-color-primary-soft);
  filter: blur(140px);
}

.page-hero__glow--left {
  top: -25%;
  left: -25%;
  width: 600px;
  height: 600px;
}

.page-hero__glow--right {
  top: -20%;
  right: -25%;
  width: 500px;
  height: 500px;
  opacity: 0.5;
}

.page-hero__badge {
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

.page-hero__badge-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: var(--dt-color-primary);
}

.page-hero__title-block,
.page-hero__description-block {
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

.page-hero__title-line,
.page-hero__title-gradient {
  display: block;
}

.page-hero__title-gradient {
  background: var(--dt-gradient-text);
  background-clip: text;
  color: transparent;
}

.page-hero__description {
  max-width: 576px;
  margin: 0 auto 32px;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.625;
}

.page-hero__visual-glow {
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

@media (min-width: 640px) {
  h1 {
    font-size: 48px;
  }

  .page-hero__description {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 60px;
  }

  .page-hero__description {
    margin-right: 0;
    margin-left: 0;
  }

  .page-hero__glow--left {
    width: 900px;
    height: 900px;
  }

  .page-hero__glow--right {
    width: 700px;
    height: 700px;
  }
}
</style>
