<script setup lang="ts">
import CtaSection from '~/components/common/CtaSection.vue'
</script>

<template>
  <CtaSection class="home-cta--unslopped" title-id="home-cta-title" />
</template>

<style scoped lang="scss">
.home-cta--unslopped {
  :deep(h2) {
    background: none;
    color: #ffffff;
    -webkit-text-fill-color: currentcolor;
  }

  :deep(.home-contact-cta__metrics) {
    letter-spacing: 0;
  }

  :deep(.home-cta--contact) {
    width: 240px;
    border-radius: var(--dt-ui-radius);
  }

  :deep(.home-cta--contact:hover),
  :deep(.home-cta--contact:focus-visible) {
    box-shadow: none;
  }
}
</style>
