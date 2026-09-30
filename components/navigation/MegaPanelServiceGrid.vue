<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import { resolveNavIcon } from '~/components/navigation/nav-icons'
import type { NavItem } from '~/data/navigation'

const props = defineProps<{
  item: NavItem
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()
const megaTitle = computed(() => props.item.megaTitle ?? props.item.label)
const serviceLinks = computed(() => props.item.columns?.flatMap((column) => column.links ?? []) ?? [])

function isActiveHref(href: string, activePaths: string[] = []): boolean {
  return [href, ...activePaths].some((activePath) => {
    if (activePath === props.item.href) {
      return route.path === activePath
    }
    return route.path === activePath || route.path.startsWith(`${activePath}/`)
  })
}
</script>

<template>
  <div class="mega-shell">
    <!-- 服务无 index 页：mega 标题仅作分组标题，不渲染链接（同核心产品/解决方案） -->
    <div class="mega-title">
      <span>{{ megaTitle }}</span>
    </div>

    <div class="mega-services" aria-label="服务">
      <NuxtLink
        v-for="link in serviceLinks"
        :key="link.label"
        :to="link.href"
        class="mega-service-entry"
        :class="{ 'is-active': isActiveHref(link.href, link.activePaths) }"
        @click="$emit('navigate')"
      >
        <span class="mega-service-icon dt-icon-box" aria-hidden="true">
          <component :is="resolveNavIcon(link.icon)" v-if="link.icon" :size="20" />
        </span>
        <span class="mega-service-text">
          <span class="mega-service-title">{{ link.label }}</span>
          <span v-if="link.description" class="mega-service-desc">{{ link.description }}</span>
        </span>
      </NuxtLink>
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
  white-space: nowrap;
}

.mega-services {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  flex: 1 1 auto;
  min-width: 0;
  column-gap: 56px;
  row-gap: 24px;
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

.mega-service-entry {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #000000;
  text-decoration: none;

  &:hover,
  &:focus-visible,
  &.is-active {
    .mega-service-title {
      color: #1e44e0;
    }
  }
}

.mega-service-icon {
  flex: 0 0 auto;
  margin-top: 2px;
}

.mega-service-text {
  display: block;
  min-width: 0;
}

.mega-service-title {
  display: block;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  transition: color 200ms ease;
}

.mega-service-desc {
  display: block;
  margin-top: 6px;
  color: #555555;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}

@media (max-width: 1439px) {
  .mega-services {
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
