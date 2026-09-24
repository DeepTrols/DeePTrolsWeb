<script setup lang="ts">
import type { imageBannerSectionSchema, sectionSpacingSchema } from '~/server/utils/page-sections'
import type { z } from 'zod'
import { computed } from 'vue'

// CMS 图片横幅：容器宽大图 + 可选说明文字
// spacing 三档沿用 SectionShell 节奏（compact 保持现状 pb-16 lg:pb-32）
const props = withDefaults(
  defineProps<{
    section: z.infer<typeof imageBannerSectionSchema>
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
  <section class="container pt-8 lg:pt-12" :class="spacingClass">
    <figure class="mx-auto m-0 max-w-5xl">
      <img
        :src="section.src"
        :alt="section.alt"
        class="w-full rounded-2xl shadow-lg"
        loading="lazy"
      />
      <figcaption v-if="section.caption" class="mt-3 text-center text-sm text-dt-text-muted">
        {{ section.caption }}
      </figcaption>
    </figure>
  </section>
</template>
