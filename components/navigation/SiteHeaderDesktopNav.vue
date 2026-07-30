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
  justify-content: space-between;
  flex: 0 1 auto;
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
  padding: 8px 0;
}

.site-header__nav-button {
  position: relative;
  display: flex;
  align-items: center;
  isolation: isolate;
  width: auto;
  gap: 6px;
  border: 0;
  background: transparent;
  color: var(--dt-color-nav-text);
  outline: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
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
    color: var(--dt-color-text-highlighted);
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
    background: rgba(39, 30, 53, 0.5);
  }
}

@supports (background-color: color-mix(in oklab, #271e35 50%, transparent)) {
  .site-header__nav-button[data-state="open"]::before {
    background: color-mix(in oklab, var(--dt-color-bg-elevated) 50%, transparent);
  }
}

@media (max-width: 1120px) {
  .site-header__nav-button {
    padding-inline: 12px;
  }
}

@media (min-width: 1280px) {
  .site-header__nav-button {
    padding-inline: 16px;
  }
}

@media (max-width: 980px) {
  .site-header__nav {
    display: none;
  }
}
</style>
