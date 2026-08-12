<script setup lang="ts">
export interface ValueMetric {
  value: string
  label: string
}

export interface ValueQuote {
  text: string
  cite: string
}

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description: string
    layout?: 'split' | 'stack'
    metrics?: ValueMetric[]
    quote?: ValueQuote
  }>(),
  {
    layout: 'split',
    metrics: () => [],
    quote: undefined,
  },
)
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-default bg-default shadow-sm transition-shadow duration-500 hover:shadow-md"
    :class="layout === 'stack' && 'flex flex-col'"
  >
    <div :class="layout === 'split' ? 'grid lg:grid-cols-2' : 'flex flex-1 flex-col'">
      <div class="flex flex-col justify-center" :class="layout === 'split' ? 'p-8 lg:p-12' : 'p-8 lg:p-10'">
        <span
          class="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary"
        >
          {{ eyebrow }}
        </span>
        <h3
          class="font-bold leading-tight text-highlighted"
          :class="layout === 'split' ? 'text-2xl lg:text-[28px]' : 'text-xl lg:text-[22px]'"
        >
          {{ title }}
        </h3>
        <p class="leading-relaxed text-muted" :class="layout === 'split' ? 'mt-4 text-[15px]' : 'mt-3 text-[15px]'">
          {{ description }}
        </p>

        <ul v-if="metrics.length" class="mt-8 space-y-3">
          <li v-for="metric in metrics" :key="metric.label" class="flex items-baseline gap-3">
            <span class="text-lg font-bold whitespace-nowrap text-primary">{{ metric.value }}</span>
            <span class="text-[13px] leading-relaxed text-muted">{{ metric.label }}</span>
          </li>
        </ul>

        <blockquote v-if="quote" class="mt-8 border-l-2 border-primary pl-4">
          <p class="text-[15px] italic leading-relaxed text-[var(--dt-color-text-highlighted)]/80">"{{ quote.text }}"</p>
          <cite class="mt-2 block text-xs font-medium not-italic text-dimmed">{{ quote.cite }}</cite>
        </blockquote>
      </div>

      <div
        class="relative hidden items-center justify-center lg:flex"
        :class="layout === 'split' ? 'p-4 lg:p-6' : 'mt-auto px-4 pb-4'"
      >
        <slot name="visual" />
      </div>
    </div>
  </div>
</template>
