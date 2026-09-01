<script setup lang="ts">
import { computed, useSlots } from 'vue'
import AlternatingTimelineSection from '~/components/common/AlternatingTimelineSection.vue'
import CtaSection from '~/components/common/CtaSection.vue'
import EngineLinksSection from '~/components/common/EngineLinksSection.vue'
import HeroStatsStrip from '~/components/common/HeroStatsStrip.vue'
import PageHero from '~/components/common/PageHero.vue'
import ProductArchitectureSection from '~/components/common/ProductArchitectureSection.vue'
import ProductFeatureGridSection from '~/components/common/ProductFeatureGridSection.vue'
import ServiceShowcaseSection from '~/components/common/ServiceShowcaseSection.vue'
import SystemCards from '~/components/common/SystemCards.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import type { SolutionPageTemplateContent } from '~/types/solution-template'

const props = defineProps<{
  content: SolutionPageTemplateContent
}>()

const slots = useSlots()

const heroStats = computed(() => props.content.heroStats ?? [])
const architectureCards = computed(() => props.content.architecture?.cards ?? [])
const hasHeroStats = computed(() => heroStats.value.length > 0)
const hasHeroVisual = computed(() => Boolean(slots['hero-visual']))
const hasAfterHero = computed(() => Boolean(slots['after-hero']))
const hasHeroAfterActions = computed(() => Boolean(slots['hero-after-actions']))
const hasArchitectureVisual = computed(() => Boolean(slots['architecture-visual']))
const hasArchitectureAfter = computed(() => Boolean(slots['architecture-after']))
const hasArchitectureCards = computed(() => architectureCards.value.length > 0)
const heroFlushBottom = computed(() => props.content.hero.flushBottom ?? (hasHeroStats.value || hasAfterHero.value))

useSeoMeta({
  title: () => props.content.seo.title,
  description: () => props.content.seo.description,
  ogTitle: () => props.content.seo.ogTitle ?? props.content.seo.title,
  ogDescription: () => props.content.seo.ogDescription ?? props.content.seo.description,
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" class="solution-page-template bg-dt-bg">
      <PageHero
        :badge="content.hero.badge"
        :badge-icon="content.hero.badgeIcon"
        :title-id="content.hero.titleId"
        :title-line="content.hero.titleLine"
        :title-gradient="content.hero.titleGradient"
        :description="content.hero.description"
        :actions="content.hero.actions"
        :visual-label="content.hero.visualLabel"
        :background-video-src="content.hero.backgroundVideoSrc"
        :align="content.hero.align ?? 'left'"
        :visual-size="content.hero.visualSize ?? 'default'"
        :flush-bottom="heroFlushBottom"
        :flush-visual-end="content.hero.flushVisualEnd"
      >
        <template v-if="hasHeroVisual" #visual>
          <slot name="hero-visual" />
        </template>
        <template v-if="hasHeroStats || hasHeroAfterActions" #after-actions>
          <HeroStatsStrip
            v-if="hasHeroStats"
            :items="heroStats"
            :columns="content.heroStatsColumns ?? 3"
          />
          <slot name="hero-after-actions" />
        </template>
      </PageHero>

      <slot name="after-hero" />

      <ProductFeatureGridSection
        v-if="content.value"
        :eyebrow="content.value.eyebrow"
        :title="content.value.title"
        :title-id="content.value.titleId"
        :subtitle="content.value.subtitle"
        :items="content.value.items"
        :columns="content.value.columns ?? 'four'"
        :nowrap-subtitle="content.value.nowrapSubtitle ?? true"
        :icon-box-size="content.value.iconBoxSize ?? 40"
        :icon-size="content.value.iconSize ?? 20"
        :icon-bordered="content.value.iconBordered ?? true"
        :icon-filled="content.value.iconFilled ?? true"
      />

      <slot name="after-value" />

      <AlternatingTimelineSection
        v-if="content.approach"
        :eyebrow="content.approach.eyebrow"
        :title="content.approach.title"
        :title-id="content.approach.titleId"
        :subtitle="content.approach.subtitle"
        :items="content.approach.items"
      />

      <slot name="after-approach" />

      <ProductArchitectureSection
        v-if="content.architecture"
        :eyebrow="content.architecture.eyebrow"
        :title="content.architecture.title"
        :title-id="content.architecture.titleId"
        :subtitle="content.architecture.subtitle"
        :label="content.architecture.label"
        :fallback-text="content.architecture.fallbackText ?? '解决方案架构图占位符'"
        :content-flush="content.architecture.contentFlush ?? true"
        :heading-wide="content.architecture.headingWide ?? true"
        :nowrap-subtitle="content.architecture.nowrapSubtitle ?? true"
        :frame-offset="content.architecture.frameOffset ?? true"
      >
        <template v-if="hasArchitectureVisual" #default>
          <slot name="architecture-visual" />
        </template>
        <template v-if="hasArchitectureCards || hasArchitectureAfter" #after>
          <SystemCards
            v-if="hasArchitectureCards"
            :cards="architectureCards"
          />
          <slot name="architecture-after" />
        </template>
      </ProductArchitectureSection>

      <slot name="after-architecture" />

      <ProductFeatureGridSection
        v-if="content.capabilities"
        :eyebrow="content.capabilities.eyebrow"
        :title="content.capabilities.title"
        :title-id="content.capabilities.titleId"
        :subtitle="content.capabilities.subtitle"
        :items="content.capabilities.items"
        :columns="content.capabilities.columns ?? 'three'"
        :nowrap-subtitle="content.capabilities.nowrapSubtitle ?? true"
        :icon-box-size="content.capabilities.iconBoxSize ?? 40"
        :icon-size="content.capabilities.iconSize ?? 20"
        :icon-bordered="content.capabilities.iconBordered ?? true"
        :icon-filled="content.capabilities.iconFilled ?? true"
      />

      <slot name="after-capabilities" />

      <ServiceShowcaseSection
        v-if="content.showcase"
        :eyebrow="content.showcase.eyebrow"
        :title="content.showcase.title"
        :title-id="content.showcase.titleId"
        :subtitle="content.showcase.subtitle"
        :items="content.showcase.items"
        :image-src="content.showcase.imageSrc"
        :image-alt="content.showcase.imageAlt"
        :fallback-text="content.showcase.fallbackText"
        :reverse="content.showcase.reverse"
      />

      <slot name="after-showcase" />

      <EngineLinksSection
        v-if="content.related"
        :eyebrow="content.related.eyebrow"
        :title="content.related.title"
        :title-id="content.related.titleId"
        :description="content.related.description"
        :links="content.related.links"
      />

      <slot name="before-cta" />

      <CtaSection
        v-if="content.cta"
        :title="content.cta.title"
        :title-id="content.cta.titleId"
        :description="content.cta.description"
        :actions="content.cta.actions"
      />
    </main>
    <SiteFooter />
  </div>
</template>
