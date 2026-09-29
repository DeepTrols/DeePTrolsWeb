<script setup lang="ts">
import PageHero from '~/components/common/PageHero.vue'
import { heroVisualComponents } from '~/components/sections/hero-visual-registry'
import type { HeroVisualName } from '~/components/sections/hero-visual-names'

// CMS hero · split-visual 变体（015.18）：PageHero 家族归并（6 产品页 + 动态方案页 + DeviceAgent/
// why/about/contact/reports 同一骨架），右侧视觉走白名单动画组件或静态图；复用 PageHero 壳
withDefaults(
  defineProps<{
    titleId: string
    title: string
    badge?: string
    description?: string
    align?: 'center' | 'left'
    ctaLabel?: string
    ctaHref?: string
    secondaryCtaLabel?: string
    secondaryCtaHref?: string
    visualType?: 'component' | 'image' | 'none'
    visualName?: HeroVisualName
    visualImage?: string
    visualAlt?: string
  }>(),
  {
    badge: undefined,
    description: '',
    align: 'left',
    ctaLabel: undefined,
    ctaHref: undefined,
    secondaryCtaLabel: undefined,
    secondaryCtaHref: undefined,
    visualType: 'none',
    visualName: undefined,
    visualImage: undefined,
    visualAlt: undefined,
  },
)
</script>

<template>
  <PageHero
    :title-id="titleId"
    :title-line="title"
    :description="description"
    :badge="badge"
    :align="align"
    :cta-label="ctaLabel"
    :cta-href="ctaHref"
    :visual-label="visualAlt"
  >
    <template v-if="visualType !== 'none'" #visual>
      <component
        :is="heroVisualComponents[visualName]"
        v-if="visualType === 'component' && visualName"
      />
      <img
        v-else-if="visualType === 'image' && visualImage"
        class="h-auto w-full object-contain"
        :src="visualImage"
        :alt="visualAlt ?? ''"
      />
    </template>
    <template v-if="secondaryCtaLabel && secondaryCtaHref" #after-actions>
      <div class="mt-4 flex flex-wrap items-center justify-center gap-4" :class="align === 'center' ? '' : 'lg:justify-start'">
        <NuxtLink class="text-sm font-semibold text-primary hover:underline" :to="secondaryCtaHref">
          {{ secondaryCtaLabel }}
        </NuxtLink>
      </div>
    </template>
  </PageHero>
</template>
