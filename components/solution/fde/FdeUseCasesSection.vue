<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CarouselControls from '~/components/common/carousel/CarouselControls.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { fdeUseCases } from '~/data/solutions/fde'

const trackRef = ref<HTMLElement | null>(null)
const useCaseCount = fdeUseCases.length
const canGoPrevious = ref(false)
const canGoNext = ref(useCaseCount > 1)

function updateControls() {
  const track = trackRef.value

  if (!track) {
    return
  }

  canGoPrevious.value = track.scrollLeft > 1
  canGoNext.value = track.scrollLeft < track.scrollWidth - track.clientWidth - 1
}

function getUseCaseStep() {
  const track = trackRef.value

  if (!track) {
    return 0
  }

  const firstCard = track.querySelector<HTMLElement>('[data-use-case-index="0"]')
  const secondCard = track.querySelector<HTMLElement>('[data-use-case-index="1"]')

  if (firstCard && secondCard) {
    return secondCard.offsetLeft - firstCard.offsetLeft
  }

  return firstCard?.offsetWidth ?? 0
}

function scrollByUseCase(direction: -1 | 1) {
  const track = trackRef.value

  if (!track || (direction < 0 && !canGoPrevious.value) || (direction > 0 && !canGoNext.value)) {
    return
  }

  track.scrollBy({ left: getUseCaseStep() * direction, behavior: 'smooth' })
  window.requestAnimationFrame(updateControls)
}

function previousUseCase() {
  scrollByUseCase(-1)
}

function nextUseCase() {
  scrollByUseCase(1)
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
  <section class="relative flow-root bg-dt-bg pb-16 lg:pb-32" aria-labelledby="fde-use-cases-title">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeader
          title-id="fde-use-cases-title"
          eyebrow="应用场景"
          title="从一个高价值问题开始，让 AI 深入核心业务"
          align="center"
          width="wide"
        />
      </div>

      <div
        ref="trackRef"
        class="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby="fde-use-cases-title"
        tabindex="0"
        @scroll="updateControls"
      >
        <NuxtLink
          v-for="(item, index) in fdeUseCases"
          :key="item.title"
          :to="item.href"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} / ${useCaseCount}`"
          :data-use-case-index="index"
          class="group relative grid min-h-[260px] basis-full shrink-0 snap-start cursor-pointer grid-rows-[auto_auto_1fr] content-start gap-4 rounded-lg border border-default bg-muted p-8 no-underline transition-all duration-500 ease-out before:absolute before:inset-0 before:rounded-lg before:bg-[image:var(--dt-gradient-hero)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:border-primary hover:before:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:basis-[calc(50%_-_0.75rem)] xl:basis-[calc(33.333%_-_1rem)]"
        >
          <ArrowUpRight
            class="absolute top-4 right-4 z-10 size-5 text-dimmed opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <component :is="item.icon" class="size-8 text-muted" aria-hidden="true" />
          <h3 class="text-lg font-semibold text-highlighted">{{ item.title }}</h3>
          <p class="text-base font-normal text-default">{{ item.description }}</p>
        </NuxtLink>
      </div>

      <div class="mt-8 flex w-full">
        <CarouselControls
          layout="split"
          previous-label="上一条应用场景"
          next-label="下一条应用场景"
          :previous-disabled="!canGoPrevious"
          :next-disabled="!canGoNext"
          @previous="previousUseCase"
          @next="nextUseCase"
        />
      </div>
    </div>
  </section>
</template>
