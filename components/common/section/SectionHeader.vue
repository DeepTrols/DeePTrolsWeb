<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    titleId?: string
    subtitle?: string
    align?: 'left' | 'center' | 'right'
    level?: 1 | 2 | 3
    titleSize?: 'hero' | 'section' | 'compact'
    subtitleSize?: 'default' | 'large'
    eyebrowSize?: 'default' | 'sm'
    eyebrowTone?: 'accent' | 'primary'
    tone?: 'dark' | 'light'
    nowrapSubtitle?: boolean
    width?: 'default' | 'wide' | 'full'
  }>(),
  {
    eyebrow: undefined,
    title: undefined,
    titleId: undefined,
    subtitle: undefined,
    align: 'left',
    level: 2,
    titleSize: 'section',
    subtitleSize: 'default',
    eyebrowSize: 'default',
    eyebrowTone: 'accent',
    tone: 'dark',
    nowrapSubtitle: false,
    width: 'default',
  },
)

const slots = useSlots()
const headingTag = computed(() => `h${props.level}`)
</script>

<template>
  <header
    class="section-heading dt-section-heading"
    :class="[
      `section-heading--${align}`,
      `section-heading--${tone}`,
      `section-heading--width-${width}`,
      `section-heading--title-${titleSize}`,
      `section-heading--subtitle-${subtitleSize}`,
      `section-heading--eyebrow-${eyebrowSize}`,
      `section-heading--eyebrow-${eyebrowTone}`,
      { 'section-heading--nowrap-subtitle': nowrapSubtitle },
      { 'section-heading--with-actions': Boolean(slots.actions) },
    ]"
  >
    <div class="section-heading__content">
      <p v-if="eyebrow" class="section-heading__eyebrow">{{ eyebrow }}</p>
      <component :is="headingTag" v-if="title" :id="titleId" class="section-heading__title">{{ title }}</component>
      <p
        v-if="subtitle"
        class="section-heading__subtitle"
        :class="{ 'section-heading__subtitle--nowrap': nowrapSubtitle }"
      >
        {{ subtitle }}
      </p>
    </div>

    <div v-if="slots.actions" class="section-heading__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.section-heading {
  max-width: 760px;
}

.section-heading--width-wide,
.section-heading--width-full {
  max-width: none;
}

.section-heading--width-full {
  width: 100%;
}

.section-heading--center {
  margin: 0 auto;
  text-align: center;
}

.section-heading--right {
  margin-left: auto;
  text-align: right;
}

.section-heading--with-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.section-heading--eyebrow-sm .section-heading__eyebrow {
  font-size: 14px;
  line-height: 20px;
}

.section-heading--eyebrow-primary .section-heading__eyebrow {
  color: var(--dt-color-primary);
}

.section-heading__title {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
}

.section-heading--title-compact .section-heading__title {
  font-size: 30px;
}

.section-heading--title-section .section-heading__title {
  font-size: 36px;
}

.section-heading--title-hero .section-heading__title {
  font-size: 36px;
  line-height: 1.1;
}

.section-heading__subtitle {
  margin: 16px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 18px;
  line-height: 1.55;
}

.section-heading--subtitle-large .section-heading__subtitle {
  font-size: 20px;
  line-height: 1.4;
}

.section-heading__subtitle--nowrap {
  @media (min-width: 1024px) {
    white-space: nowrap;
  }
}

.section-heading--nowrap-subtitle {
  @media (min-width: 1024px) {
    max-width: none;
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

.section-heading__actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-start;
}

.section-heading--center .section-heading__actions {
  justify-content: center;
}

.section-heading--right .section-heading__actions {
  justify-content: flex-end;
}

@media (min-width: 640px) {
  .section-heading--title-compact .section-heading__title {
    font-size: 36px;
  }

  .section-heading--title-section .section-heading__title,
  .section-heading--title-hero .section-heading__title {
    font-size: 48px;
  }
}

@media (min-width: 768px) {
  .section-heading--subtitle-default .section-heading__subtitle {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .section-heading--with-actions {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .section-heading--title-hero .section-heading__title {
    font-size: 60px;
  }
}
</style>
