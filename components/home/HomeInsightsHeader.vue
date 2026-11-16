<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import SectionHeading from '~/components/common/SectionHeading.vue'

defineProps<{
  eyebrow: string
  title: string
  moreLabel: string
  moreHref: string
}>()
</script>

<template>
  <div class="insights-header">
    <SectionHeading
      class="insights-header__heading"
      :eyebrow="eyebrow"
      :title="title"
      title-id="insights-title"
      eyebrow-transform="natural"
    />
    <BaseButton :href="moreHref" variant="secondary" size="lg" class="insights-header__action">
      {{ moreLabel }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.insights-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
  text-align: center;
}

.insights-header__heading {
  max-width: none;
}

.insights-header :deep(.section-heading__eyebrow) {
  color: var(--dt-color-text-muted);
}

.insights-header__action {
  display: none;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .insights-header {
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .insights-header__action {
    display: inline-flex;
  }
}
</style>
