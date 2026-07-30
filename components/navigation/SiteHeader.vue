<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navigateTo } from '#app'
import { Menu, X } from '@lucide/vue'
import MegaMenuPanel from '~/components/navigation/MegaMenuPanel.vue'
import { primaryNavigation } from '~/data/navigation'
import type { NavColumn, NavItem } from '~/data/navigation'

const activeIndex = ref<number | null>(null)
const isMobileOpen = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const activeItem = computed(() => (activeIndex.value === null ? undefined : primaryNavigation[activeIndex.value]))

function hasMega(item: NavItem) {
  return Boolean(item.columns?.length || item.features?.length)
}

function cancelClose() {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

function openMega(index: number) {
  cancelClose()
  const item = primaryNavigation[index]
  activeIndex.value = item && hasMega(item) ? index : null
}

function closeMega() {
  cancelClose()
  activeIndex.value = null
}

function scheduleCloseMega() {
  cancelClose()
  closeTimer.value = setTimeout(() => {
    activeIndex.value = null
    closeTimer.value = null
  }, 120)
}

function handleNavMouseEnter(item: NavItem, index: number) {
  if (hasMega(item)) {
    openMega(index)
    return
  }

  closeMega()
}

function handleNavMouseLeave(item: NavItem) {
  if (hasMega(item)) {
    scheduleCloseMega()
  }
}

async function handleNavClick(item: NavItem, index: number) {
  if (hasMega(item)) {
    openMega(index)
    return
  }

  closeMega()
  await navigateTo(item.href)
}

function handleNavFocus(item: NavItem, index: number) {
  if (hasMega(item)) {
    openMega(index)
    return
  }

  closeMega()
}

function toggleMobileMenu() {
  isMobileOpen.value = !isMobileOpen.value
  closeMega()
}

function closeMobileMenu() {
  isMobileOpen.value = false
}

function flattenColumnLinks(columns: NavColumn[] = []) {
  return columns.flatMap((column) => [
    ...(column.links ?? []),
    ...(column.groups?.flatMap((group) => group.links ?? []) ?? []),
  ])
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMega()
    closeMobileMenu()
  }
}

function handlePointerDown(event: PointerEvent) {
  if (!activeItem.value) {
    return
  }

  const target = event.target
  if (target instanceof Node && headerRef.value?.contains(target)) {
    return
  }

  closeMega()
}

