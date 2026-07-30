<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { insights } from '~/data/home'

const featuredInsight = insights[0]
const sideInsights = insights.slice(1)
</script>

<template>
  <section class="section insights" aria-labelledby="insights-title">
    <div class="container">
      <div class="insights__header">
        <SectionHeading
          class="insights__heading"
          eyebrow="Resources"
          title="创新、洞察与新闻"
          title-id="insights-title"
        />
        <BaseButton href="/insights" variant="secondary" size="lg" class="insights__all-link insights__all-link--desktop">
          查看全部资源
        </BaseButton>
      </div>

      <div class="insights__layout">
        <NuxtLink v-if="featuredInsight" :to="featuredInsight.href" class="group insights__featured">
          <div class="insights__featured-image">
            <img :src="featuredInsight.image" :alt="featuredInsight.title" loading="lazy">
          </div>
          <div class="insights__featured-body">
            <p class="insights__featured-title" :title="featuredInsight.title">{{ featuredInsight.title }}</p>
            <p class="insights__featured-summary" :title="featuredInsight.summary">{{ featuredInsight.summary }}</p>
          </div>
        </NuxtLink>

        <div class="insights__list">
          <NuxtLink v-for="item in sideInsights" :key="item.title" :to="item.href" class="group insights__item">
            <div class="insights__item-image">
              <img :src="item.image" :alt="item.title" loading="lazy">
            </div>
            <div class="insights__item-body">
              <p class="insights__item-title" :title="item.title">{{ item.title }}</p>
              <p class="insights__item-summary" :title="item.summary">{{ item.summary }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="insights__mobile-action">
        <BaseButton href="/insights" variant="secondary" size="lg" class="insights__all-link">
          查看全部资源
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.insights {
  background: var(--dt-color-bg);
  color: var(--dt-color-text);
}

.insights__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 48px;
  text-align: center;
}

.insights__heading {
  max-width: none;
}

.insights__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.insights__featured,
.insights__item {
  overflow: hidden;
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-ui-radius);
  transition:
    border-color 200ms ease,
    color 200ms ease;

  &:hover {
    border-color: var(--dt-color-line-strong);

    img {
      transform: scale(1.05);
    }
  }
}

.insights__featured {
  display: flex;
  flex-direction: column;
}

.insights__featured-image,
.insights__item-image {
  position: relative;
  width: 100%;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms ease;
  }
}

.insights__featured-image {
  aspect-ratio: 2 / 1;
}

.insights__featured-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--dt-color-bg);
  padding: 16px;
}

.insights__featured-title,
.insights__featured-summary,
.insights__item-title,
.insights__item-summary {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  -webkit-box-orient: vertical;
}

.insights__featured-title {
  color: var(--dt-color-text-highlighted);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  -webkit-line-clamp: 2;
}

.insights__featured-summary {
  color: var(--dt-color-text-muted);
  font-size: 16px;
  line-height: 1.625;
  -webkit-line-clamp: 2;
}

.insights__list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.insights__item {
  display: flex;
  flex-direction: column;
}

.insights__item-image {
  flex-shrink: 0;
  aspect-ratio: 2 / 1;
}

.insights__item-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 16px;
}

.insights__item-title {
  color: var(--dt-color-text-highlighted);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.375;
  -webkit-line-clamp: 3;
}

.insights__item-summary {
  color: var(--dt-color-text-muted);
  font-size: 14px;
  line-height: 1.5;
  -webkit-line-clamp: 2;
}

.insights__all-link--desktop {
  display: none;
  flex-shrink: 0;
}

.insights__mobile-action {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (prefers-reduced-motion: reduce) {
  .insights__featured img,
  .insights__item img,
  .insights__featured,
  .insights__item,
  .insights__all-link {
    transition: none;
  }
}

@media (min-width: 640px) {
  .insights__item {
    flex-direction: row;
  }

  .insights__item-image {
    width: 40%;
    aspect-ratio: 400 / 180;
  }

  .insights__item-body {
    padding-right: 24px;
  }

  .insights__item-title {
    -webkit-line-clamp: 2;
  }

  .insights__item-summary {
    -webkit-line-clamp: 1;
  }
}

@media (min-width: 1024px) {
  .insights__header {
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .insights__layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .insights__featured {
    position: relative;
    flex-direction: row;
    border: 0;
  }

  .insights__featured-image {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
  }

  .insights__featured-body {
    display: none;
  }

  .insights__all-link--desktop {
    display: inline-flex;
  }

  .insights__mobile-action {
    display: none;
  }
}
</style>
