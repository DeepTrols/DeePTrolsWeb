<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { aboutAddress, aboutMap } from '~/data/about'
</script>

<template>
  <section class="container pb-32 lg:pb-44" aria-labelledby="about-address-title">
    <div class="mb-12 lg:mb-16">
      <SectionHeader title="公司地址" title-id="about-address-title" align="center" />
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
      <div class="rounded-2xl border border-default bg-default p-6 text-left shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-primary">DeepTrols HQ</p>
        <h3 class="mt-4 text-2xl font-semibold leading-tight text-highlighted sm:text-3xl">
          武汉深度数智科技有限公司
        </h3>
        <p class="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{{ aboutAddress }}</p>
        <a
          :href="aboutMap.linkUrl"
          target="_blank"
          rel="noreferrer"
          class="mt-8 inline-flex items-center rounded-md px-4 py-3 text-base font-medium text-default ring ring-inset ring-accented transition-colors hover:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
        >
          查看地图
        </a>
      </div>

      <div class="relative min-h-[360px] overflow-hidden rounded-2xl border border-default bg-default shadow-sm lg:min-h-[420px]">
        <iframe
          :src="aboutMap.embedUrl"
          :title="aboutMap.title"
          class="absolute inset-0 size-full opacity-80 grayscale invert"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(21,21,21,0.18)_62%,rgba(21,21,21,0.82)_100%)]"></div>
        <div class="pointer-events-none absolute left-5 top-5 rounded-full border border-primary/20 bg-dt-bg/80 px-4 py-2 text-sm font-medium text-highlighted backdrop-blur">
          {{ aboutMap.title }}
        </div>
      </div>
    </div>
  </section>
</template>
