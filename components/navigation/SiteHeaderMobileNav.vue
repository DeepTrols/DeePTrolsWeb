<script setup lang="ts">
import type { NavColumn, NavItem } from '~/data/navigation'

defineProps<{
  items: NavItem[]
  open: boolean
}>()

defineEmits<{
  close: []
}>()

function flattenColumnLinks(columns: NavColumn[] = []) {
  return columns.flatMap((column) => [
    ...(column.links ?? []),
    ...(column.groups?.flatMap((group) => group.links ?? []) ?? []),
  ])
}
</script>

<template>
  <Transition name="mobile-nav">
    <div v-if="open" id="mobile-navigation" class="mobile-nav">
      <nav class="mobile-nav__panel" aria-label="移动端主导航">
        <NuxtLink class="mobile-nav__top-link" to="/" @click="$emit('close')">首页</NuxtLink>
        <section v-for="item in items" :key="item.label" class="mobile-nav__section">
          <NuxtLink :to="item.href" class="mobile-nav__section-title" @click="$emit('close')">
            {{ item.label }}
          </NuxtLink>
          <div v-if="item.columns?.length" class="mobile-nav__links">
            <NuxtLink
              v-for="link in flattenColumnLinks(item.columns).slice(0, 10)"
              :key="`${item.label}-${link.label}`"
              :to="link.href"
              @click="$emit('close')"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          <div v-else-if="item.features?.length" class="mobile-nav__links">
            <NuxtLink
              v-for="feature in item.features"
              :key="`${item.label}-${feature.title}`"
              :to="feature.href"
              @click="$emit('close')"
            >
              {{ feature.title }}
            </NuxtLink>
          </div>
        </section>
        <div class="mobile-nav__actions">
          <NuxtLink to="/console" class="mobile-nav__console-link" @click="$emit('close')">登录OPS</NuxtLink>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-nav {
  position: fixed;
  top: var(--dt-header-height);
  right: 0;
  left: 0;
  height: calc(100dvh - var(--dt-header-height));
  z-index: 45;
  background: rgba(11, 13, 30, 0.72);
  backdrop-filter: blur(12px);
}

.mobile-nav__panel {
  display: grid;
  gap: 18px;
  width: min(calc(100% - 28px), 560px);
  max-height: calc(100dvh - var(--dt-header-height) - 24px);
  margin: 12px auto;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-bg);
  padding: 22px;
}

.mobile-nav__top-link,
.mobile-nav__section-title {
  display: inline-flex;
  color: #ffffff;
  font-weight: 700;
}

.mobile-nav__section {
  display: grid;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-nav__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  a {
    border-radius: var(--dt-radius-sm);
    background: rgba(255, 255, 255, 0.05);
    color: var(--dt-color-text-muted);
    padding: 10px 12px;
    font-size: 13px;
  }
}

.mobile-nav__actions {
  display: grid;
  gap: 12px;
}

.mobile-nav__console-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--dt-radius-md);
  background: rgba(255, 255, 255, 0.04);
  color: var(--dt-color-text);
  font-weight: 500;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 560px) {
  .mobile-nav__links {
    grid-template-columns: 1fr;
  }
}
</style>
