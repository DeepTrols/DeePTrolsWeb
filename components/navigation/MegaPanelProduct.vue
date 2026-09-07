<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from '#app'
import type { NavItem, NavLink } from '~/data/navigation'

const props = defineProps<{
  item: NavItem
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()
const megaTitle = computed(() => props.item.megaTitle ?? props.item.label)
const columns = computed(() => props.item.columns ?? [])
const solutionLinks = computed(() => columns.value.flatMap((column) => column.links ?? []))
const activeColumn = ref(initialActiveColumn())
const activeLinks = computed<NavLink[]>(() => columns.value[activeColumn.value]?.links ?? [])

function isActiveHref(href: string): boolean {
  if (href === props.item.href) {
    return route.path === href
  }

  return route.path === href || route.path.startsWith(`${href}/`)
}

function initialActiveColumn(): number {
  const index = columns.value.findIndex(
    (column) =>
      (column.href !== undefined && isActiveHref(column.href)) ||
      (column.links ?? []).some((link) => isActiveHref(link.href)),
  )

  return index >= 0 ? index : 0
}
</script>

<template>
  <div class="mega-shell">
    <NuxtLink :to="item.href" class="mega-title" @click="$emit('navigate')">
      <span>{{ megaTitle }}</span>
      <span class="mega-chevron" aria-hidden="true">&gt;</span>
    </NuxtLink>

    <div v-if="item.layout === 'solutions'" class="mega-solutions" aria-label="解决方案">
      <NuxtLink
        v-for="link in solutionLinks"
        :key="link.label"
        :to="link.href"
        class="mega-solution-entry"
        :class="{ 'is-active': isActiveHref(link.href) }"
        @click="$emit('navigate')"
      >
        <span class="mega-solution-title">
          <span>{{ link.label }}</span>
          <span v-if="link.hot" class="mega-hot-tag" aria-label="热门">hot</span>
        </span>
        <span v-if="link.description" class="mega-solution-desc">{{ link.description }}</span>
      </NuxtLink>
    </div>

    <div v-else class="mega-cols">
      <section class="mega-col mega-col--categories">
        <NuxtLink
          v-for="(column, index) in columns"
          :key="column.title"
          :to="column.href ?? item.href"
          class="mega-entry"
          :class="{ 'is-active': index === activeColumn }"
          @mouseenter="activeColumn = index"
          @focus="activeColumn = index"
          @click="$emit('navigate')"
        >
          <span class="mega-entry-title">
            <span>{{ column.title }}</span>
            <span class="mega-chevron" aria-hidden="true">&gt;</span>
          </span>
          <span v-if="column.description" class="mega-entry-desc">{{ column.description }}</span>
        </NuxtLink>
      </section>
      <section class="mega-col mega-col--links">
        <NuxtLink
          v-for="link in activeLinks"
          :key="link.label"
          :to="link.href"
          class="mega-entry"
          :class="{ 'is-active': isActiveHref(link.href) }"
          @click="$emit('navigate')"
        >
          <span class="mega-entry-title">
            <span>{{ link.label }}</span>
            <span class="mega-chevron" aria-hidden="true">&gt;</span>
          </span>
          <span v-if="link.description" class="mega-entry-desc">{{ link.description }}</span>
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

.mega-solutions {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  flex: 1 1 auto;
  min-width: 0;
  column-gap: 56px;
  row-gap: 30px;
  padding-right: 61px;
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

.mega-solution-entry {
  position: relative;
  display: block;
  min-height: 61px;
  color: #000000;
  text-decoration: none;

  &:hover,
  &:focus-visible,
  &.is-active {
    .mega-solution-title {
      color: #1e44e0;
    }
  }
}

.mega-solution-title {
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
  color: #000000;
  font-size: 24px;
  font-weight: 400;
  line-height: 35px;
  transition: color 200ms ease;
}

.mega-solution-desc {
  display: block;
  margin-top: 10px;
  color: #555555;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}

.mega-hot-tag {
  position: relative;
  top: -4px;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 18px;
  border-radius: 999px;
  background: #ff4d2e;
  color: #ffffff;
  padding-inline: 7px;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;
}

@media (max-width: 1439px) {
  .mega-col {
    width: 360px;
    padding-left: 52px;
  }

  .mega-solutions {
    column-gap: 34px;
    padding-right: 24px;
    padding-left: 52px;
  }
}

@media (max-width: 1260px) {
  .mega-shell {
    display: none;
  }
}
</style>
