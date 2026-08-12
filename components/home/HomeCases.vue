<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '~/components/common/BaseButton.vue'
import CarouselControls from '~/components/common/carousel/CarouselControls.vue'
import CarouselRoot from '~/components/common/carousel/CarouselRoot.vue'
import HomeCaseSlide from '~/components/home/HomeCaseSlide.vue'
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

          <CarouselControls
            class="cases__controls"
            aria-label="客户故事切换"
            previous-label="Previous story"
            next-label="Next story"
            @previous="showPreviousStory"
            @next="showNextStory"
          />
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

        <CarouselRoot
          class="cases__carousel"
          :active-index="activeStoryIndex"
          :item-count="storyCount"
          :label="activeStory?.title"
        >
          <HomeCaseSlide
            v-for="(story, index) in customerStories"
            :key="story.title"
            :story="story"
            :index="index"
            :active="index === activeStoryIndex"
          />
        </CarouselRoot>

        <CarouselControls
          class="cases__mobile-controls"
          aria-label="客户故事切换"
          previous-label="Previous story"
          next-label="Next story"
          @previous="showPreviousStory"
          @next="showNextStory"
        />
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
  border-radius: var(--dt-radius-lg);
}

.cases__button {
  flex-shrink: 0;
}

.cases__all-action {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

@media (prefers-reduced-motion: reduce) {
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

}
</style>
