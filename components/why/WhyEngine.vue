<script setup lang="ts">
import SectionHeading from '~/components/common/SectionHeading.vue'
import { whyEngineLinks } from '~/data/why'
</script>

<template>
  <section class="why-engine" aria-labelledby="why-engine-title">
    <div class="container why-engine__grid">
      <div class="why-engine__links">
        <NuxtLink v-for="link in whyEngineLinks" :key="link.title" class="group why-engine__link" :to="link.href">
          <div class="why-engine__link-glow" aria-hidden="true"></div>
          <div class="why-engine__link-icon">
            <component :is="link.icon" :size="28" aria-hidden="true" />
          </div>
          <div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
          </div>
        </NuxtLink>
      </div>

      <div class="why-engine__content">
        <SectionHeading
          eyebrow="Reinvention Engine"
          title="重塑引擎"
          title-id="why-engine-title"
        />
        <p>
          重塑引擎是DeepTrols持续实现自我重塑的核心能力体系。它推动我们不断打造更专业、更深厚的行业与技术能力，以 AI 赋能服务交付，持续引领技术创新，并沉淀最先进的工具、方法论与实践体系。
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-engine {
  padding-bottom: 128px;
  background: var(--dt-color-bg);
}

.why-engine__grid {
  display: grid;
  gap: 48px;
  align-items: center;
}

.why-engine__links {
  display: grid;
  gap: 24px;
}

.why-engine__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  border: 1px solid var(--dt-color-line);
  border-radius: 24px;
  background: rgba(39, 30, 53, 0.3);
  padding: 24px;
  transition:
    transform var(--dt-duration-slow) ease,
    border-color var(--dt-duration-slow) ease,
    background-color var(--dt-duration-slow) ease,
    box-shadow var(--dt-duration-slow) ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(94, 78, 255, 0.4);
    background: rgba(39, 30, 53, 0.55);
    box-shadow: 0 24px 50px rgba(94, 78, 255, 0.06);
  }
}

.why-engine__link-glow {
  position: absolute;
  top: -64px;
  right: -64px;
  width: 176px;
  height: 176px;
  border-radius: 9999px;
  background: rgba(94, 78, 255, 0.08);
  filter: blur(48px);
  transition: background-color 500ms ease;
  pointer-events: none;
}

.why-engine__link:hover .why-engine__link-glow {
  background: rgba(94, 78, 255, 0.16);
}

.why-engine__link-icon {
  position: relative;
  display: flex;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--dt-color-line);
  border-radius: 16px;
  background: #ffffff;
  color: #151515;
}

h3 {
  position: relative;
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
}

p {
  margin: 10px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 16px;
  line-height: 1.75;
}

.why-engine__content > p {
  max-width: 680px;
  margin-top: 24px;
  font-size: 18px;
}

@media (min-width: 1024px) {
  .why-engine {
    padding-bottom: 176px;
  }

  .why-engine__grid {
    grid-template-columns: minmax(420px, 0.9fr) minmax(0, 1fr);
    gap: 72px;
  }

  .why-engine__content {
    justify-self: end;
  }

  .why-engine__content > p {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .why-engine__link,
  .why-engine__link-glow {
    transition: none;
  }

  .why-engine__link:hover {
    transform: none;
  }
}
</style>
