<script setup lang="ts">
import type { heroSectionSchema, sectionSpacingSchema } from '~/server/utils/page-sections'
import type { z } from 'zod'
import { computed } from 'vue'
import CmsHeroBannerDark from '~/components/sections/heroes/CmsHeroBannerDark.vue'
import CmsHeroFullscreenImage from '~/components/sections/heroes/CmsHeroFullscreenImage.vue'
import CmsHeroFullscreenVideo from '~/components/sections/heroes/CmsHeroFullscreenVideo.vue'
import CmsHeroSplitVisual from '~/components/sections/heroes/CmsHeroSplitVisual.vue'

// CMS hero 区块：渲染为页面主标题（h1）——页面含可见 hero 区块时 CmsPageView 不再渲染默认页头
// 015.18 起按 variant 分发：simple=极简文本（原形态）；其余四变体见 sections/heroes/
// hero 是页首区块，间距节奏比通用三档小一档（compact 保持现状 pb-12）
const props = withDefaults(
  defineProps<{
    section: z.infer<typeof heroSectionSchema>
    titleId: string
    spacing?: z.infer<typeof sectionSpacingSchema>
  }>(),
  { spacing: 'compact' },
)

const spacingClass = computed(() => {
  switch (props.spacing) {
    case 'tight': {
      return 'pb-8'
    }
    case 'default': {
      return 'pb-16'
    }
    default: {
      return 'pb-12'
    }
  }
})
</script>

<template>
  <CmsHeroFullscreenImage
    v-if="section.variant === 'fullscreen-image'"
    :title-id="titleId"
    :title-lines="section.titleLines ?? [section.title]"
    :subtitle="section.subtitle"
    :cta-label="section.ctaLabel"
    :cta-href="section.ctaHref"
    :background-image="section.backgroundImage ?? ''"
  />
  <CmsHeroSplitVisual
    v-else-if="section.variant === 'split-visual'"
    :title-id="titleId"
    :title="section.title"
    :badge="section.badge"
    :description="section.description ?? section.subtitle ?? ''"
    :align="section.align ?? 'left'"
    :cta-label="section.ctaLabel"
    :cta-href="section.ctaHref"
    :secondary-cta-label="section.secondaryCtaLabel"
    :secondary-cta-href="section.secondaryCtaHref"
    :visual-type="section.visualType ?? 'none'"
    :visual-name="section.visualName"
    :visual-image="section.visualImage"
    :visual-alt="section.visualAlt"
  />
  <CmsHeroBannerDark
    v-else-if="section.variant === 'banner-dark'"
    :title-id="titleId"
    :title="section.title"
    :description="section.description ?? section.subtitle"
    :media-type="section.mediaType ?? 'image'"
    :background-image="section.backgroundImage"
    :background-video="section.backgroundVideo"
    :cta-label="section.ctaLabel"
    :cta-href="section.ctaHref"
  />
  <CmsHeroFullscreenVideo
    v-else-if="section.variant === 'fullscreen-video'"
    :title-id="titleId"
    :title="section.title"
    :description="section.description ?? section.subtitle"
    :background-video="section.backgroundVideo ?? ''"
  />
  <section v-else class="container pt-32 lg:pt-40" :class="spacingClass" :aria-labelledby="titleId">
    <p v-if="section.eyebrow" class="text-[13px] font-semibold uppercase tracking-wide text-primary">
      {{ section.eyebrow }}
    </p>
    <h1
      :id="titleId"
      class="mt-4 max-w-4xl text-4xl font-bold leading-tight text-dt-text-highlighted lg:text-6xl"
    >
      {{ section.title }}
    </h1>
    <p v-if="section.subtitle" class="mt-6 max-w-3xl text-lg leading-8 text-dt-text-muted">
      {{ section.subtitle }}
    </p>
  </section>
</template>
