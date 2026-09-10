<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: 'section' | 'div'
    titleId?: string
    container?: 'default' | 'wide' | 'none'
    background?: 'default' | 'transparent' | 'muted'
  }>(),
  {
    as: 'section',
    titleId: undefined,
    container: 'default',
    background: 'default',
  },
)

const shellClasses = computed(() => [
  'section-shell relative flow-root pb-32 lg:pb-44',
  props.background === 'default' && 'bg-dt-bg',
  props.background === 'muted' && 'bg-dt-bg-soft',
  props.background === 'transparent' && 'bg-transparent',
])

const containerClasses = computed(() => [
  props.container === 'default' && 'container',
  props.container === 'wide' && 'mx-auto w-[var(--dt-container-wide)] max-w-none px-0',
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
