<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    showIcon?: boolean
  }>(),
  {
    href: undefined,
    variant: 'primary',
    size: 'md',
    showIcon: true,
  },
)

const buttonClasses = computed(() => [
  'base-button',
  'dt-button',
  `dt-button--${props.variant}`,
  `dt-button--${props.size}`,
])
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    data-slot="base"
    :class="buttonClasses"
  >
    <span data-slot="label" class="dt-button__label"><slot /></span>
    <ArrowRight
      v-if="showIcon"
      class="dt-button__trailing-icon"
      :size="16"
      aria-hidden="true"
      data-slot="trailingIcon"
    />
  </NuxtLink>
  <button
    v-else
    data-slot="base"
    :class="buttonClasses"
    type="button"
  >
    <span data-slot="label" class="dt-button__label"><slot /></span>
    <ArrowRight
      v-if="showIcon"
      class="dt-button__trailing-icon"
      :size="16"
      aria-hidden="true"
      data-slot="trailingIcon"
    />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  text-decoration: none;
}
</style>
