<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import serviceOverviewSrc from '../../doc/product/PAGE_REQUIREMENTS/WhyDeepTrols/imgs/fangangaishu@2x.png?url'
import { whyServiceItems } from '~/data/why'
</script>

<template>
  <section class="why-service dt-section relative pb-32 lg:pb-44" aria-labelledby="why-service-title">
    <div class="container why-service__grid">
      <div class="why-service__content">
        <SectionHeading
          eyebrow="Service Model"
          title="业务价值可衡量，AI成果可持续"
          title-id="why-service-title"
        />

        <div class="why-service__items">
          <article v-for="item in whyServiceItems" :key="item.title" class="why-service__item">
            <div class="why-service__icon dt-icon-box">
              <component :is="item.icon" :size="20" aria-hidden="true" />
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </div>

      <figure class="why-service__visual">
        <img :src="serviceOverviewSrc" alt="DeepTrols 方案概述" />
      </figure>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-service__grid {
  display: grid;
  align-items: center;
  gap: 48px;
}

.why-service__items {
  display: grid;
  gap: 16px;
  margin-top: 40px;
}

.why-service__item {
  display: flex;
  gap: 18px;
  border: 1px solid var(--dt-color-line);
  border-radius: 24px;
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

.why-service__visual {
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--dt-color-line);
  border-radius: 24px;
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
  .why-service__grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1fr);
    gap: 72px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .why-service__item {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
