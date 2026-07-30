<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import type { CustomerStory } from '~/data/home'

defineProps<{
  active: boolean
  index: number
  story: CustomerStory
}>()
</script>

<template>
  <article
    :id="`case-story-${index}`"
    role="group"
    aria-roledescription="slide"
    data-slot="item"
    class="cases__slide"
    :aria-hidden="!active"
  >
    <div class="cases__slide-card">
      <div class="cases__content">
        <div class="cases__customer-logo" :aria-label="`${story.name} Logo 占位`">{{ story.logoText }}</div>
        <h3>{{ story.title }}</h3>
        <p>{{ story.description }}</p>
        <dl class="cases__stats">
          <div v-for="stat in story.stats" :key="stat.label">
            <component :is="stat.icon" :size="20" aria-hidden="true" />
            <dt>{{ stat.value }}</dt>
            <dd>{{ stat.label }}</dd>
          </div>
        </dl>
        <div class="cases__read-action">
          <BaseButton
            :href="story.href"
            variant="secondary"
            size="md"
            class="cases__button"
            :tabindex="active ? 0 : -1"
          >
            阅读案例
          </BaseButton>
        </div>
      </div>

      <div class="cases__visual" aria-hidden="true">
        <img :src="story.image" :alt="story.title" loading="lazy">
        <div class="cases__visual-overlay"></div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.cases__slide {
  min-width: 0;
  flex: 0 0 100%;
}

.cases__slide-card {
  display: grid;
  min-height: 520px;
  overflow: hidden;
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-bg);
}

.cases__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 24px;
}

.cases__customer-logo {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 1px solid var(--dt-color-line-strong);
  border-radius: var(--dt-radius-sm);
  background: rgba(255, 255, 255, 0.06);
  color: var(--dt-color-secondary);
  font-weight: 760;
}

h3 {
  max-width: 720px;
  margin: 28px 0 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0;
}

.cases__content p {
  max-width: 660px;
  margin: 22px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.625;
}

.cases__stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  width: 100%;
  margin: 32px 0 0;
}

.cases__stats div {
  min-height: 112px;
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-sm);
  background: rgba(255, 255, 255, 0.035);
  padding: 18px;

  svg {
    color: var(--dt-color-secondary);
  }
}

dt {
  margin-top: 16px;
  color: var(--dt-color-text-highlighted);
  font-size: 18px;
  font-weight: 760;
}

dd {
  margin: 6px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 13px;
  line-height: 1.45;
}

.cases__read-action {
  margin-top: auto;
  padding-top: 32px;
}

.cases__button {
  flex-shrink: 0;
}

.cases__visual {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  background: var(--dt-color-bg-soft);

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    opacity: 0.76;
  }
}

.cases__visual-overlay {
  position: absolute;
  inset: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--dt-radius-sm);
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    rgba(21, 21, 21, 0.28);
  background-size: 32px 32px;
}

@media (min-width: 640px) {
  h3 {
    font-size: 24px;
  }

  .cases__content p {
    font-size: 20px;
  }

  .cases__content {
    padding: 40px;
  }

  .cases__stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .cases__slide-card {
    grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1fr);
  }

  .cases__visual {
    min-height: 520px;
  }
}
</style>
