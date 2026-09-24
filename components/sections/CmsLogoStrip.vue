<script setup lang="ts">
import type { logoStripSectionSchema, sectionSpacingSchema } from '~/server/utils/page-sections'
import type { z } from 'zod'
import { computed } from 'vue'

// CMS logo 墙：静态网格（非走马灯），logo 至少带 image 或 text（zod 保证）
// spacing 三档沿用 SectionShell 节奏（compact 保持现状 pb-16 lg:pb-32）
const props = withDefaults(
  defineProps<{
    section: z.infer<typeof logoStripSectionSchema>
    spacing?: z.infer<typeof sectionSpacingSchema>
  }>(),
  { spacing: 'compact' },
)

const spacingClass = computed(() => {
  switch (props.spacing) {
    case 'tight': {
      return 'pb-8 lg:pb-16'
    }
    case 'default': {
      return 'pb-32 lg:pb-44'
    }
    default: {
      return 'pb-16 lg:pb-32'
    }
  }
})
</script>

<template>
  <section class="container pt-12 lg:pt-16" :class="spacingClass" :aria-label="section.title ?? '合作伙伴'">
    <h2 v-if="section.title" class="text-center text-base font-normal text-dt-text-muted">
      {{ section.title }}
    </h2>
    <ul class="mt-8 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-6 p-0">
      <li v-for="logo in section.logos" :key="logo.name" class="flex h-12 items-center">
        <img
          v-if="logo.image"
          :src="logo.image"
          :alt="logo.name"
          class="max-h-12 object-contain"
          loading="lazy"
        />
        <span v-else class="whitespace-nowrap text-sm font-semibold text-dt-text-muted">
          {{ logo.text ?? logo.name }}
        </span>
      </li>
    </ul>
  </section>
</template>
