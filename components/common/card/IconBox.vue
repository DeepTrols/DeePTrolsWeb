<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    icon?: Component
    size?: 40 | 48 | 56
    iconSize?: 20 | 24 | 28 | 48
    tone?: 'primary' | 'muted' | 'white' | 'gradient'
  }>(),
  {
    icon: undefined,
    size: 40,
    iconSize: 20,
    tone: 'primary',
  },
)
</script>

<template>
  <div class="icon-box dt-icon-box" :class="[`icon-box--size-${size}`, `icon-box--tone-${tone}`, { 'dt-icon-box--gradient': tone === 'gradient' }]">
    <slot>
      <component :is="icon" v-if="icon" :size="iconSize" aria-hidden="true" />
    </slot>
  </div>
</template>

<style scoped lang="scss">
.icon-box--size-40 {
  width: 40px;
  height: 40px;
}

.icon-box--size-48 {
  width: 48px;
  height: 48px;
}

.icon-box--size-56 {
  width: 56px;
  height: 56px;
}

.icon-box--tone-muted {
  --dt-icon-box-bg: var(--dt-color-bg-elevated);
  --dt-icon-box-color: var(--dt-color-text-highlighted);
  --dt-icon-box-shadow: none;
}

.icon-box--tone-white {
  --dt-icon-box-bg: #ffffff;
  --dt-icon-box-color: #151515;
  --dt-icon-box-shadow: inset 0 0 0 1px var(--dt-color-line);
}
</style>
