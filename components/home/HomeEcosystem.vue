<script setup lang="ts">
import { FileText } from '@lucide/vue'
import { computed } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import HomeEcosystemCard from '~/components/home/HomeEcosystemCard.vue'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import { ecosystemCards } from '~/data/home'
import { homeEcosystemHeading } from '~/data/home-sections'

// CMS 接管（015.18）：全部 props 可选，缺省读 data 静态 = 代码回退与 CMS 渲染共用同一 SFC
export interface HomeEcosystemCardInput {
  title: string
  description: string
  tag: string
  href: string
  points?: string[]
  icon?: string
  variant: 'token' | 'agent' | 'infra' | 'report'
  comingSoon?: boolean
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    subtitle?: string
    cards?: HomeEcosystemCardInput[]
  }>(),
  {
    eyebrow: homeEcosystemHeading.eyebrow,
    title: homeEcosystemHeading.title,
    subtitle: homeEcosystemHeading.subtitle,
    cards: undefined,
  },
)

const resolvedCards = computed(() =>
  props.cards
    ? props.cards.map((card) => ({ ...card, icon: resolveNavIcon(card.icon) ?? FileText }))
    : ecosystemCards,
)
</script>

<template>
  <section class="section ecosystem flow-root pb-24 lg:pb-32" aria-labelledby="ecosystem-title">
    <div class="container">
      <SectionHeading
        id="ecosystem-title"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        nowrap-subtitle
        eyebrow-transform="natural"
      />

      <div class="ecosystem__grid">
        <HomeEcosystemCard
          v-for="card in resolvedCards"
          :key="card.title"
          :card="card"
        />
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
  font-size: 15px;
  line-height: 27px;
}

.ecosystem :deep(.section-heading__eyebrow) {
  color: var(--dt-color-text-muted);
}

.ecosystem__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 40px;
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
