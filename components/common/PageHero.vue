<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import { computed, type Component, useSlots } from 'vue'

export interface PageHeroAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

withDefaults(
  defineProps<{
    badge?: string
    badgeIcon?: Component
    titleId: string
    titleLine: string
    titleGradient?: string
    description: string
    actions?: PageHeroAction[]
    visualLabel?: string
    backgroundVideoSrc?: string
    flushBottom?: boolean
    flushVisualEnd?: boolean
    visualSize?: 'default' | 'large' | 'fluid'
    align?: 'left' | 'center'
  }>(),
  {
    badge: undefined,
    badgeIcon: undefined,
    titleGradient: undefined,
    actions: () => [],
    visualLabel: undefined,
    backgroundVideoSrc: undefined,
    flushBottom: false,
    flushVisualEnd: false,
    visualSize: 'default',
    align: 'left',
  },
)

const slots = useSlots()
const hasVisual = computed(() => Boolean(slots.visual))
</script>

<template>
  <section class="page-hero relative overflow-hidden" :aria-labelledby="titleId">
    <div
      class="container page-hero__body relative isolate pt-24 lg:pt-32"
      :class="flushBottom ? 'pb-0 lg:pb-0' : 'pb-24 lg:pb-32'"
    >
      <div class="page-hero__body-bg absolute inset-0 z-0 bg-dt-bg" aria-hidden="true"></div>
      <div class="page-hero__background" aria-hidden="true">
        <video v-if="backgroundVideoSrc" class="page-hero__background-video" :src="backgroundVideoSrc" autoplay muted loop playsinline></video>
        <div class="page-hero__grid"></div>
        <div class="page-hero__glow page-hero__glow--left"></div>
        <div class="page-hero__glow page-hero__glow--right"></div>
      </div>
      <div
        class="page-hero__inner relative z-10 flex flex-col items-center"
        :class="
          align === 'center'
            ? ''
            : [
              'gap-12 lg:gap-16',
              visualSize === 'fluid'
                ? 'lg:flex-row lg:items-center lg:justify-between'
                : visualSize === 'large'
                  ? 'lg:grid lg:justify-center lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1fr)] lg:items-stretch'
                  : 'lg:grid lg:justify-center lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center',
            ]
        "
      >
        <div
          class="page-hero__content w-full text-center"
          :class="align === 'center' ? 'max-w-4xl' : 'max-w-2xl lg:self-center lg:text-left'"
        >
          <div v-if="badge" class="page-hero__badge mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <component
              :is="badgeIcon"
              v-if="badgeIcon"
              class="page-hero__badge-icon"
              :size="16"
              aria-hidden="true"
            />
            <span>{{ badge }}</span>
          </div>

          <div class="page-hero__title-block">
            <h1 :id="titleId">
              <span class="page-hero__title-line">{{ titleLine }}</span>
              <span v-if="titleGradient" class="page-hero__title-gradient">{{ titleGradient }}</span>
            </h1>
          </div>

          <div
            class="page-hero__description-block"
            :class="align === 'center' ? 'lg:flex lg:justify-center' : ''"
          >
            <p class="page-hero__description">{{ description }}</p>
          </div>

          <div
            v-if="actions.length"
            class="page-hero__actions flex flex-wrap items-center justify-center gap-4"
            :class="align === 'center' ? '' : 'lg:justify-start'"
          >
            <BaseButton
              v-for="action in actions"
              :key="action.label"
              :href="action.href"
              :variant="action.variant ?? 'primary'"
              size="lg"
            >
              {{ action.label }}
            </BaseButton>
          </div>

          <slot name="after-actions" />
        </div>

        <div
          v-if="hasVisual"
          class="page-hero__visual relative isolate flex w-full overflow-visible"
          :class="[
            align === 'center'
              ? 'justify-center'
              : [
                'justify-self-center',
                visualSize === 'large'
                  ? 'max-w-[820px] self-stretch'
                  : visualSize === 'fluid'
                    ? 'max-w-lg xl:max-w-xl 2xl:max-w-2xl self-center'
                    : 'max-w-lg self-center',
              ],
            flushVisualEnd ? 'lg:-mr-4 lg:justify-self-end' : '',
          ]"
          :aria-label="visualLabel"
        >
          <div v-if="align !== 'center'" class="page-hero__visual-glow" aria-hidden="true"></div>
          <slot name="visual" />
        </div>
        <slot name="after-content" />
      </div>
    </div>
  </section>
</template>
