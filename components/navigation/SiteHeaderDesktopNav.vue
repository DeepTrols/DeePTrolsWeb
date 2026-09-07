<script setup lang="ts">
import type { NavItem } from '~/data/navigation'

defineProps<{
  items: NavItem[]
  activeIndex: number | null
}>()

defineEmits<{
  enter: [item: NavItem, index: number]
  leave: [item: NavItem]
  focusItem: [item: NavItem, index: number]
  select: [item: NavItem, index: number]
}>()

function hasMega(item: NavItem) {
  return Boolean(item.columns?.length || item.features?.length)
}
</script>

<template>
  <nav class="site-header__nav" aria-label="主导航">
    <div style="position:relative;">
      <ul class="site-header__nav-list">
        <li v-for="(item, index) in items" :key="item.label" class="site-header__nav-item">
          <button
            class="site-header__nav-button"
            :class="{ 'direct-link': !hasMega(item) }"
            type="button"
            :data-state="activeIndex === index ? 'open' : 'closed'"
            :aria-expanded="hasMega(item) ? activeIndex === index : undefined"
            :aria-controls="hasMega(item) ? `mega-menu-${index}` : undefined"
            @mouseenter="$emit('enter', item, index)"
            @mouseleave="$emit('leave', item)"
            @focus="$emit('focusItem', item, index)"
            @click="$emit('select', item, index)"
          >
            <span>{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.site-header__nav {
  display: flex;
  align-items: center;
  margin-left: 0;
  min-width: 0;
}

.site-header__nav-list {
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  isolation: isolate;
}

.site-header__nav-item {
  min-width: 0;
  padding: 0;
}

.site-header__nav-button {
  position: relative;
  display: flex;
  align-items: center;
  isolation: isolate;
  width: 121px;
  height: 37px;
  gap: 6px;
  border: 0;
  background: transparent;
  color: inherit;
  outline: none;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  cursor: pointer;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    inset: 0 1px;
    z-index: -1;
    border-radius: var(--dt-ui-radius);
    background: transparent;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover,
  &:focus-visible,
  &[data-state="open"] {
    color: var(--dt-color-primary);
  }

  &.direct-link:hover {
    color: var(--dt-color-primary);
  }

  &:hover::before {
    background: transparent;
  }

  &:focus-visible::before {
    box-shadow: inset 0 0 0 2px var(--dt-color-primary);
  }

  &[data-state="open"]::before {
    background: transparent;
  }
}

@media (min-width: 1280px) {
  .site-header__nav-button {
    width: 121px;
  }
}

@media (min-width: 1440px) {
  .site-header__nav-button {
    width: 121px;
  }
}

@media (max-width: 1439px) {
  .site-header__nav-button {
    width: 104px;
  }
}

@media (max-width: 1260px) {
  .site-header__nav {
    display: none;
  }
}
</style>
