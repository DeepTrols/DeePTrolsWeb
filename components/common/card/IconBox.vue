<script setup lang="ts">
import type { Component } from 'vue'

/**
 * 统一 icon 外框：圆角取自 --dt-icon-box-radius，尺寸、色调、边框与背景均可配置。
 * - tone：primary / muted / white / gradient / soft（soft 为 bg-soft 半透明底 + line 内描边）
 * - bordered：是否保留 1px 内边框（默认 true）
 * - filled：是否保留背景色（默认 true，可与 bordered 自由组合）
 */
withDefaults(
  defineProps<{
    icon?: Component
    size?: 40 | 48 | 56
    iconSize?: 20 | 24 | 28 | 48
    tone?: 'primary' | 'muted' | 'white' | 'gradient' | 'soft'
    bordered?: boolean
    filled?: boolean
  }>(),
  {
    icon: undefined,
    size: 40,
    iconSize: 20,
    tone: 'primary',
    bordered: true,
    filled: true,
  },
)
</script>

<template>
  <div
    class="icon-box dt-icon-box"
    :class="[
      `icon-box--size-${size}`,
      `icon-box--tone-${tone}`,
      {
        'dt-icon-box--gradient': tone === 'gradient',
        'icon-box--borderless': !bordered,
        'icon-box--unfilled': !filled,
      },
    ]"
  >
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

.icon-box--tone-soft {
  --dt-icon-box-bg: color-mix(in oklab, var(--dt-color-bg-soft) 50%, transparent);
  --dt-icon-box-color: var(--dt-color-text-highlighted);
  --dt-icon-box-shadow: inset 0 0 0 1px var(--dt-color-line);
}

.icon-box--borderless {
  --dt-icon-box-shadow: none;
}

.icon-box--unfilled {
  --dt-icon-box-bg: transparent;
}
</style>
