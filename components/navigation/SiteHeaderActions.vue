<script setup lang="ts">
defineEmits<{
  focusAction: []
}>()
</script>

<template>
  <div data-slot="right" class="site-header__actions">
    <NuxtLink class="site-header__scheme-link" to="/contact" @focus="$emit('focusAction')">
      免费获取专属方案
    </NuxtLink>
    <div class="site-header__lang-switch" aria-label="语言切换">
      <span class="site-header__lang site-header__lang--active" aria-current="true">CN</span>
      <span class="site-header__lang-divider" aria-hidden="true"></span>
      <NuxtLink class="site-header__lang site-header__lang--muted" to="/en" @focus="$emit('focusAction')">EN</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site-header__actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;
  gap: 30px;
}

.site-header__scheme-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 212px;
  height: var(--dt-header-height);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.12);
  color: inherit;
  padding: 0 14px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 200ms ease,
    color 200ms ease;

  &:hover,
  &:focus-visible {
    color: var(--dt-color-primary);
  }
}

.site-header__lang-switch {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  line-height: 1;
}

.site-header__lang {
  color: inherit;
  transition: color 200ms ease;
}

.site-header__lang--muted {
  color: var(--dt-header-muted);

  &:hover,
  &:focus-visible {
    color: var(--dt-color-primary);
  }
}

.site-header__lang-divider {
  width: 1px;
  height: 12px;
  background: currentcolor;
  opacity: 0.55;
}

@media (max-width: 1439px) {
  .site-header__actions {
    gap: 16px;
  }

  .site-header__scheme-link {
    width: 190px;
  }

  .site-header__lang-switch {
    gap: 10px;
  }
}

@media (max-width: 1260px) {
  .site-header__actions {
    display: none;
  }
}
</style>
