<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
</script>

<template>
  <CtaSection class="home-cta--unslopped" title-id="home-cta-title" />
</template>

<style scoped lang="scss">
.home-cta--unslopped {
  &::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(3, 9, 15, 0.58);
    content: "";
    pointer-events: none;
  }

  :deep(h2) {
    background: none;
    color: #ffffff;
    -webkit-text-fill-color: currentcolor;
  }

  :deep(.home-contact-cta__metrics) {
    letter-spacing: 0;
  }

  :deep(.home-cta--contact) {
    width: 208px;
    border-radius: var(--dt-ui-radius);
    border-color: rgba(255, 255, 255, 0.72);
    background: rgba(247, 248, 250, 0.96);
    color: #07111c;
  }

  :deep(.home-cta--contact:hover),
  :deep(.home-cta--contact:focus-visible) {
    border-color: #ffffff;
    background: #ffffff;
    box-shadow: none;
  }
}
</style>
