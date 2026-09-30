<script setup lang="ts">
import { computed } from 'vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import CmsPageRenderer from '~/components/sections/CmsPageRenderer.vue'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

// CMS 页统一渲染器：catch-all 分发器与 /solutions/[slug] 回退分支共用（后者受 harness 约束不能自带 shell）
const props = defineProps<{
  page: PublishedPagePayload
  /** 015.19e：实时预览态横幅文案（缺省为草稿预览文案） */
  previewBanner?: string
}>()

// 页面含可见 hero 区块时由 hero 承担 h1，默认页头不再渲染（避免双主标题）。
// 定制 hero（015.20b：AboutHero 自带 h1 页首视觉）同样计入
const CUSTOM_HERO_NAMES = ['AboutHero'] as const
const hasHero = computed(() =>
  props.page.sections.some(section =>
    (section.type === 'hero' || (section.type === 'custom' && (CUSTOM_HERO_NAMES as readonly string[]).includes(section.name))) && section.visible,
  ),
)
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <div
      v-if="page.preview"
      class="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-800"
      role="status"
    >
      {{ previewBanner ?? '草稿预览 · 仅管理员可见' }}
    </div>
    <main id="main-content">
      <section
        v-if="!hasHero"
        class="container pb-10 pt-32 lg:pt-40"
        aria-labelledby="cms-page-title"
      >
        <p class="text-[13px] font-semibold uppercase tracking-wide text-primary">DeepTrols</p>
        <h1
          id="cms-page-title"
          class="mt-4 max-w-4xl text-4xl font-bold leading-tight text-dt-text-highlighted lg:text-6xl"
        >
          {{ page.title }}
        </h1>
        <p v-if="page.seoDescription" class="mt-6 max-w-3xl text-lg leading-8 text-dt-text-muted">
          {{ page.seoDescription }}
        </p>
      </section>
      <CmsPageRenderer :sections="page.sections" />
    </main>
    <SiteFooter />
  </div>
</template>
