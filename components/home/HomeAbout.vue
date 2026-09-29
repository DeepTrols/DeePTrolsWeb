<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { homeAbout as defaultHomeAbout } from '~/data/home'

// CMS 接管（015.18）：全部 props 可选，缺省读 data 静态 = 代码回退与 CMS 渲染共用同一 SFC；
// partnerRows 不进 props（?url 资产 + 015.14 showcase 渠道），由默认数据直通
const props = defineProps<{
  eyebrow?: string
  title?: string
  bannerImage?: string
  bannerAlt?: string
  clientsLabelImage?: string
  clientsLabelAlt?: string
}>()

const homeAbout = computed(() => ({
  eyebrow: props.eyebrow ?? defaultHomeAbout.eyebrow,
  title: props.title ?? defaultHomeAbout.title,
  bannerImage: props.bannerImage ?? defaultHomeAbout.bannerImage,
  bannerAlt: props.bannerAlt ?? defaultHomeAbout.bannerAlt,
  clientsLabelImage: props.clientsLabelImage ?? defaultHomeAbout.clientsLabelImage,
  clientsLabelAlt: props.clientsLabelAlt ?? defaultHomeAbout.clientsLabelAlt,
  partnerRows: defaultHomeAbout.partnerRows,
}))

const rowAnimationClasses = [
  'animate-home-about-marquee-right',
  'animate-home-about-marquee-left',
  'animate-home-about-marquee-right',
] as const

const partnerRows = computed(() => homeAbout.value.partnerRows.map((row) => [...row, ...row, ...row, ...row]))
</script>

<template>
  <section
    class="home-about bg-[linear-gradient(180deg,#ffffff_52.91%,#eceeff_120.63%)] flow-root pb-10"
    aria-labelledby="home-about-title"
  >
    <div class="container mb-10">
      <SectionHeading
        class="company-stats__header"
        :eyebrow="homeAbout.eyebrow"
        :title="homeAbout.title"
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
