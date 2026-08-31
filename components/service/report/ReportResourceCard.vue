<script setup lang="ts">
import type { ReportResource } from '~/data/reports'

withDefaults(
  defineProps<{
    item: ReportResource
    eager?: boolean
  }>(),
  {
    eager: false,
  },
)
</script>

<template>
  <NuxtLink :to="item.href" class="group block">
    <article>
      <div class="relative mb-4 aspect-[400/180] overflow-hidden rounded-lg">
        <span class="absolute left-3 top-3 z-10 inline-flex select-none items-center justify-center rounded-full bg-violet-500 px-2.5 py-0.5 text-sm text-white">
          {{ item.type }}
        </span>
        <img
          width="400"
          height="180"
          :alt="item.title"
          :loading="eager ? 'eager' : 'lazy'"
          decoding="async"
          :src="item.image"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
      </div>
      <p class="mb-2 text-sm font-medium text-primary/75">{{ item.category }}</p>
      <h2 class="text-xl font-semibold leading-snug text-highlighted transition-colors duration-200 group-hover:text-primary">
        {{ item.title }}
      </h2>
      <p class="mt-3 text-base leading-relaxed text-muted">{{ item.summary }}</p>
    </article>
  </NuxtLink>
</template>
