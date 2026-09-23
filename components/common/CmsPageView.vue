<script setup lang="ts">
import ArticleContent from '~/components/common/article/ArticleContent.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/navigation/SiteHeader.vue'
import type { PublishedPagePayload } from '~/server/utils/pages-admin'

// CMS 页统一渲染器：catch-all 分发器与 /solutions/[slug] 回退分支共用（后者受 harness 约束不能自带 shell）
defineProps<{ page: PublishedPagePayload }>()
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content">
      <section class="container pb-10 pt-32 lg:pt-40" aria-labelledby="cms-page-title">
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
      <section
        v-for="(section, index) in page.sections"
        :key="index"
        class="container py-6 lg:py-10"
      >
        <ArticleContent v-if="section.type === 'richText'" :blocks="section.blocks" />
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
