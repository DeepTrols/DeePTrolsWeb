<script setup lang="ts">
import { aboutContacts } from '~/data/about'
</script>

<template>
  <section class="container pb-32 text-center lg:pb-48" aria-labelledby="about-contact-title">
    <h2
      id="about-contact-title"
      class="!mb-12 mb-4 text-4xl font-bold leading-[1.2] tracking-tight text-highlighted md:mb-6 sm:text-5xl"
    >
      联系我们
    </h2>

    <div class="about-contact-grid grid grid-cols-1 overflow-hidden rounded-2xl border border-default md:grid-cols-2">
      <a
        v-for="item in aboutContacts"
        :key="item.label"
        :href="item.href"
        target="_self"
        class="about-contact-grid__item flex min-h-[148px] flex-col justify-center gap-2 p-8 text-center transition-colors duration-200 hover:bg-dt-bg-soft/50 md:p-10"
      >
        <div class="text-base font-normal text-muted">{{ item.label }}</div>
        <div class="text-lg font-semibold text-highlighted">{{ item.value }}</div>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-contact-grid__item {
  border-top: 1px solid var(--dt-color-line);
}

.about-contact-grid__item:first-child {
  border-top: 0;
}

@media (min-width: 768px) {
  .about-contact-grid__item {
    border-top: 1px solid var(--dt-color-line);
    border-left: 1px solid var(--dt-color-line);
  }

  .about-contact-grid__item:nth-child(-n + 2) {
    border-top: 0;
  }

  .about-contact-grid__item:nth-child(2n + 1) {
    border-left: 0;
  }
}
</style>
