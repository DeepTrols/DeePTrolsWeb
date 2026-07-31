<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import type { Component } from 'vue'

export interface ProductSystemInput {
  label: string
  icon: Component
}

export interface ProductSystemOutputRow {
  name: string
  value: string
  icon: Component
}

export interface ProductSystemOutput {
  title: string
  rows: ProductSystemOutputRow[]
}

export interface ProductSystemCard {
  name: string
  description: string
  icon: Component
}

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    desktopFlowLabel: string
    mobileFlowLabel: string
    flowFallbackText?: string
    inputs: ProductSystemInput[]
    outputs: ProductSystemOutput[]
    cards: ProductSystemCard[]
  }>(),
  {
    flowFallbackText: '能力图加载中',
  },
)
</script>

<template>
  <section class="section product-system" :aria-labelledby="titleId">
    <div class="container">
      <SectionHeading
        :id="titleId"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        nowrap-subtitle
      />

      <div class="product-system__desktop-flow" role="img" :aria-label="desktopFlowLabel">
        <slot name="desktop-flow">
          <div class="product-system__flow-fallback">{{ flowFallbackText }}</div>
        </slot>
      </div>

      <div class="product-system__mobile-flow" :aria-label="mobileFlowLabel">
        <article class="product-system__mobile-card">
          <h3>输入能力</h3>
          <ul>
            <li v-for="input in inputs" :key="input.label">
              <component :is="input.icon" :size="18" aria-hidden="true" />
              {{ input.label }}
            </li>
          </ul>
        </article>
        <article class="product-system__mobile-core">
          <h3>DeepTrolsOS</h3>
          <p>连接 · 理解 · 执行 · 治理</p>
        </article>
        <article v-for="output in outputs" :key="output.title" class="product-system__mobile-card">
          <h3>{{ output.title }}</h3>
          <ul>
            <li v-for="row in output.rows" :key="row.name">
              <component :is="row.icon" :size="18" aria-hidden="true" />
              <span>{{ row.name }}</span>
              <small>{{ row.value }}</small>
            </li>
          </ul>
        </article>
      </div>

      <div class="product-system__cards">
        <article v-for="card in cards" :key="card.name" class="product-system__card dt-product-card">
          <div class="product-system__card-accent dt-product-card__accent" aria-hidden="true"></div>
          <div class="product-system__card-header">
            <div class="product-system__card-icon dt-icon-box">
              <component :is="card.icon" :size="20" aria-hidden="true" />
            </div>
            <h3>{{ card.name }}</h3>
          </div>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product-system {
  background: transparent;
}

.product-system :deep(.section-heading) {
  max-width: none;
}

.product-system :deep(.section-heading__subtitle) {
  font-size: 20px;
}

.product-system__desktop-flow {
  position: relative;
  display: none;
  width: 100%;
  height: 560px;
  margin-top: 48px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    background:
      linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
    background-position: center center;
    background-size: 48px 48px;
    pointer-events: none;
  }
}

.product-system__flow-fallback {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  height: 100%;
  color: var(--dt-color-text-muted);
}

.product-system__mobile-flow {
  display: grid;
  gap: 16px;
  margin-top: 42px;
}

.product-system__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 32px;
}

.product-system__mobile-card,
.product-system__mobile-core {
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-md);
  background: #181524;
}

.product-system__card {
  min-height: 216px;
}

.product-system__card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-system__card-icon {
  flex: 0 0 auto;
}

.product-system__card h3,
.product-system__mobile-card h3,
.product-system__mobile-core h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}

.product-system__card p {
  flex: 1;
  margin: 16px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 14px;
  line-height: 1.625;
}

@media (prefers-reduced-motion: reduce) {
  .product-system__card:hover {
    transform: none;
  }
}

@media (min-width: 640px) {
  .product-system__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .product-system :deep(.section-heading__subtitle) {
    white-space: nowrap;
  }

  .product-system__desktop-flow {
    display: block;
  }

  .product-system__mobile-flow {
    display: none;
  }

  .product-system__cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .product-system__mobile-card,
  .product-system__mobile-core {
    padding: 22px;
  }

  .product-system__mobile-core {
    border-color: rgba(166, 133, 255, 0.42);
    background: #271e35;
    text-align: center;

    p {
      margin: 12px 0 0;
      color: var(--dt-color-text-muted);
    }
  }

  .product-system__mobile-card ul {
    display: grid;
    gap: 12px;
    margin: 16px 0 0;
    padding: 0;
    list-style: none;
  }

  .product-system__mobile-card li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    color: var(--dt-color-text-muted);

    svg {
      color: var(--dt-color-secondary);
    }

    span {
      color: var(--dt-color-text);
      font-weight: 650;
    }

    small {
      color: var(--dt-color-text-muted);
    }
  }
}
</style>
