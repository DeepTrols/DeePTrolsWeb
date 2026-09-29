<script setup lang="ts">
// CMS hero · fullscreen-video 变体（015.18）：FdeHero 形态（全屏视频居中、无 CTA），文案 props 化
defineProps<{
  titleId: string
  title: string
  description?: string
  backgroundVideo: string
}>()
</script>

<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
    :aria-labelledby="titleId"
  >
    <video
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
      class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.72)_100%)]"
      aria-hidden="true"
    ></div>
    <div class="container relative z-[1] flex min-h-screen items-center justify-center">
      <div class="mx-auto max-w-[980px] text-center">
        <h1
          :id="titleId"
          class="m-0 text-[clamp(34px,4.6vw,72px)] font-medium leading-[1.12] tracking-[0] text-white"
        >
          {{ title }}
        </h1>
        <h2 v-if="description" class="m-0 mx-auto mt-6 max-w-[760px] text-[35px] font-normal leading-[1.6] text-white/82">
          {{ description }}
        </h2>
      </div>
    </div>
  </section>
</template>
