<script setup lang="ts">
import type { NavLink } from '~/data/navigation'

defineProps<{
  link: NavLink
}>()

defineEmits<{
  navigate: []
}>()
</script>

<template>
  <NuxtLink
    :to="link.href"
    class="mega-panel__link"
    :class="{ 'mega-panel__link--plain': !link.icon }"
    @click="$emit('navigate')"
  >
    <span v-if="link.hot" class="mega-panel__hot">hot</span>
    <component v-if="link.icon" :is="link.icon" :size="22" aria-hidden="true" />
    <span>
      <strong>{{ link.label }}</strong>
      <small v-if="link.description">{{ link.description }}</small>
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.mega-panel__link {
  position: relative;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  min-height: 58px;
  border-radius: var(--dt-radius-sm);
  padding: 10px 8px;
  color: var(--dt-color-text);
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  svg {
    color: var(--dt-color-secondary);
    margin-top: 2px;
  }

  &:hover {
    background: var(--dt-color-bg-soft);
    transform: translateX(2px);
  }
}

.mega-panel__link--plain {
  grid-template-columns: 1fr;
  min-height: 30px;
  padding: 5px 0;

  &:hover {
    background: transparent;
    color: var(--dt-color-primary);
  }
}

.mega-panel__hot {
  position: absolute;
  top: 6px;
  right: 6px;
  border: 1px solid rgba(26, 87, 235, 0.22);
  border-radius: 999px;
  background: rgba(26, 87, 235, 0.08);
  color: var(--dt-color-primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1.5;
  padding: 1px 7px;
  pointer-events: none;
}

.mega-panel__link strong {
  display: block;
  color: var(--dt-color-text-highlighted);
  font-size: 14px;
  font-weight: 650;
  line-height: 1.35;
}

.mega-panel__link small {
  display: block;
  margin-top: 5px;
  color: var(--dt-color-text-muted);
  font-size: 12px;
  line-height: 1.45;
}
</style>
