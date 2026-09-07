<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import type { NavColumn, NavItem, NavLink } from '~/data/navigation'

const props = defineProps<{
  item: NavItem
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()
const megaTitle = computed(() => props.item.megaTitle ?? props.item.label)
const columns = computed(() => props.item.columns ?? [])

function linksFor(column: NavColumn): NavLink[] {
  return column.links ?? []
}

function titleFor(column: NavColumn): string {
  return column.subtitle ? `${column.title} ｜ ${column.subtitle}` : column.title
}

function entriesFor(column: NavColumn): NavLink[] {
  const entries: NavLink[] = []

  if (column.href || column.description) {
    entries.push({
      label: titleFor(column),
      description: column.description,
      href: column.href ?? props.item.href,
    })
  }

  return [...entries, ...linksFor(column)]
}

function isActiveHref(href: string): boolean {
  if (href === props.item.href) {
    return route.path === href
  }

  return route.path === href || route.path.startsWith(`${href}/`)
}
</script>

<template>
  <div class="mega-shell">
    <NuxtLink :to="item.href" class="mega-title" @click="$emit('navigate')">
      <span>{{ megaTitle }}</span>
      <span class="mega-chevron" aria-hidden="true">&gt;</span>
    </NuxtLink>

    <div class="mega-cols">
      <section v-for="column in columns" :key="column.title" class="mega-col">
        <NuxtLink
          v-for="entry in entriesFor(column)"
          :key="entry.label"
          :to="entry.href"
          class="mega-entry"
          :class="{ 'is-active': isActiveHref(entry.href) }"
          @click="$emit('navigate')"
        >
          <span class="mega-entry-title">
            <span>{{ entry.label }}</span>
            <span class="mega-chevron" aria-hidden="true">&gt;</span>
          </span>
          <span v-if="entry.description" class="mega-entry-desc">{{ entry.description }}</span>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mega-shell {
  display: flex;
  align-items: flex-start;
  padding-left: var(--nav-x);
}

.mega-title {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  width: 204px;
  gap: 24px;
  color: #000000;
  font-size: 24px;
  font-weight: 400;
  line-height: 35px;
  text-decoration: none;
  white-space: nowrap;
  transition: color 200ms ease;

  &:hover,
  &:focus-visible {
    color: var(--dt-color-primary);
  }
}

.mega-chevron {
  flex: 0 0 auto;
  font-size: 18px;
  line-height: 1;
}

.mega-cols {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
}

.mega-col {
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 428px;
  padding-left: 72px;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    bottom: -8px;
    left: 0;
    width: 1px;
    background: linear-gradient(180deg, #ffffff, #d8dee5 50%, #ffffff);
  }
}

.mega-entry {
  display: block;
  height: 61px;
  margin-bottom: 30px;
  color: #000000;
  text-decoration: none;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &:focus-visible,
  &.is-active {
    .mega-entry-title {
      color: #1e44e0;
    }
  }
}

.mega-entry-title {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  color: #000000;
  font-size: 24px;
  font-weight: 400;
  line-height: 35px;
  white-space: nowrap;
  transition: color 200ms ease;
}

.mega-entry-desc {
  display: block;
  margin-top: 10px;
  color: #555555;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
}

@media (max-width: 1439px) {
  .mega-col {
    width: 360px;
    padding-left: 52px;
  }
}

@media (max-width: 1260px) {
  .mega-shell {
    display: none;
  }
}
</style>
