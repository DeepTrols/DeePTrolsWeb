<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

defineProps<{
  open: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    class="site-header__menu-button"
    type="button"
    :aria-expanded="open"
    aria-controls="mobile-navigation"
    aria-label="打开主导航"
    @click="$emit('toggle')"
  >
    <Menu v-if="!open" :size="23" aria-hidden="true" />
    <X v-else :size="23" aria-hidden="true" />
  </button>
</template>

<style scoped lang="scss">
.site-header__menu-button {
  display: none;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--dt-radius-md);
  background: transparent;
  color: #ffffff;
  padding: 6px;
  transition:
    background-color 150ms ease,
    color 150ms ease;

  &:hover {
    background: var(--dt-color-bg-soft);
  }
}

@media (max-width: 980px) {
  .site-header__menu-button {
    display: inline-flex;
  }
}
</style>