watch(isMobileOpen, (value) => {
  if (import.meta.client) {
    document.body.classList.toggle('menu-open', value)
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('pointerdown', handlePointerDown)
  cancelClose()
  if (import.meta.client) {
    document.body.classList.remove('menu-open')
  }
})
</script>

<template>
  <header ref="headerRef" data-slot="root" class="site-header">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="site-header__main" @mouseenter="cancelClose" @mouseleave="scheduleCloseMega">
      <div data-slot="container" class="container site-header__inner">
        <div data-slot="left" class="site-header__left">
          <NuxtLink class="site-header__brand" to="/" aria-label="DeepTrols 首页" @focus="closeMega">
            <img src="/logo-while.svg" alt="" />
          </NuxtLink>

          <nav class="site-header__nav" aria-label="主导航">
            <div style="position:relative;">
              <ul class="site-header__nav-list">
                <li v-for="(item, index) in primaryNavigation" :key="item.label" class="site-header__nav-item">
                  <button
                    class="site-header__nav-button"
                    :class="{ 'direct-link': !hasMega(item) }"
                    type="button"
                    :data-state="activeIndex === index ? 'open' : 'closed'"
                    :aria-expanded="hasMega(item) ? activeIndex === index : undefined"
                    :aria-controls="hasMega(item) ? `mega-menu-${index}` : undefined"
                    @mouseenter="handleNavMouseEnter(item, index)"
                    @mouseleave="handleNavMouseLeave(item)"
                    @focus="handleNavFocus(item, index)"
                    @click="handleNavClick(item, index)"
                  >
                    <span>{{ item.label }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div data-slot="center" class="site-header__center" aria-hidden="true"></div>

        <div data-slot="right" class="site-header__actions">
          <NuxtLink class="site-header__icon-button" to="https://github.com" external aria-label="GitHub" @focus="closeMega">
            <svg
              class="site-header__github-icon size-5"
              viewBox="0 0 16 16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.6 7.6 0 0 1 8 3.86a7.6 7.6 0 0 1 1.98.27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
              />
            </svg>
          </NuxtLink>
          <NuxtLink class="site-header__icon-button" to="/en" aria-label="语言切换" @focus="closeMega">
            <svg
              class="site-header__language-icon size-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" />
              </g>
            </svg>
          </NuxtLink>
          <NuxtLink class="site-header__text-link" to="/console" @focus="closeMega">登录OPS</NuxtLink>
        </div>

        <button
          class="site-header__menu-button"
          type="button"
          :aria-expanded="isMobileOpen"
          aria-controls="mobile-navigation"
          aria-label="打开主导航"
          @click="toggleMobileMenu"
        >
          <Menu v-if="!isMobileOpen" :size="23" aria-hidden="true" />
          <X v-else :size="23" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="mega">
      <div
        v-if="activeItem"
        :id="`mega-menu-${activeIndex}`"
        class="mega-menu"
        @mouseenter="cancelClose"
        @mouseleave="scheduleCloseMega"
      >
        <MegaMenuPanel :item="activeItem" @navigate="closeMega" />
      </div>
    </Transition>

    <Transition name="mobile-nav">
      <div v-if="isMobileOpen" id="mobile-navigation" class="mobile-nav">
        <nav class="mobile-nav__panel" aria-label="移动端主导航">
          <NuxtLink class="mobile-nav__top-link" to="/" @click="closeMobileMenu">首页</NuxtLink>
          <section v-for="item in primaryNavigation" :key="item.label" class="mobile-nav__section">
            <NuxtLink :to="item.href" class="mobile-nav__section-title" @click="closeMobileMenu">
              {{ item.label }}
            </NuxtLink>
            <div v-if="item.columns?.length" class="mobile-nav__links">
              <NuxtLink
                v-for="link in flattenColumnLinks(item.columns).slice(0, 10)"
                :key="`${item.label}-${link.label}`"
                :to="link.href"
                @click="closeMobileMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
            <div v-else-if="item.features?.length" class="mobile-nav__links">
              <NuxtLink
                v-for="feature in item.features"
                :key="`${item.label}-${feature.title}`"
                :to="feature.href"
                @click="closeMobileMenu"
              >
                {{ feature.title }}
              </NuxtLink>
            </div>
          </section>
          <div class="mobile-nav__actions">
            <NuxtLink to="/console" class="mobile-nav__console-link" @click="closeMobileMenu">登录OPS</NuxtLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--dt-header-height);
  margin-bottom: calc(var(--dt-header-height) * -1);
  border-bottom: 1px solid #262626;
  background: rgba(21, 21, 21, 0.95);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

@supports (background-color: color-mix(in oklab, #151515 95%, transparent)) {
  .site-header {
    background: color-mix(in oklab, var(--dt-color-bg) 95%, transparent);
  }
}

.skip-link {
  position: absolute;
  left: 12px;
  top: -48px;
  z-index: 80;
  border-radius: var(--dt-radius-sm);
  background: var(--dt-color-primary);
  color: #ffffff;
  padding: 10px 14px;
  font-weight: 700;

  &:focus {
    top: 12px;
  }
}

.site-header__main {
  height: 100%;
}

.site-header__inner.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-inline: 1rem;
  height: 100%;
  gap: 12px;
}

.site-header__left {
  display: flex;
  align-items: center;
  flex: 1 1 0;
  gap: 16px;
  min-width: 0;
}

.site-header__center {
  display: none;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  width: 200px;

  img {
    width: 100%;
    height: auto;
    opacity: 1;
  }
}

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

.site-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 0;
  gap: 6px;
  min-width: 0;
}

.site-header__icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--dt-radius-md);
  background: transparent;
  color: var(--dt-color-nav-text);
  padding: 12px 10px;
  font-size: 14px;
  transition:
    background-color 180ms ease,
    color 180ms ease;

  &:hover {
    background: transparent;
    color: var(--dt-color-primary);
  }
}

.site-header__github-icon,
.site-header__language-icon {
  flex: 0 0 auto;
}

.site-header__text-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  border-radius: var(--dt-ui-radius);
  color: var(--dt-color-nav-text);
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    color: var(--dt-color-primary);
  }
}

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

.mega-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--dt-header-height);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(21, 21, 21, 0.98);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.45);
}

.mega-enter-active,
.mega-leave-active,
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.mega-enter-from,
.mega-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

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

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1120px) {
  .site-header__nav-button {
    padding-inline: 12px;
  }
}

@media (min-width: 1280px) {
  .site-header__left {
    gap: 40px;
  }

  .site-header__nav-button {
    padding-inline: 16px;
  }
}

@media (max-width: 980px) {
  .site-header__inner {
    display: flex;
    justify-content: space-between;
  }

  .site-header__left {
    flex: 0 1 auto;
  }

  .site-header__nav,
  .site-header__center,
  .site-header__actions {
    display: none;
  }

  .site-header__menu-button {
    display: inline-flex;
  }
}

@media (max-width: 560px) {
  .mobile-nav__links {
    grid-template-columns: 1fr;
  }
}
</style>
