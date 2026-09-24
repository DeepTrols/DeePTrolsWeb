<script setup lang="ts">
import type { heroSectionSchema, sectionSpacingSchema } from '~/server/utils/page-sections'
import type { z } from 'zod'
import { computed } from 'vue'

// CMS hero 区块：渲染为页面主标题（h1）——页面含可见 hero 区块时 CmsPageView 不再渲染默认页头
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
  <section class="container pt-32 lg:pt-40" :class="spacingClass" :aria-labelledby="titleId">
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
