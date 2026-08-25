<script setup lang="ts">
import type { AboutStatItem } from '~/data/about'

defineProps<{
  items: AboutStatItem[]
}>()
</script>

<template>
  <section class="about-hero-stats container !p-0" aria-label="DeepTrols 关键数据">
    <div class="flex flex-col items-center text-center">
      <div class="w-full border-default border-0 p-6 !p-0 sm:p-8">
        <div class="grid grid-cols-3 gap-x-6 gap-y-10">
          <div v-for="item in items" :key="item.label" class="min-w-0">
            <span class="mb-2 block text-3xl font-bold tabular-nums text-highlighted lg:text-4xl">
              {{ item.value }}
            </span>
            <p class="text-sm text-muted">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
