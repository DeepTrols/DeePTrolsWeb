<script setup lang="ts">
import type { NavFeature } from '~/data/navigation'

defineProps<{
  features?: NavFeature[]
}>()

defineEmits<{
  navigate: []
}>()
</script>

<template>
  <div class="mega-panel__services">
    <NuxtLink
      v-for="feature in features"
      :key="feature.title"
      :to="feature.href"
      class="mega-panel__service"
      @click="$emit('navigate')"
    >
      <component :is="feature.icon" :size="21" aria-hidden="true" />
      <span>
        <strong>{{ feature.title }}</strong>
        <small>{{ feature.description }}</small>
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.mega-panel__services {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 24px;
  width: min(100%, 760px);
  padding: 8px 0;
}

.mega-panel__service {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 14px;
  min-height: 92px;
  border-radius: var(--dt-radius-sm);
  color: var(--dt-color-text);
  padding: 16px;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  svg {
    color: var(--dt-color-secondary);
  }

  strong {
    display: block;
    color: #ffffff;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
  }

  small {
    display: block;
    margin-top: 5px;
    color: var(--dt-color-text-muted);
    font-size: 12px;
    line-height: 1.45;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.055);
    transform: translateY(-2px);
  }
}
</style>
