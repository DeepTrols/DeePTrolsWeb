<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CarouselControls from '~/components/common/carousel/CarouselControls.vue'
import { aboutIntroGallery } from '~/data/about'

const trackRef = ref<HTMLElement | null>(null)
const photoCount = aboutIntroGallery.length
const canGoPrevious = ref(false)
const canGoNext = ref(photoCount > 1)

function updateControls() {
  const track = trackRef.value

  if (!track) {
    return
  }

  canGoPrevious.value = track.scrollLeft > 1
  canGoNext.value = track.scrollLeft < track.scrollWidth - track.clientWidth - 1
}

function getPhotoStep() {
  const track = trackRef.value

  if (!track) {
    return 0
  }

  const firstPhoto = track.querySelector<HTMLElement>('[data-gallery-index="0"]')
  const secondPhoto = track.querySelector<HTMLElement>('[data-gallery-index="1"]')

  if (firstPhoto && secondPhoto) {
    return secondPhoto.offsetLeft - firstPhoto.offsetLeft
  }

  return firstPhoto?.offsetWidth ?? 0
}

function scrollByPhoto(direction: -1 | 1) {
  const track = trackRef.value

  if (!track || (direction < 0 && !canGoPrevious.value) || (direction > 0 && !canGoNext.value)) {
    return
  }

  track.scrollBy({ left: getPhotoStep() * direction, behavior: 'smooth' })
  window.requestAnimationFrame(updateControls)
}

function previousPhoto() {
  scrollByPhoto(-1)
}

function nextPhoto() {
  scrollByPhoto(1)
}

onMounted(async () => {
  await nextTick()
  updateControls()
  window.addEventListener('resize', updateControls)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateControls)
})
</script>

<template>
  <div class="about-intro-gallery select-none" aria-label="公司介绍图片">
    <div
      ref="trackRef"
      class="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="公司介绍图片"
      tabindex="0"
      @scroll="updateControls"
    >
      <figure
        v-for="(item, index) in aboutIntroGallery"
        :key="item.alt"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} / ${photoCount}`"
        :data-gallery-index="index"
        class="group relative m-0 aspect-[10/16] w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-default bg-muted p-2 transition-all duration-500 ease-out before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-lg before:bg-[image:var(--dt-gradient-hero)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:border-primary hover:before:opacity-100 sm:w-44 lg:w-48"
      >
        <img
          class="relative z-[1] h-full w-full rounded-md object-cover transition duration-500 group-hover:scale-105"
          :src="item.image"
          :alt="item.alt"
          loading="lazy"
        />
      </figure>
    </div>

    <div class="mt-6 flex w-full">
      <CarouselControls
        layout="split"
        previous-label="上一张公司介绍图片"
        next-label="下一张公司介绍图片"
        :previous-disabled="!canGoPrevious"
        :next-disabled="!canGoNext"
        @previous="previousPhoto"
        @next="nextPhoto"
      />
    </div>
  </div>
</template>
