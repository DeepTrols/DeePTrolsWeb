<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
</script>

<template>
  <section class="home-cta" aria-labelledby="home-cta-title">
    <div class="container">
      <div class="home-cta__panel dt-cta-panel">
        <h2 id="home-cta-title">构建企业自身的AI能力</h2>
        <p>让数据成为资产，让知识驱动决策，让AI创造价值</p>
        <div class="home-cta__actions">
          <BaseButton href="/contact" variant="primary" size="lg">咨询合作</BaseButton>
          <BaseButton href="/try" variant="secondary" size="lg">申请试用</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-cta {
  padding-bottom: 128px;
  background: var(--dt-color-bg);
  color: var(--dt-color-text);
  text-align: center;
}

.home-cta__panel {
  text-align: center;
}

h2 {
  margin: 0 0 16px;
  color: var(--dt-color-text-highlighted);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
}

p {
  margin: 0 0 24px;
  color: var(--dt-color-text);
  font-size: 16px;
  line-height: 24px;
}

.home-cta__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

@media (min-width: 640px) {
  h2 {
    margin-bottom: 24px;
    font-size: 48px;
  }

  p {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  p {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .home-cta {
    padding-bottom: 176px;
  }
}
</style>
