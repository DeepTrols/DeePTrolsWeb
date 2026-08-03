<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import type { Component } from 'vue'

export interface ServiceShowcaseItem {
  title: string
  description: string
  icon: Component
}

defineProps<{
  eyebrow: string
  title: string
  titleId: string
  items: ServiceShowcaseItem[]
  imageSrc: string
  imageAlt: string
}>()
</script>

<template>
  <section class="service-showcase dt-section relative pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container service-showcase__grid">
      <div class="service-showcase__content">
        <SectionHeading :eyebrow="eyebrow" :title="title" :title-id="titleId" />

        <div class="service-showcase__items">
          <article v-for="item in items" :key="item.title" class="service-showcase__item">
            <div class="service-showcase__icon dt-icon-box">
              <component :is="item.icon" :size="20" aria-hidden="true" />
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </div>

      <figure class="service-showcase__visual">
        <img :src="imageSrc" :alt="imageAlt" />
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

.service-showcase__item {
  display: flex;
  gap: 18px;
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-lg);
  background: rgba(39, 30, 53, 0.3);
  padding: 24px;
  transition:
    transform var(--dt-duration-slow) ease,
    border-color var(--dt-duration-slow) ease,
    background-color var(--dt-duration-slow) ease,
    box-shadow var(--dt-duration-slow) ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(94, 78, 255, 0.4);
    background: rgba(39, 30, 53, 0.5);
    box-shadow: 0 24px 50px rgba(94, 78, 255, 0.06);
  }
}

h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
}

p {
  margin: 10px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 16px;
  line-height: 1.75;
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
}

@media (prefers-reduced-motion: reduce) {
  .service-showcase__item {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
