<script setup lang="ts">
export interface SystemCard {
  title: string
  description: string
}

defineProps<{
  cards: SystemCard[]
}>()
</script>

<template>
  <div class="mt-10 grid auto-rows-fr items-stretch gap-4 md:grid-cols-3 lg:mt-12">
    <article
      v-for="(card, index) in cards"
      :key="card.title"
      class="group dt-card dt-card--adaptive dt-card--feature p-5"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-dt-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      ></div>
      <div
        class="relative dt-icon-box dt-icon-box--gradient text-sm font-bold"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </div>
      <h3 class="relative mt-4 text-[15px] font-semibold leading-6 text-dt-text-highlighted">{{ card.title }}</h3>
      <p class="relative mt-3 text-sm leading-relaxed text-dt-text-muted">{{ card.description }}</p>
    </article>
  </div>
</template>
