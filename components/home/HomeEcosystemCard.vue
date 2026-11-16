<script setup lang="ts">
import { ArrowRight, CheckCircle2 } from '@lucide/vue'
import type { Component } from 'vue'
import { NuxtLink } from '#components'
import HomeEcosystemVisual from '~/components/home/HomeEcosystemVisual.vue'

export interface HomeEcosystemCardData {
  title: string
  description: string
  tag: string
  href: string
  points?: string[]
  icon: Component
  variant: 'token' | 'agent' | 'infra' | 'report'
  comingSoon?: boolean
}

defineProps<{
  card: HomeEcosystemCardData
}>()
</script>

<template>
  <component
    :is="card.comingSoon ? 'div' : NuxtLink"
    :to="card.comingSoon ? undefined : card.href"
    class="group ecosystem-card dt-ecosystem-card"
    :class="[`ecosystem-card--${card.variant}`, { 'ecosystem-card--soon': card.comingSoon }]"
    :aria-disabled="card.comingSoon || undefined"
  >
    <div class="ecosystem-card__intro">
      <div class="ecosystem-card__icon-box dt-icon-box">
        <component :is="card.icon" class="ecosystem-card__icon" :size="24" aria-hidden="true" />
      </div>
      <div class="ecosystem-card__title-row">
        <h3>{{ card.title }}</h3>
        <span v-if="card.comingSoon" class="ecosystem-card__soon-badge">待开放</span>
      </div>
      <p>{{ card.description }}</p>
    </div>

    <div class="ecosystem-card__meta">
      <ul v-if="card.points?.length">
        <li v-for="point in card.points" :key="point">
          <CheckCircle2 :size="20" aria-hidden="true" />
          <span>{{ point }}</span>
        </li>
      </ul>
      <span data-slot="base" class="ecosystem-card__tag dt-card-tag">
        <span data-slot="label">{{ card.tag }}</span>
      </span>
    </div>

    <span v-if="!card.comingSoon" class="ecosystem-card__action" :aria-label="`了解${card.title}`">
      <ArrowRight :size="20" aria-hidden="true" />
    </span>
    <HomeEcosystemVisual :variant="card.variant" />
  </component>
</template>

<style scoped lang="scss">
.ecosystem-card {
  color: var(--dt-color-text);
  box-shadow: none;
  transition:
    border-color var(--dt-duration-base) ease,
    background-color var(--dt-duration-base) ease;

  &:hover {
    border-color: var(--dt-color-line-strong);
    box-shadow: none;
    transform: none;

    .ecosystem-card__action {
      opacity: 1;
    }

    :deep(.ecosystem-visual__cloud-grid) {
      fill: rgba(26, 87, 235, 0.16);
    }

    :deep(.ecosystem-visual__base-line),
    :deep(.ecosystem-visual__map-line) {
      opacity: 0.4;
    }

    :deep(.ecosystem-visual__flow),
    :deep(.ecosystem-visual__map-flow) {
      opacity: 1;
      animation-play-state: running;
    }

    :deep(.ecosystem-visual__led),
    :deep(.ecosystem-visual__pulse) {
      animation-play-state: running;
    }

    :deep(.ecosystem-visual__outer-node),
    :deep(.ecosystem-visual__server-shell),
    :deep(.ecosystem-visual__device-shell),
    :deep(.ecosystem-visual__cloud-icon) {
      stroke: rgba(26, 87, 235, 0.6);
    }

    :deep(.ecosystem-visual__inner-node) {
      fill: var(--dt-color-primary);
    }

    :deep(.ecosystem-visual__device-label) {
      opacity: 1;
    }
  }
}

.ecosystem-card__intro,
.ecosystem-card__meta {
  position: relative;
  z-index: 2;
}

.ecosystem-card__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ecosystem-card__icon-box {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  --dt-icon-box-bg: var(--dt-color-bg-elevated);
  --dt-icon-box-color: var(--dt-color-text-highlighted);
  --dt-icon-box-shadow: none;
}

.ecosystem-card__icon {
  flex: 0 0 auto;
}

.ecosystem-card h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0;
}

.ecosystem-card__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ecosystem-card__soon-badge {
  flex: 0 0 auto;
  border-radius: var(--dt-radius-sm);
  background: var(--dt-color-bg-soft);
  color: var(--dt-color-text-muted);
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.ecosystem-card--soon {
  cursor: default;
}

.ecosystem-card p {
  max-width: 75%;
  margin: 16px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 16px;
  line-height: 1.5;
}

.ecosystem-card__meta {
  margin-top: auto;
  padding-top: 24px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--dt-color-text-highlighted);
  font-size: 16px;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    color: var(--dt-color-primary);
  }
}

.ecosystem-card__tag {
  gap: 4px;
  margin-top: 24px;
  background: var(--dt-color-bg-elevated);
  box-shadow: inset 0 0 0 1px var(--dt-color-line);
  color: var(--dt-color-text-muted);
  letter-spacing: 0;
  text-transform: none;
}

.ecosystem-card__action {
  position: absolute;
  right: 32px;
  bottom: 32px;
  z-index: 2;
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: var(--dt-ui-radius);
  background: var(--dt-color-text-highlighted);
  color: #ffffff;
  opacity: 0;
  transition:
    opacity 220ms ease,
    background-color 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem-card,
  .ecosystem-card__action {
    transition: none;
  }
}
</style>
