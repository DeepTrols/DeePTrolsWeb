<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: 'article' | 'div' | 'li'
    href?: string
    variant?: 'default' | 'feature' | 'soft' | 'product' | 'ecosystem' | 'media'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    interactive?: boolean | 'auto'
    accent?: boolean
    equalHeight?: boolean
  }>(),
  {
    as: 'article',
    href: undefined,
    variant: 'default',
    padding: 'md',
    interactive: 'auto',
    accent: false,
    equalHeight: false,
  },
)

const isLink = computed(() => Boolean(props.href))
const isInteractive = computed(() => props.interactive === true || (props.interactive === 'auto' && isLink.value))
const cardClasses = computed(() => [
  'base-card',
  props.variant === 'product' ? 'dt-product-card' : props.variant === 'ecosystem' ? 'dt-ecosystem-card' : 'dt-card',
  props.variant === 'feature' && 'dt-card--feature',
  props.variant === 'soft' && 'dt-card--soft',
  props.equalHeight && 'dt-card--adaptive',
  isInteractive.value && 'base-card--interactive',
  `base-card--padding-${props.padding}`,
])
const accentClass = computed(() => (props.variant === 'product' ? 'dt-product-card__accent' : 'dt-card__accent'))
</script>

<template>
  <NuxtLink v-if="href" :to="href" :class="cardClasses">
    <div v-if="accent" :class="accentClass" aria-hidden="true"></div>
    <slot />
  </NuxtLink>
  <component :is="as" v-else :class="cardClasses">
    <div v-if="accent" :class="accentClass" aria-hidden="true"></div>
    <slot />
  </component>
</template>

<style scoped lang="scss">
.base-card {
  text-decoration: none;
}

.base-card--padding-none {
  padding: 0;
}

.base-card--padding-sm {
  padding: 20px;
}

.base-card--padding-md {
  padding: 24px;
}

.base-card--padding-lg {
  padding: 28px;
}

.base-card--interactive {
  cursor: pointer;
}

@media (min-width: 1024px) {
  .base-card--padding-lg {
    padding: 32px;
  }
}
</style>
