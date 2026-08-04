<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardText from '~/components/common/card/CardText.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: Component
    iconLabel?: string
    href?: string
    layout?: 'vertical' | 'horizontal'
    variant?: 'default' | 'feature' | 'soft' | 'product' | 'ecosystem' | 'media'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    titleSize?: 'sm' | 'md' | 'lg'
    descriptionSize?: 'sm' | 'md' | 'lg'
    iconSize?: 20 | 24 | 28 | 48
    iconBoxSize?: 40 | 48 | 56
    tone?: 'primary' | 'muted' | 'white' | 'gradient'
    showAccent?: boolean
    equalHeight?: boolean
    action?: {
      label: string
      href: string
      variant?: 'primary' | 'secondary' | 'ghost'
    }
  }>(),
  {
    description: undefined,
    icon: undefined,
    iconLabel: undefined,
    href: undefined,
    layout: 'vertical',
    variant: 'feature',
    padding: 'sm',
    titleSize: 'sm',
    descriptionSize: 'sm',
    iconSize: 20,
    iconBoxSize: 40,
    tone: 'gradient',
    showAccent: true,
    equalHeight: true,
    action: undefined,
  },
)
</script>

<template>
  <BaseCard
    :href="href"
    :variant="variant"
    :padding="padding"
    :accent="showAccent"
    :equal-height="equalHeight"
    class="feature-card"
    :class="`feature-card--${layout}`"
  >
    <div class="feature-card__inner">
      <slot name="icon">
        <div v-if="iconLabel" class="relative dt-icon-box dt-icon-box--gradient text-sm font-bold">
          {{ iconLabel }}
        </div>
        <IconBox v-else-if="icon" :icon="icon" :size="iconBoxSize" :icon-size="iconSize" :tone="tone" />
      </slot>

      <div class="feature-card__body">
        <CardText :title="title" :description="description" :title-size="titleSize" :description-size="descriptionSize">
          <slot name="text" />
        </CardText>
        <slot name="meta" />
        <slot />
        <div v-if="action" class="feature-card__action">
          <BaseButton :href="action.href" :variant="action.variant ?? 'secondary'" size="md">
            {{ action.label }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.feature-card,
.feature-card__inner,
.feature-card__body {
  display: flex;
  flex-direction: column;
}

.feature-card__inner,
.feature-card__body {
  flex: 1;
}

.feature-card--horizontal .feature-card__inner {
  flex-direction: row;
  gap: 18px;
}

.feature-card--vertical .feature-card__body {
  margin-top: 16px;
}

.feature-card__action {
  margin-top: auto;
  padding-top: 24px;
}
</style>
