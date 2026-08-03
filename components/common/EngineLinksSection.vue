<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import type { Component } from 'vue'

export interface EngineSectionLink {
  title: string
  description: string
  href: string
  icon: Component
}

defineProps<{
  eyebrow: string
  title: string
  titleId: string
  description: string
  links: EngineSectionLink[]
}>()
</script>

<template>
  <section class="engine-links-section dt-section relative pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container engine-links-section__grid">
      <div class="engine-links-section__links">
        <NuxtLink v-for="link in links" :key="link.title" class="group engine-links-section__link" :to="link.href">
          <div class="engine-links-section__link-glow" aria-hidden="true"></div>
          <div class="engine-links-section__link-icon">
            <component :is="link.icon" :size="28" aria-hidden="true" />
          </div>
          <div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
          </div>
        </NuxtLink>
      </div>

      <div class="engine-links-section__content">
        <SectionHeading :eyebrow="eyebrow" :title="title" :title-id="titleId" />
        <p>{{ description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.engine-links-section__grid {
  display: grid;
  gap: 48px;
  align-items: center;
}

.engine-links-section__links {
  display: grid;
  gap: 24px;
}

.engine-links-section__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
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
    background: rgba(39, 30, 53, 0.55);
    box-shadow: 0 24px 50px rgba(94, 78, 255, 0.06);
  }
}

.engine-links-section__link-glow {
  position: absolute;
  top: -64px;
  right: -64px;
  width: 176px;
  height: 176px;
  border-radius: 9999px;
  background: rgba(94, 78, 255, 0.08);
  filter: blur(48px);
  transition: background-color 500ms ease;
  pointer-events: none;
}

.engine-links-section__link:hover .engine-links-section__link-glow {
  background: rgba(94, 78, 255, 0.16);
}

.engine-links-section__link-icon {
  position: relative;
  display: flex;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-md);
  background: #ffffff;
  color: #151515;
}

h3 {
  position: relative;
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

.engine-links-section__content > p {
  max-width: 680px;
  margin-top: 24px;
  font-size: 18px;
}

@media (min-width: 1024px) {
  .engine-links-section__grid {
    grid-template-columns: minmax(420px, 0.9fr) minmax(0, 1fr);
    gap: 72px;
  }

  .engine-links-section__content {
    justify-self: end;
  }

  .engine-links-section__content > p {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .engine-links-section__link,
  .engine-links-section__link-glow {
    transition: none;
  }

  .engine-links-section__link:hover {
    transform: none;
  }
}
</style>
