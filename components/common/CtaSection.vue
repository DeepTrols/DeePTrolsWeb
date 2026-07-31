<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'

export interface CtaAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

defineProps<{
  title: string
  titleId: string
  description: string
  actions: CtaAction[]
}>()
</script>

<template>
  <section class="cta-section" :aria-labelledby="titleId">
    <div class="container">
      <div class="cta-section__panel dt-cta-panel">
        <h2 :id="titleId">{{ title }}</h2>
        <p>{{ description }}</p>
        <div class="cta-section__actions">
          <BaseButton
            v-for="action in actions"
            :key="action.label"
            :href="action.href"
            :variant="action.variant ?? 'primary'"
            size="lg"
          >
            {{ action.label }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta-section {
  padding-bottom: 128px;
  background: var(--dt-color-bg);
  color: var(--dt-color-text);
  text-align: center;
}

.cta-section__panel {
  text-align: center;
}

h2 {
  margin: 0 0 16px;
  color: var(--dt-color-text-highlighted);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
}

p {
  margin: 0 0 24px;
  color: var(--dt-color-text);
  font-size: 16px;
  line-height: 24px;
}

.cta-section__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

@media (min-width: 640px) {
  h2 {
    margin-bottom: 24px;
    font-size: 48px;
  }

  p {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  p {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .cta-section {
    padding-bottom: 176px;
  }
}
</style>
