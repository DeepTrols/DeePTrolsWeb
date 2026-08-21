<script setup lang="ts">
import HeroVisualPanel from '~/components/common/hero-visual/HeroVisualPanel.vue'

withDefaults(
  defineProps<{
    panelClass?: string
    glowClass?: string
    glow?: boolean
  }>(),
  {
    panelClass: undefined,
    glowClass: 'pointer-events-none absolute -inset-4 rounded-[48px] bg-gradient-to-br from-primary/20 via-transparent to-primary/15 blur-2xl',
    glow: false,
  },
)
</script>

<template>
  <div class="hero-visual-shell relative w-full">
    <div v-if="glow" :class="glowClass" aria-hidden="true"></div>
    <HeroVisualPanel :panel-class="panelClass">
      <slot />
    </HeroVisualPanel>
  </div>
</template>
