<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { aboutContacts } from '~/data/about'
</script>

<template>
  <section class="flow-root pb-32 lg:pb-44" aria-labelledby="about-contact-title">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeader title="联系我们" title-id="about-contact-title" align="center" />
      </div>

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
