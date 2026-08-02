<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import type { Component } from 'vue'

export interface ProductFeatureGridItem {
  title: string
  description: string
  icon?: Component
}

const props = withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    items: ProductFeatureGridItem[]
    columns?: 'two' | 'four'
    nowrapSubtitle?: boolean
  }>(),
  {
    columns: 'four',
    nowrapSubtitle: false,
  },
)

const gridClasses = computed(() => [
  'grid auto-rows-fr items-stretch gap-5 lg:gap-6',
  props.columns === 'two' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4',
])
</script>

<template>
  <section class="relative bg-dt-bg pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeading
          :title-id="titleId"
          :eyebrow="eyebrow"
          :title="title"
          :subtitle="subtitle"
          align="center"
          :nowrap-subtitle="nowrapSubtitle"
        />
      </div>

      <div :class="gridClasses">
        <article
          v-for="item in items"
          :key="item.title"
          class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dt-line bg-dt-bg-soft/30 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-dt-bg-soft/50"
        >
          <div
            class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-dt-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          ></div>
          <div
            v-if="item.icon"
            class="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20"
          >
            <component :is="item.icon" class="size-5" aria-hidden="true" />
          </div>
          <h3 class="relative mt-4 text-[15px] font-semibold leading-snug text-highlighted">{{ item.title }}</h3>
          <p class="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
