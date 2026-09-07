<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navigateTo, useRoute } from '#app'
import MegaMenuPanel from '~/components/navigation/MegaMenuPanel.vue'
import SiteHeaderActions from '~/components/navigation/SiteHeaderActions.vue'
import SiteHeaderDesktopNav from '~/components/navigation/SiteHeaderDesktopNav.vue'
import SiteHeaderMenuButton from '~/components/navigation/SiteHeaderMenuButton.vue'
import SiteHeaderMobileNav from '~/components/navigation/SiteHeaderMobileNav.vue'
import { primaryNavigation } from '~/data/navigation'
import type { NavItem } from '~/data/navigation'

const activeIndex = ref<number | null>(null)
const isMobileOpen = ref(false)
const isAtTop = ref(true)
const isHeaderHovering = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const route = useRoute()
const activeItem = computed(() => (activeIndex.value === null ? undefined : primaryNavigation[activeIndex.value]))
const isHomeRoute = computed(() => route.path === '/')
const shouldUseDarkLogo = computed(() => Boolean(activeItem.value) || isMobileOpen.value || !isHomeRoute.value || !isAtTop.value)
const headerLogoSrc = computed(() =>
  shouldUseDarkLogo.value ? '/images/brand/deeptrols-logo-black.png' : '/images/brand/deeptrols-logo-white.png',
)
const headerClasses = computed(() => ({
  'is-home': isHomeRoute.value,
  'is-dark-hero': isHomeRoute.value,
  'is-at-top': isAtTop.value,
  'is-scrolled': !isAtTop.value,
  'is-hovering': isHeaderHovering.value,
  'has-mega': Boolean(activeItem.value),
  'has-mobile': isMobileOpen.value,
}))

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

function handleHeaderMouseEnter() {
  isHeaderHovering.value = true
}

function handleHeaderMouseLeave() {
  isHeaderHovering.value = false
  scheduleCloseMega()
}

function updateScrollState() {
  isAtTop.value = window.scrollY <= 4
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
  updateScrollState()
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('scroll', updateScrollState)
  cancelClose()
  if (import.meta.client) {
    document.body.classList.remove('menu-open')
  }
})
</script>

<template>
  <header
    ref="headerRef"
    data-slot="root"
    class="site-header"
    :class="headerClasses"
    @mouseenter="handleHeaderMouseEnter"
    @mouseleave="handleHeaderMouseLeave"
  >
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <div class="site-header__main" @mouseenter="cancelClose" @mouseleave="scheduleCloseMega">
      <div data-slot="container" class="site-header__inner">
        <div data-slot="left" class="site-header__left">
          <NuxtLink class="site-header__brand" to="/" aria-label="DeepTrols 首页" @focus="closeMega">
            <img :src="headerLogoSrc" alt="" />
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
