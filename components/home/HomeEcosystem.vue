<script setup lang="ts">
import { ArrowRight, CheckCircle2 } from '@lucide/vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import HomeEcosystemVisual from '~/components/home/HomeEcosystemVisual.vue'
import { ecosystemCards } from '~/data/home'
</script>

<template>
  <section class="section ecosystem" aria-labelledby="ecosystem-title">
    <div class="container">
      <SectionHeading
        id="ecosystem-title"
        eyebrow="ecosystem"
        title="连接企业 AI 全链路的开放生态"
        subtitle="连接算力、模型、社区与行业知识，构建开放 AI 生态"
        align="center"
        nowrap-subtitle
      />

      <div class="ecosystem__grid">
        <NuxtLink
          v-for="card in ecosystemCards"
          :key="card.title"
          :to="card.href"
          class="group ecosystem-card dt-ecosystem-card"
          :class="`ecosystem-card--${card.variant}`"
        >
          <div class="ecosystem-card__intro">
            <div class="ecosystem-card__icon-box">
              <component :is="card.icon" class="ecosystem-card__icon" :size="24" aria-hidden="true" />
            </div>
            <h3>{{ card.title }}</h3>
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

          <span class="ecosystem-card__action" :aria-label="`了解${card.title}`">
            <ArrowRight :size="20" aria-hidden="true" />
          </span>
          <HomeEcosystemVisual :variant="card.variant" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ecosystem {
  background: var(--dt-color-bg);
}

.ecosystem :deep(.section-heading) {
  max-width: none;
}

.ecosystem :deep(.section-heading__subtitle) {
  font-size: 20px;
  line-height: 28px;
}

.ecosystem__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 48px;
}

.ecosystem-card {
  color: var(--dt-color-text);

  &:hover {
    .ecosystem-card__action {
      opacity: 1;
    }

    :deep(.ecosystem-visual__cloud-grid) {
      fill: rgba(94, 78, 255, 0.2);
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
      stroke: rgba(94, 78, 255, 0.6);
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
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-bg-elevated);
  color: var(--dt-color-text-highlighted);
}

.ecosystem-card__icon {
  flex: 0 0 auto;
}

.ecosystem-card h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
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
  letter-spacing: 0;
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
  border-radius: 9999px;
  background: var(--dt-color-primary);
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

@media (min-width: 640px) {
  .ecosystem__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .ecosystem :deep(.section-heading__subtitle) {
    white-space: nowrap;
  }
}
</style>
