<script setup lang="ts">
import { aboutValues } from '~/data/about'
</script>

<template>
  <section class="container pb-32 lg:pb-48" aria-labelledby="about-values-title">
    <h2
      id="about-values-title"
      class="mb-4 text-center text-4xl font-bold leading-[1.2] tracking-tight text-highlighted md:mb-6 sm:text-5xl"
    >
      我们的核心价值观
    </h2>
    <p class="mb-12 text-center text-base text-default md:mb-8 md:text-xl lg:mb-12 sm:text-lg">
      这些原则指引着我们的一言一行，从产品创新到客户关系，贯穿始终。
    </p>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        v-for="item in aboutValues"
        :key="item.title"
        tabindex="0"
        class="about-value-card group relative min-h-[220px] cursor-pointer overflow-hidden rounded-lg outline-none"
      >
        <div class="invisible px-6 py-12">
          <div class="mb-4 text-xl font-semibold">{{ item.revealTitle }}</div>
          <div class="text-base font-normal leading-normal">{{ item.description }}</div>
        </div>

        <div class="about-value-card__face absolute inset-0 z-[1] flex items-end p-6">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-primary">Value</p>
            <h3 class="mt-3 text-3xl font-bold leading-tight text-highlighted">{{ item.title }}</h3>
          </div>
        </div>

        <div class="about-value-card__reveal absolute inset-0 z-[2] flex translate-y-full flex-col justify-end p-6 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <h3 class="text-xl font-semibold text-highlighted">{{ item.revealTitle }}</h3>
          <p class="mt-4 text-base font-normal leading-normal text-default">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-value-card {
  background:
    radial-gradient(120% 120% at 100% 0%, rgba(94, 78, 255, 0.22), transparent 58%),
    linear-gradient(142deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025)),
    var(--dt-color-bg-soft);
  box-shadow: inset 0 0 0 1px var(--dt-color-line);
}

.about-value-card__face {
  transition:
    opacity var(--dt-duration-slow) ease,
    transform var(--dt-duration-slow) ease;
}

.about-value-card__reveal {
  background:
    radial-gradient(90% 80% at 80% 0%, rgba(86, 154, 255, 0.18), transparent 60%),
    linear-gradient(180deg, rgba(39, 30, 53, 0.98), rgba(24, 21, 36, 0.98));
}

.about-value-card:hover .about-value-card__face,
.about-value-card:focus-visible .about-value-card__face {
  transform: translateY(-12px);
  opacity: 0;
}
</style>
