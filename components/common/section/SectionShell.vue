<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: 'section' | 'div'
    titleId?: string
    container?: 'default' | 'wide' | 'none'
    spacing?: 'default' | 'compact' | 'flush'
    background?: 'default' | 'transparent' | 'muted'
  }>(),
  {
    as: 'section',
    titleId: undefined,
    container: 'default',
    spacing: 'default',
    background: 'default',
  },
)

const shellClasses = computed(() => [
  'section-shell relative',
  props.spacing === 'default' && 'pb-32 lg:pb-44',
  props.spacing === 'compact' && 'pb-24 lg:pb-32',
  props.spacing === 'flush' && 'pb-0',
  props.background === 'default' && 'bg-dt-bg',
  props.background === 'muted' && 'bg-dt-bg-soft',
  props.background === 'transparent' && 'bg-transparent',
])

const containerClasses = computed(() => [
  props.container === 'default' && 'container',
  props.container === 'wide' && 'mx-auto w-full max-w-[96rem] px-4',
])
</script>

<template>
  <component :is="as" :class="shellClasses" :aria-labelledby="titleId">
    <slot v-if="container === 'none'" />
    <div v-else :class="containerClasses">
      <slot />
    </div>
  </component>
</template>
