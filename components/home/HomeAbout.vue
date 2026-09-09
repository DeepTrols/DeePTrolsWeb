<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { homeAbout } from '~/data/home'

const homeAboutTitle = computed(() => homeAbout.title.replace('构建者与引领者', '\n构建者与引领者'))

const rowAnimationClasses = [
  'animate-home-about-marquee-right',
  'animate-home-about-marquee-left',
  'animate-home-about-marquee-right',
] as const

const partnerRows = computed(() => homeAbout.partnerRows.map((row) => [...row, ...row, ...row, ...row]))
</script>

<template>
  <section
    class="home-about bg-[linear-gradient(180deg,#ffffff_52.91%,#eceeff_120.63%)] pb-0 pt-[78px]"
    aria-labelledby="home-about-title"
  >
    <div class="container">
      <SectionHeading
        class="company-stats__header [&_.section-heading__title]:whitespace-pre-line"
        :eyebrow="homeAbout.eyebrow"
        :title="homeAboutTitle"
        title-id="home-about-title"
        align="center"
      />

      <div class="company-stats mx-auto mt-12 w-[calc(100%_-_10px)]">
        <img
          class="company-stats__banner block aspect-[1402/357] w-full rounded-dt-md object-cover"
          :src="homeAbout.bannerImage"
          :alt="homeAbout.bannerAlt"
          loading="lazy"
        >
      </div>

      <img
        class="clients-label mx-auto mb-[42px] mt-[62px] block h-auto max-h-[26px] w-auto max-w-full object-contain"
        :src="homeAbout.clientsLabelImage"
        :alt="homeAbout.clientsLabelAlt"
        loading="lazy"
      >
    </div>

    <div class="partner-rows flex w-screen flex-col gap-[18px] overflow-hidden" aria-label="合作客户">
      <div v-for="(row, rowIndex) in partnerRows" :key="rowIndex" class="partner-row overflow-hidden">
        <div
          class="partner-row__track flex w-max items-center gap-[22px] motion-reduce:animate-none"
          :class="rowAnimationClasses[rowIndex]"
        >
          <div
            v-for="(partner, partnerIndex) in row"
            :key="`${partner.name}-${partnerIndex}`"
            class="partner-logo flex h-[55px] w-36 shrink-0 items-center justify-center overflow-hidden bg-white"
          >
            <img
              v-if="partner.image"
              class="block h-[55px] w-36 object-contain"
              :src="partner.image"
              :alt="partner.name"
              loading="lazy"
            >
            <span v-else class="truncate px-4 text-sm font-medium text-dt-text-muted">
              {{ partner.text ?? partner.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
