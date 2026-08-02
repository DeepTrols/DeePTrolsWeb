<script setup lang="ts">
import type { Component } from 'vue'

export interface HomeProductSystemInput {
  label: string
  icon: Component
}

export interface HomeProductSystemOutputRow {
  name: string
  value: string
  icon: Component
}

export interface HomeProductSystemOutput {
  title: string
  rows: HomeProductSystemOutputRow[]
}

defineProps<{
  label: string
  inputs: HomeProductSystemInput[]
  outputs: HomeProductSystemOutput[]
}>()
</script>

<template>
  <div class="product-system__mobile-flow" :aria-label="label">
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
</template>

<style scoped lang="scss">
.product-system__mobile-flow {
  display: grid;
  gap: 16px;
}

.product-system__mobile-card,
.product-system__mobile-core {
  border: 1px solid var(--dt-color-line);
  border-radius: var(--dt-radius-md);
  background: #181524;
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

.product-system__mobile-card h3,
.product-system__mobile-core h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
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

@media (min-width: 1024px) {
  .product-system__mobile-flow {
    display: none;
  }
}
</style>
