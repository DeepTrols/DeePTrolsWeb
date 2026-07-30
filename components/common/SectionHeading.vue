<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    titleId?: string
    subtitle?: string
    align?: 'left' | 'center'
    tone?: 'dark' | 'light'
    nowrapSubtitle?: boolean
  }>(),
  {
    eyebrow: undefined,
    titleId: undefined,
    subtitle: undefined,
    align: 'left',
    tone: 'dark',
    nowrapSubtitle: false,
  },
)
</script>

<template>
  <header class="section-heading dt-section-heading" :class="[`section-heading--${align}`, `section-heading--${tone}`]">
    <p v-if="eyebrow" class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 :id="titleId">{{ title }}</h2>
    <p v-if="subtitle" class="section-heading__subtitle" :class="{ 'section-heading__subtitle--nowrap': nowrapSubtitle }">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped lang="scss">
.section-heading {
  max-width: 760px;
}

.section-heading--center {
  margin: 0 auto;
  text-align: center;
}

.section-heading__eyebrow {
  margin: 0 0 8px;
  color: var(--dt-color-accent-muted);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
}

.section-heading__subtitle {
  margin: 16px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.55;
}

.section-heading__subtitle--nowrap {
  @media (min-width: 1024px) {
    white-space: nowrap;
  }
}

@media (min-width: 640px) {
  h2 {
    font-size: 48px;
  }
}

@media (min-width: 768px) {
  .section-heading__subtitle {
    font-size: 20px;
  }
}

.section-heading--light {
  .section-heading__eyebrow {
    color: var(--dt-color-primary-dark);
  }

  .section-heading__subtitle {
    color: var(--dt-color-text-soft);
  }
}
</style>
