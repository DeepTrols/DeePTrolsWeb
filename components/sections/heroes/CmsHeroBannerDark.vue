<script setup lang="ts">
// CMS hero · banner-dark 变体（015.18）：方案页深色媒体横幅五合一（Manufacturing/EnergySaving/
// Hydraulic/Datacenter/Education 同骨架），mediaType 切换背景图/视频；文案全部 props 化
withDefaults(
  defineProps<{
    titleId: string
    title: string
    description?: string
    mediaType?: 'image' | 'video'
    backgroundImage?: string
    backgroundVideo?: string
    ctaLabel?: string
    ctaHref?: string
  }>(),
  {
    description: undefined,
    mediaType: 'image',
    backgroundImage: undefined,
    backgroundVideo: undefined,
    ctaLabel: undefined,
    ctaHref: undefined,
  },
)
</script>

<template>
  <section class="relative h-[586px] overflow-hidden bg-[#1f49e5]" :aria-labelledby="titleId">
    <img
      v-if="mediaType === 'image' && backgroundImage"
      class="absolute inset-0 h-full w-full object-cover object-center"
      :src="backgroundImage"
      alt=""
      aria-hidden="true"
    />
    <video
      v-else-if="mediaType === 'video' && backgroundVideo"
      class="absolute inset-0 h-full w-full object-cover"
      :src="backgroundVideo"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    ></video>
    <div
      class="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0,rgba(0,0,0,0.26)_38%,rgba(0,0,0,0)_62%)]"
      aria-hidden="true"
    ></div>
    <div class="container relative h-full">
      <div
        class="page-hero__title-block absolute left-0 top-[clamp(78px,10.729vw,206px)] w-[min(763px,100%)] max-w-full max-md:top-[142px]"
      >
        <h1
          :id="titleId"
          class="m-0 bg-[linear-gradient(104.09deg,#1e44e0_-15.53%,#ffffff_36.62%)] bg-clip-text text-[clamp(28px,2.5vw,48px)] font-medium leading-[clamp(38px,3.75vw,72px)] tracking-[0] text-transparent [-webkit-text-fill-color:transparent] max-md:text-[32px] max-md:leading-[1.32]"
        >
          {{ title }}
        </h1>
      </div>
      <div
        v-if="description"
        class="absolute left-0 top-[clamp(132px,16.67vw,320px)] w-[min(760px,100%)] max-w-full max-md:top-[230px]"
      >
        <div class="page-hero__description-block">
          <p class="m-0 max-w-[760px] text-[clamp(14px,0.885vw,17px)] leading-[1.5] tracking-[1px] text-white max-md:text-[15px]">
            {{ description }}
          </p>
        </div>
      </div>
      <div
        v-if="ctaLabel && ctaHref"
        class="page-hero__actions absolute left-0 top-[clamp(246px,24.375vw,468px)] flex w-[277px] max-w-full flex-wrap items-center gap-4 max-md:top-[470px]"
      >
        <NuxtLink
          class="inline-flex h-[47px] w-full items-center justify-between gap-2 border border-white bg-transparent px-6 text-[16px] font-normal leading-none !text-white no-underline transition-[background-color,border-color,transform] duration-200 hover:border-white hover:bg-white/10 hover:!text-white hover:-translate-y-0.5 focus-visible:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          :to="ctaHref"
        >
          <span class="text-white">{{ ctaLabel }}</span>
          <svg
            class="size-6 shrink-0 !text-white"
            viewBox="0 0 24 8"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 4H21M17 1L21 4L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
