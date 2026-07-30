<script setup lang="ts">
import FooterBottom from '~/components/layout/FooterBottom.vue'
import FooterMain from '~/components/layout/FooterMain.vue'
import FooterSocials from '~/components/layout/FooterSocials.vue'
import FooterSubscribe from '~/components/layout/FooterSubscribe.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <FooterSubscribe />

      <hr class="site-footer__rule" />

      <FooterMain />
      <FooterSocials />

      <hr class="site-footer__rule site-footer__rule--bottom" />

      <FooterBottom />
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  padding-top: 48px;
  background: var(--dt-color-bg-soft);
  color: var(--dt-color-text);
}

.site-footer__rule {
  height: 1px;
  margin: 24px 0 32px;
  border: 0;
  background: var(--dt-color-line);
}

.site-footer__rule--bottom {
  margin: 40px 0 24px;
}

@media print {
  .site-footer {
    display: none;
  }
}
</style>
