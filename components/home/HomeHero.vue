<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
import HomeCustomerLogos from '~/components/home/HomeCustomerLogos.vue'
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="container home-hero__content">
      <div class="home-hero__copy">
        <h1 id="home-hero-title">构建企业级AI能力体系<br />让智能成为业务增长的新引擎</h1>
        <p class="home-hero__subtitle">在AI时代，企业不再需要更多工具，而是需要可落地的结果</p>
        <div class="home-hero__actions">
          <BaseButton href="/contact" size="lg" :show-icon="false">免费咨询</BaseButton>
        </div>
      </div>
      <HomeCustomerLogos />
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  overflow: hidden;
  background: transparent;
}

.home-hero__content {
  position: relative;
  z-index: 1;
  padding-top: 128px;
  text-align: center;
}

.home-hero__copy {
  max-width: 64rem;
  margin: 0 auto;
}

h1 {
  margin: 0 0 24px;
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
}

.home-hero__subtitle {
  margin: 0 0 32px;
  color: var(--dt-color-text);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55556;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin: 0;
}

@media (min-width: 640px) {
  h1 {
    font-size: 48px;
    line-height: 1;
  }

  .home-hero__subtitle {
    font-size: 20px;
    line-height: 1.4;
  }
}

@media (min-width: 768px) {
  .home-hero__subtitle {
    margin-bottom: 48px;
    font-size: 24px;
    line-height: 1.33333;
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 60px;
    line-height: 1.1;
  }
}

@media (max-width: 640px) {
  .home-hero__content {
    padding-top: 104px;
  }
}
</style>
