<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { computed, ref } from 'vue'
import BaseButton from '~/components/common/BaseButton.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { customerStories } from '~/data/home'

const activeStoryIndex = ref(0)
const storyCount = customerStories.length
const activeStory = computed(() => customerStories[activeStoryIndex.value] ?? customerStories[0])

function showPreviousStory() {
  activeStoryIndex.value = (activeStoryIndex.value - 1 + storyCount) % storyCount
}

function showNextStory() {
  activeStoryIndex.value = (activeStoryIndex.value + 1) % storyCount
}

function selectStory(index: number) {
  activeStoryIndex.value = index
}
</script>

<template>
  <section class="cases" aria-labelledby="cases-title">
    <div class="cases__shell">
      <div class="cases__inner">
        <div class="cases__top">
          <SectionHeading
            class="cases__heading"
            eyebrow="CUSTOMER STORIES"
            title="携手 DeepTrols 加速创新"
            title-id="cases-title"
            subtitle="助力客户加速创新、实现业务突破，同时显著降低成本。"
            nowrap-subtitle
          />

          <div class="cases__controls" aria-label="客户故事切换">
            <button type="button" class="cases__control dt-icon-button" aria-label="Previous story" @click="showPreviousStory">
              <ChevronLeft :size="20" aria-hidden="true" />
            </button>
            <button type="button" class="cases__control dt-icon-button" aria-label="Next story" @click="showNextStory">
              <ChevronRight :size="20" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div role="tablist" class="cases__logo-tabs" aria-label="客户故事列表">
          <button
            v-for="(story, index) in customerStories"
            :key="story.name"
            type="button"
            role="tab"
            class="cases__logo-tab"
            :aria-selected="index === activeStoryIndex"
            :aria-controls="`case-story-${index}`"
            @click="selectStory(index)"
          >
            <span>{{ story.logoText }}</span>
          </button>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          data-orientation="horizontal"
          data-slot="root"
          class="cases__carousel"
          :aria-label="activeStory?.title"
          tabindex="0"
        >
          <div data-slot="viewport" class="cases__viewport">
            <div data-slot="container" class="cases__track" :data-active-slide="activeStoryIndex">
              <article
                v-for="(story, index) in customerStories"
                :id="`case-story-${index}`"
                :key="story.title"
                role="group"
                aria-roledescription="slide"
                data-slot="item"
                class="cases__slide"
                :aria-hidden="index !== activeStoryIndex"
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
                        :tabindex="index === activeStoryIndex ? 0 : -1"
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
            </div>
          </div>
        </div>

        <div class="cases__mobile-controls" aria-label="客户故事切换">
          <button type="button" class="cases__control dt-icon-button" aria-label="Previous story" @click="showPreviousStory">
            <ChevronLeft :size="20" aria-hidden="true" />
          </button>
          <button type="button" class="cases__control dt-icon-button" aria-label="Next story" @click="showNextStory">
            <ChevronRight :size="20" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <div class="cases__all-action">
      <BaseButton href="/cases" variant="secondary" size="lg" class="cases__button">
        查看所有案例
      </BaseButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cases {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  background: var(--dt-color-bg);
  padding: 0 16px 128px;
}

.cases__shell {
  overflow: hidden;
  border: 1px solid var(--dt-color-line);
  border-radius: 24px;
  background: rgba(38, 38, 38, 0.4);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.cases__inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 0 0;
}

.cases__top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px;
}

.cases__heading {
  max-width: none;
}

.cases__heading :deep(.section-heading__subtitle) {
  margin-top: 0;
  color: var(--dt-color-text);
}

.cases__controls,
.cases__mobile-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cases__controls {
  display: none;
}

.cases__control {
  &:hover {
    color: var(--dt-color-text-highlighted);
  }
}

.cases__logo-tabs {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 40px;
  margin-top: 24px;
  overflow-x: auto;
  padding: 0 24px 16px;
  scrollbar-width: none;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
}

.cases__logo-tab {
  display: flex;
  height: 56px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--dt-ui-radius);
  background: transparent;
  color: var(--dt-color-text-highlighted);
  padding: 0;
  transition: opacity 200ms ease;

  span {
    display: grid;
    min-width: 90px;
    height: 36px;
    place-items: center;
    border: 1px solid var(--dt-color-line);
    border-radius: var(--dt-radius-sm);
    background: rgba(255, 255, 255, 0.05);
    color: var(--dt-color-text-highlighted);
    font-size: 18px;
    font-weight: 700;
  }

  &[aria-selected='false'] {
    opacity: 0.5;

    &:hover {
      opacity: 0.75;
    }
  }
}

.cases__carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--dt-radius-lg);
  outline: none;
  padding: 0;
}

.cases__viewport {
  overflow: hidden;
}

.cases__track {
  display: flex;
  align-items: stretch;
  flex-direction: row;
  transition: transform 300ms ease;
}

.cases__track[data-active-slide='1'] {
  transform: translate3d(-100%, 0, 0);
}

.cases__track[data-active-slide='2'] {
  transform: translate3d(-200%, 0, 0);
}

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

.cases__all-action {
  display: flex;
  justify-content: center;
  margin-top: 32px;
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

@media (prefers-reduced-motion: reduce) {
  .cases__track,
  .cases__control,
  .cases__logo-tab,
  .cases__button {
    transition: none;
  }
}

@media (min-width: 640px) {
  .cases__top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .cases__controls {
    display: flex;
    gap: 12px;
  }

  .cases__mobile-controls {
    display: none;
  }

  .cases__heading :deep(.section-heading__subtitle) {
    font-size: 18px;
  }

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
  .cases {
    padding-bottom: 176px;
  }

  .cases__inner {
    padding-right: 0;
    padding-left: 0;
  }

  .cases__top,
  .cases__logo-tabs {
    padding-right: 40px;
    padding-left: 40px;
  }

  .cases__heading :deep(.section-heading__subtitle) {
    font-size: 20px;
    white-space: nowrap;
  }

  .cases__logo-tabs {
    gap: 56px;
  }

  .cases__slide-card {
    grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1fr);
  }

  .cases__visual {
    min-height: 520px;
  }
}
</style>
