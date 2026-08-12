<script setup lang="ts">
import FeatureCard from '~/components/common/card/FeatureCard.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import type { Component } from 'vue'

export interface ServiceShowcaseItem {
  title: string
  description: string
  icon: Component
}

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle?: string
    items: ServiceShowcaseItem[]
    imageSrc?: string
    imageAlt?: string
    fallbackText?: string
    reverse?: boolean
  }>(),
  {
    subtitle: undefined,
    imageSrc: undefined,
    imageAlt: '',
    fallbackText: undefined,
    reverse: false,
  },
)
</script>

<template>
  <section class="service-showcase dt-section relative pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container service-showcase__grid" :class="reverse && 'service-showcase__grid--reverse'">
      <div class="service-showcase__content">
        <SectionHeader :eyebrow="eyebrow" :title="title" :title-id="titleId" :subtitle="subtitle" />

        <div class="service-showcase__items">
          <FeatureCard
            v-for="item in items"
            :key="item.title"
            class="service-showcase__item"
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
            layout="horizontal"
            variant="soft"
            padding="md"
            title-size="md"
            description-size="md"
            tone="primary"
            :show-accent="false"
            :equal-height="false"
          />
        </div>
      </div>

      <figure class="service-showcase__visual">
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" />
        <div
          v-else
          class="service-showcase__placeholder"
          role="img"
          :aria-label="fallbackText ?? imageAlt ?? `${title} 配图占位符`"
        >
          <span v-if="fallbackText">{{ fallbackText }}</span>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped lang="scss">
.service-showcase__grid {
  display: grid;
  align-items: center;
  gap: 48px;
}

.service-showcase__items {
  display: grid;
  gap: 16px;
  margin-top: 40px;
}

.service-showcase__visual {
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-lg);
  background:
    radial-gradient(80% 80% at 50% 0%, rgba(94, 78, 255, 0.18), transparent 65%),
    var(--dt-color-bg-soft);
  box-shadow: var(--dt-shadow-card);
}

.service-showcase__placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1120 / 660;
  color: var(--dt-color-text-muted);
  font-size: 14px;
  font-weight: 500;
}

img {
  width: 100%;
  aspect-ratio: 1120 / 660;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .service-showcase__grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1fr);
    gap: 72px;
  }

  .service-showcase__grid--reverse {
    .service-showcase__content {
      order: 2;
    }

    .service-showcase__visual {
      order: 1;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-showcase__item {
    &:hover {
      transform: none;
    }
  }
}
</style>
