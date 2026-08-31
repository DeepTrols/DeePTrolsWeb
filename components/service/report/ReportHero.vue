<script setup lang="ts">
import PageHero from '~/components/common/PageHero.vue'
import { reportHero } from '~/data/reports'
</script>

<template>
  <PageHero
    class="report-hero"
    title-id="report-hero-title"
    :title-line="reportHero.title"
    :description="reportHero.description"
    align="center"
  />
</template>

<style scoped lang="scss">
.report-hero :deep(.page-hero__body) {
  padding-top: 8.5rem;
  padding-bottom: 4rem;
}

.report-hero :deep(.page-hero__content) {
  max-width: 64rem;
}

.report-hero :deep(.page-hero__description) {
  max-width: none;
  margin-bottom: 0;
  color: var(--dt-color-text);
  font-size: 18px;
  line-height: 1.5;
}

@media (min-width: 640px) {
  .report-hero :deep(.page-hero__description) {
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  .report-hero :deep(.page-hero__body) {
    padding-top: 9.5rem;
    padding-bottom: 5rem;
  }

  .report-hero :deep(.page-hero__description) {
    font-size: 24px;
  }
}

@media (min-width: 1024px) {
  .report-hero :deep(h1) {
    font-size: 48px;
  }
}
</style>
