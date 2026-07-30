<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '~/components/common/BaseButton.vue'
import { deliverables } from '~/data/home'

const activeDeliverableIndex = ref(0)

function showPreviousDeliverable() {
  activeDeliverableIndex.value = (activeDeliverableIndex.value + deliverables.length - 1) % deliverables.length
}

function showNextDeliverable() {
  activeDeliverableIndex.value = (activeDeliverableIndex.value + 1) % deliverables.length
}
</script>

<template>
  <section class="section deliverables" aria-labelledby="deliverables-title">
    <div class="container">
      <h2 id="deliverables-title" class="sr-only">三大业务方向</h2>
      <div class="deliverables__viewport" aria-label="三大业务方向" aria-roledescription="轮播">
        <button
          class="deliverables__control deliverables__control--previous"
          type="button"
          aria-label="查看上一项业务方向"
          @click="showPreviousDeliverable"
        >
          <svg class="deliverables__control-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>

        <div class="deliverables__track" :data-active-slide="activeDeliverableIndex">
          <article
            v-for="(item, index) in deliverables"
            :key="item.title"
            class="deliverables__slide"
            :aria-hidden="activeDeliverableIndex === index ? undefined : 'true'"
          >
            <div class="deliverables__media">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </div>
            <div class="deliverables__content">
              <component :is="item.icon" class="deliverables__icon" :size="48" stroke-width="1.6" aria-hidden="true" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <BaseButton
                class="deliverables__button"
                :href="item.href"
                variant="secondary"
                size="md"
                :tabindex="activeDeliverableIndex === index ? undefined : -1"
              >
                阅读详情
              </BaseButton>
            </div>
          </article>
        </div>

        <button
          class="deliverables__control deliverables__control--next"
          type="button"
          aria-label="查看下一项业务方向"
          @click="showNextDeliverable"
        >
          <svg class="deliverables__control-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.deliverables {
  padding: clamp(3.5rem, 7vw, 6rem) 0 8rem;
}

.deliverables__viewport {
  position: relative;
  overflow: hidden;
  background: transparent;
}

.deliverables__track {
  display: flex;
  width: 100%;
  will-change: transform;
  transition: transform 450ms cubic-bezier(0.4, 0, 0.2, 1);
}

.deliverables__track[data-active-slide="0"] {
  transform: translate3d(0, 0, 0);
}

.deliverables__track[data-active-slide="1"] {
  transform: translate3d(-100%, 0, 0);
}

.deliverables__track[data-active-slide="2"] {
  transform: translate3d(-200%, 0, 0);
}

.deliverables__slide {
  position: relative;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  align-items: stretch;
  min-height: 280px;
  overflow: hidden;
  border-radius: var(--dt-radius-lg);
  background: var(--dt-gradient-spotlight);
}

.deliverables__media {
  position: relative;
  display: none;
  min-height: 300px;
  overflow: hidden;
  background: var(--dt-color-bg);

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.deliverables__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  width: 100%;
  min-height: 280px;
  padding: 24px;
  padding-right: 80px;
  background: linear-gradient(to right, #181524, #271e35);
}

.deliverables__icon {
  width: 48px;
  height: 48px;
  color: #ffffff;
}

h3 {
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
}

p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.625;
}

.deliverables__button {
  margin-top: 0;
}

.deliverables__control {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(21, 21, 21, 0.72);
  color: #ffffff;
  transform: translateY(-50%);
  transition:
    border-color 150ms ease,
    background-color 150ms ease,
    color 150ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.3);
    background: var(--dt-color-primary);
    color: #ffffff;
  }
}

.deliverables__control--previous {
  left: 16px;
}

.deliverables__control--next {
  right: 16px;
}

.deliverables__control-icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 1024px) {
  .deliverables {
    padding-top: clamp(4.5rem, 7vw, 7rem);
    padding-bottom: 11rem;
  }

  .deliverables__slide {
    flex-direction: row;
    min-height: 300px;
  }

  .deliverables__media {
    display: block;
    flex: 0 0 40%;
    width: 40%;
  }

  .deliverables__content {
    flex: 1 1 auto;
    padding: 48px;
    padding-right: 112px;
  }

  h3 {
    font-size: 24px;
    line-height: 1.25;
  }

  p {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .deliverables__content {
    padding-right: 64px;
  }

  .deliverables__control {
    width: 38px;
    height: 38px;
  }

  .deliverables__control--previous {
    left: 10px;
  }

  .deliverables__control--next {
    right: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .deliverables__track {
    transition: none;
  }
}
</style>
