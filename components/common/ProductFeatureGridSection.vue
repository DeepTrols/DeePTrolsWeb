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
    topPadding?: boolean
    nowrapSubtitle?: boolean
  }>(),
  {
    columns: 'four',
    topPadding: false,
    nowrapSubtitle: false,
  },
)

const sectionClasses = computed(() => [
  'relative bg-dt-bg pb-32 lg:pb-44',
  props.topPadding ? 'pt-24' : '',
])

const gridClasses = computed(() => [
  'grid auto-rows-fr items-stretch gap-5 lg:gap-6',
  props.columns === 'two' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4',
])
</script>

<template>
  <section :class="sectionClasses" :aria-labelledby="titleId">
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
          class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dt-line bg-dt-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dt-primary/40 hover:shadow-xl hover:shadow-dt-primary/5 motion-reduce:hover:translate-y-0"
        >
          <div
            class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-dt-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          ></div>
          <div
            v-if="item.icon"
            class="relative mb-6 flex size-12 shrink-0 items-center justify-center rounded-xl bg-dt-primary/10 text-dt-primary ring-1 ring-dt-primary/20"
          >
            <component :is="item.icon" class="size-6" aria-hidden="true" />
          </div>
          <h3 class="relative text-xl font-bold leading-tight text-dt-text-highlighted">{{ item.title }}</h3>
          <p class="relative mt-4 flex-1 text-base leading-relaxed text-dt-text-muted">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
