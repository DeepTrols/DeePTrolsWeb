<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight } from '@lucide/vue'
import BaseButton from '~/components/common/BaseButton.vue'
import CarouselRoot from '~/components/common/carousel/CarouselRoot.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import BaseTabs from '~/components/common/tabs/BaseTabs.vue'
import { solutions } from '~/data/home'

const activeKey = ref(solutions[0]?.key ?? '')
const activeSolution = computed(() => solutions.find((solution) => solution.key === activeKey.value) ?? solutions[0])
const activeIndex = computed(() => Math.max(solutions.findIndex((solution) => solution.key === activeKey.value), 0))
const solutionTabs = computed(() => solutions.map((solution) => ({ key: solution.key, label: solution.tab })))
</script>

<template>
  <section class="section solutions" aria-labelledby="solutions-title">
    <div class="container">
      <div class="solutions__heading">
        <SectionHeading
          id="solutions-title"
          eyebrow="Use Cases"
          title="驱动各行业智能提升"
          subtitle="覆盖智能制造、企业运营、AI基础设施等核心领域，帮助企业快速构建可持续演进的智能化能力"
          nowrap-subtitle
        />
      </div>

      <BaseTabs
        v-model="activeKey"
        class="solutions__tabs"
        :items="solutionTabs"
        id-prefix="solution"
        panel-id-prefix="solution-panel"
        label="解决方案分类"
        variant="pill"
      />

      <CarouselRoot
        v-if="activeSolution"
        class="solutions__carousel"
        :active-index="activeIndex"
        :item-count="solutions.length"
        labelled-by="solutions-title"
      >
        <div
          v-for="solution in solutions"
          :id="`solution-panel-${solution.key}`"
          :key="solution.key"
          role="group"
          aria-roledescription="slide"
          data-slot="item"
          class="solutions__carousel-item"
          :class="`solution-panel-${solution.key}`"
          :aria-labelledby="`solution-tab-${solution.key}`"
          :aria-hidden="solution.key !== activeKey"
        >
          <NuxtLink :to="solution.href" class="group solutions__panel">
            <img :src="solution.image" :alt="solution.title" loading="lazy" />
            <div class="solutions__panel-content">
              <span class="solutions__panel-tag">{{ solution.tab }}</span>
              <h3>{{ solution.title }}</h3>
              <p>{{ solution.description }}</p>
              <span class="solutions__learn-more">
                阅读案例
                <ArrowRight
                  class="iconify iconify--lucide size-4 transition group-hover:translate-x-1"
                  :size="16"
                  aria-hidden="true"
                />
              </span>
            </div>
          </NuxtLink>
        </div>
      </CarouselRoot>

      <div class="solutions__actions">
        <BaseButton href="/solutions#use-cases" variant="secondary" size="lg" class="solutions__all-link">
          查看所有应用场景
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.solutions {
  background: var(--dt-color-bg);
  color: var(--dt-color-text);
}

.solutions__heading {
  margin-bottom: 48px;
}

.solutions :deep(.section-heading) {
  max-width: none;
}

.solutions :deep(.section-heading__subtitle) {
  font-size: 20px;
  line-height: 28px;
}

.solutions__tabs {
  margin-bottom: 32px;
}

.solutions__carousel {
  border-radius: var(--dt-ui-radius);
  --dt-carousel-align: flex-start;
  --dt-carousel-gutter: -16px;
}

.solutions__carousel-item {
  min-width: 0;
  flex: 0 0 100%;
  padding-inline-start: 16px;
}

.solutions__panel {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 420px;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: var(--dt-ui-radius);
  background: #181524;
}

.solutions__panel img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solutions__panel-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.6), transparent);
  padding: 96px 24px 24px;
  color: #ffffff;
}

.solutions__panel-tag {
  display: inline-flex;
  margin-bottom: 16px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

.solutions__panel h3 {
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0;
}

.solutions__panel p {
  max-width: 672px;
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  line-height: 1.625;
}

.solutions__learn-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;

  svg {
    transition: transform 150ms ease;
  }

  .solutions__panel:hover & svg {
    transform: translateX(4px);
  }
}

.solutions__actions {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (prefers-reduced-motion: reduce) {
  .solutions__learn-more svg,
  .solutions__all-link {
    transition: none;
  }
}

@media (min-width: 640px) {
  .solutions__panel-content {
    padding-right: 32px;
    padding-bottom: 32px;
    padding-left: 32px;
  }

  .solutions__panel-tag {
    font-size: 14px;
  }

  .solutions__panel h3 {
    font-size: 24px;
  }

  .solutions__panel p {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .solutions :deep(.section-heading__subtitle) {
    white-space: nowrap;
  }

  .solutions__panel {
    min-height: 520px;
  }
}
</style>
