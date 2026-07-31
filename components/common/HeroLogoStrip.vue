<template>
  <section class="hero-logo-strip">
    <div class="container">
      <div class="hero-logo-strip__inner mt-24 border-t border-dt-line pt-12 lg:mt-28">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-logo-strip {
  background: var(--dt-color-bg);
  padding-bottom: 96px;
}

.hero-logo-strip__inner :deep(.customer-logos) {
  padding-top: 0;
}

@media (min-width: 1024px) {
  .hero-logo-strip {
    padding-bottom: 128px;
  }
}
</style>
