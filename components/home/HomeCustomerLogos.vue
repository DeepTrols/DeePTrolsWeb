<script setup lang="ts">
import { computed } from 'vue'
import { customerLogos } from '~/data/home'

const logoRows = computed(() => [...customerLogos, ...customerLogos])
</script>

<template>
  <section class="customer-logos" aria-labelledby="customer-logos-title">
    <h2 id="customer-logos-title">深受数据和人工智能基础设施领域领导者的信赖</h2>
    <div class="customer-logos__viewport" aria-label="客户与合作伙伴">
      <ul class="customer-logos__track">
        <li v-for="(logo, index) in logoRows" :key="`${logo.name}-${index}`" class="customer-logos__item">
          <img v-if="logo.image" :src="logo.image" :alt="logo.name" loading="lazy" />
          <span v-else>{{ logo.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.customer-logos {
  width: 100%;
  padding-top: 5.5rem;
}

h2 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}

.customer-logos__viewport {
  position: relative;
  overflow: hidden;
  padding: 24px 24px;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
}

.customer-logos__track {
  display: flex;
  width: max-content;
  gap: 4rem;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: logoMarquee 40s linear infinite;
}

.customer-logos__item {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  height: 56px;
  color: rgba(245, 250, 255, 0.72);
  padding: 0;
  font-size: 13px;
  font-weight: 650;
  text-align: center;
  white-space: nowrap;

  img {
    max-width: 100%;
    max-height: 48px;
    object-fit: contain;
    filter: grayscale(1) brightness(0) invert(1);
    opacity: 0.8;
  }
}

.customer-logos__viewport:hover .customer-logos__track {
  animation-play-state: paused;
}

@keyframes logoMarquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 2rem));
  }
}

@media (max-width: 640px) {
  .customer-logos__item {
    height: 48px;
  }
}
</style>
