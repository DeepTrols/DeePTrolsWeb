<script setup lang="ts">
import { footerSocials } from '~/data/footer'
</script>

<template>
  <div class="site-footer__socials" aria-label="社交媒体">
    <template v-for="social in footerSocials" :key="social.label">
      <a
        v-if="social.href"
        :href="social.href"
        rel="noopener noreferrer"
        target="_blank"
        class="site-footer__social-link"
        :aria-label="social.label"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons w-full h-6"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" :d="social.path" />
        </svg>
      </a>
      <button v-else type="button" class="site-footer__social-link" :aria-label="social.label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          class="iconify iconify--simple-icons w-full h-6"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" :d="social.path" />
        </svg>
      </button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.site-footer__socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.site-footer__social-link {
  display: inline-flex;
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--dt-color-text-muted);
  padding: 0;
  transition: color 180ms ease;

  &:hover {
    color: var(--dt-color-text-highlighted);
  }

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid var(--dt-color-primary);
    outline-offset: 2px;
  }

  svg {
    width: 100%;
    height: 24px;
  }
}

@media (min-width: 768px) {
  .site-footer__socials {
    justify-content: flex-start;
  }
}
</style>
