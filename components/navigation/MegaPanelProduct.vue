<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import MegaPanelNavLink from '~/components/navigation/MegaPanelNavLink.vue'
import type { NavColumn, NavItem, NavLink } from '~/data/navigation'

defineProps<{
  item: NavItem
}>()

defineEmits<{
  navigate: []
}>()

function linksFor(column: NavColumn): NavLink[] {
  return column.links ?? []
}

function columnSpanClass(column: NavColumn): string {
  const span = Math.min(Math.max(linksFor(column).length, 1), 4)
  return `mega-panel__column--span-${span}`
}
</script>

<template>
  <div class="mega-panel__columns mega-panel__columns--product">
    <section
      v-for="column in item.columns"
      :key="column.title"
      class="mega-panel__column"
      :class="columnSpanClass(column)"
    >
      <NuxtLink
        v-if="column.subtitle"
        :to="column.href ?? item.href"
        class="mega-panel__category"
        @click="$emit('navigate')"
      >
        <h2>{{ column.title }} ｜ {{ column.subtitle }}</h2>
        <ArrowRight :size="14" aria-hidden="true" />
      </NuxtLink>
      <h2 v-else>{{ column.title }}</h2>

      <div class="mega-panel__link-list">
        <MegaPanelNavLink
          v-for="link in linksFor(column)"
          :key="link.label"
          :link="link"
          @navigate="$emit('navigate')"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.mega-panel__columns--product {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 26px;
}

.mega-panel__column {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  > h2 {
    margin: 0;
    color: rgba(238, 245, 251, 0.5);
    font-size: 12px;
    font-weight: 760;
    letter-spacing: 0;
    line-height: 1;
  }
}

.mega-panel__column--span-1 {
  grid-column: span 1;
}

.mega-panel__column--span-2 {
  grid-column: span 2;
}

.mega-panel__column--span-3 {
  grid-column: span 3;
}

.mega-panel__column--span-4 {
  grid-column: span 4;
}

.mega-panel__category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(238, 245, 251, 0.5);
  transition: color 180ms ease;

  h2 {
    margin: 0;
    color: inherit;
    font-size: 12px;
    font-weight: 760;
    letter-spacing: 0;
    line-height: 1;
  }

  svg {
    transition: transform 180ms ease;
  }

  &:hover {
    color: var(--dt-color-primary);

    svg {
      transform: translateX(2px);
    }
  }
}

.mega-panel__link-list {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.mega-panel__column--span-2 .mega-panel__link-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.mega-panel__column--span-4 .mega-panel__link-list {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
</style>
