<template>
  <div class="site-footer__subscribe">
    <div class="site-footer__subscribe-title">
      <h3>订阅 DeepTrols 最新资讯</h3>
    </div>
    <form class="site-footer__subscribe-form" aria-label="订阅 DeepTrols 最新资讯" @submit.prevent>
      <div class="site-footer__input" data-slot="root">
        <input
          id="footer-email"
          type="email"
          name="email"
          placeholder="邮箱"
          required
          autocomplete="off"
          data-slot="base"
        />
      </div>
      <button type="submit" data-slot="base" class="site-footer__subscribe-button dt-button dt-button--primary dt-button--lg">
        <span data-slot="label" class="truncate">订阅</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--lucide shrink-0 size-4"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          data-slot="trailingIcon"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7-7l7 7l-7 7"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.site-footer__subscribe {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;

  h3 {
    margin: 0;
    color: var(--dt-color-text-highlighted);
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
}

.site-footer__subscribe-title {
  width: 100%;
}

.site-footer__subscribe-form {
  display: flex;
  width: 100%;
  max-width: 640px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.site-footer__input {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 250px;
  flex-grow: 1;
  align-items: center;

  input {
    width: 100%;
    height: 48px;
    appearance: none;
    border: 0;
    border-radius: 6px;
    background: var(--dt-color-bg);
    box-shadow: inset 0 0 0 1px var(--dt-color-line-strong);
    color: var(--dt-color-text-highlighted);
    font-size: 16px;
    line-height: 24px;
    outline: none;
    padding: 8px 12px;
    transition:
      background 180ms ease,
      box-shadow 180ms ease;

    &::placeholder {
      color: var(--dt-color-text-dimmed);
    }

    &:focus-visible {
      box-shadow:
        inset 0 0 0 1px var(--dt-color-primary),
        0 0 0 2px var(--dt-color-primary);
    }
  }
}

.site-footer__subscribe-button {
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .site-footer__subscribe {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .site-footer__subscribe-title {
    width: 41.6667%;
  }

  .site-footer__subscribe-form {
    width: 50%;
    max-width: none;
    flex-direction: row;
    margin-left: 8.333%;
  }
}
</style>
