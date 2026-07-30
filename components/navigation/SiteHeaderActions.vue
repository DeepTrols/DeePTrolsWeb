<script setup lang="ts">
defineEmits<{
  focusAction: []
}>()
</script>

<template>
  <div data-slot="right" class="site-header__actions">
    <NuxtLink class="site-header__icon-button" to="https://github.com" external aria-label="GitHub" @focus="$emit('focusAction')">
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
    <NuxtLink class="site-header__icon-button" to="/en" aria-label="语言切换" @focus="$emit('focusAction')">
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
    <NuxtLink class="site-header__text-link" to="/console" @focus="$emit('focusAction')">登录OPS</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
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

@media (max-width: 980px) {
  .site-header__actions {
    display: none;
  }
}
</style>
