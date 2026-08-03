<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardText from '~/components/common/card/CardText.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
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
        <BaseCard v-for="link in links" :key="link.title" class="group engine-links-section__link" :href="link.href" variant="soft" padding="md">
          <div class="engine-links-section__link-glow" aria-hidden="true"></div>
          <IconBox class="engine-links-section__link-icon" :icon="link.icon" :size="56" :icon-size="28" tone="white" />
          <CardText :title="link.title" :description="link.description" title-size="md" description-size="md" />
        </BaseCard>
      </div>

      <div class="engine-links-section__content">
        <SectionHeader :eyebrow="eyebrow" :title="title" :title-id="titleId" />
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
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
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
