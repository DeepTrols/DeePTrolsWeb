<script setup lang="ts">
withDefaults(
  defineProps<{
    activeIndex: number
    itemCount: number
    label?: string
    labelledBy?: string
    transition?: 'default' | 'slow' | 'none'
  }>(),
  {
    label: undefined,
    labelledBy: undefined,
    transition: 'default',
  },
)
</script>

<template>
  <div
    class="carousel-root"
    role="region"
    aria-roledescription="carousel"
    data-orientation="horizontal"
    data-slot="root"
    tabindex="0"
    :aria-label="label"
    :aria-labelledby="labelledBy"
  >
    <div class="carousel-root__viewport" data-slot="viewport">
      <div
        class="carousel-root__container"
        :class="`carousel-root__container--${transition}`"
        data-slot="container"
        :data-active-slide="activeIndex"
        :data-item-count="itemCount"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-root {
  position: relative;
  overflow: hidden;

  &:focus {
    outline: none;
  }
}

.carousel-root__viewport {
  overflow: hidden;
}

.carousel-root__container {
  display: flex;
  flex-direction: row;
  align-items: var(--dt-carousel-align, stretch);
  margin-inline-start: var(--dt-carousel-gutter, 0px);
}

.carousel-root__container[data-active-slide="0"] {
  transform: translate3d(0, 0, 0);
}

.carousel-root__container[data-active-slide="1"] {
  transform: translate3d(-100%, 0, 0);
}

.carousel-root__container[data-active-slide="2"] {
  transform: translate3d(-200%, 0, 0);
}

.carousel-root__container[data-active-slide="3"] {
  transform: translate3d(-300%, 0, 0);
}

.carousel-root__container[data-active-slide="4"] {
  transform: translate3d(-400%, 0, 0);
}

.carousel-root__container[data-active-slide="5"] {
  transform: translate3d(-500%, 0, 0);
}

.carousel-root__container[data-active-slide="6"] {
  transform: translate3d(-600%, 0, 0);
}

.carousel-root__container[data-active-slide="7"] {
  transform: translate3d(-700%, 0, 0);
}

.carousel-root__container[data-active-slide="8"] {
  transform: translate3d(-800%, 0, 0);
}

.carousel-root__container[data-active-slide="9"] {
  transform: translate3d(-900%, 0, 0);
}

.carousel-root__container--default {
  transition: transform 300ms ease;
}

.carousel-root__container--slow {
  transition: transform 450ms cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-root__container--none {
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .carousel-root__container {
    transition: none;
  }
}
</style>
