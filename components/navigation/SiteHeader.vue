<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navigateTo } from '#app'
import MegaMenuPanel from '~/components/navigation/MegaMenuPanel.vue'
import SiteHeaderActions from '~/components/navigation/SiteHeaderActions.vue'
import SiteHeaderDesktopNav from '~/components/navigation/SiteHeaderDesktopNav.vue'
import SiteHeaderMenuButton from '~/components/navigation/SiteHeaderMenuButton.vue'
import SiteHeaderMobileNav from '~/components/navigation/SiteHeaderMobileNav.vue'
import { primaryNavigation } from '~/data/navigation'
import type { NavItem } from '~/data/navigation'

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

          <SiteHeaderDesktopNav
            :items="primaryNavigation"
            :active-index="activeIndex"
            @enter="handleNavMouseEnter"
            @leave="handleNavMouseLeave"
            @focus-item="handleNavFocus"
            @select="handleNavClick"
          />
        </div>

        <div data-slot="center" class="site-header__center" aria-hidden="true"></div>

        <SiteHeaderActions @focus-action="closeMega" />

        <SiteHeaderMenuButton :open="isMobileOpen" @toggle="toggleMobileMenu" />
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

    <SiteHeaderMobileNav :items="primaryNavigation" :open="isMobileOpen" @close="closeMobileMenu" />
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
  height: 100%;
  gap: 12px;
  padding-inline: 1rem;
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
.mega-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.mega-enter-from,
.mega-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (min-width: 1280px) {
  .site-header__left {
    gap: 40px;
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

  .site-header__center {
    display: none;
  }

}
</style>
