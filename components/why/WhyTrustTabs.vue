<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { whyTrustTabs } from '~/data/why'

const activeKey = ref(whyTrustTabs[0]?.key ?? '')
const activeTab = computed(() => whyTrustTabs.find((tab) => tab.key === activeKey.value) ?? whyTrustTabs[0])
</script>

<template>
  <section class="why-trust" aria-labelledby="why-trust-title">
    <div class="container">
      <div class="why-trust__heading">
        <SectionHeading
          title="为什么DeepTrols值得信赖"
          title-id="why-trust-title"
          align="center"
        />
      </div>

      <div class="why-trust__tabs dt-tab-list" role="tablist" aria-label="DeepTrols 信赖维度">
        <button
          v-for="tab in whyTrustTabs"
          :id="`why-trust-tab-${tab.key}`"
          :key="tab.key"
          class="dt-tab"
          type="button"
          role="tab"
          :aria-selected="activeKey === tab.key"
          :aria-controls="`why-trust-panel-${tab.key}`"
          @click="activeKey = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div
        v-if="activeTab"
        :id="`why-trust-panel-${activeTab.key}`"
        class="why-trust__panel"
        role="tabpanel"
        :aria-labelledby="`why-trust-tab-${activeTab.key}`"
      >
        <article v-for="feature in activeTab.features" :key="feature.title" class="why-trust__card dt-product-card">
          <div class="why-trust__card-accent dt-product-card__accent"></div>
          <div class="why-trust__card-head">
            <div class="why-trust__icon dt-icon-box">
              <component :is="feature.icon" :size="20" aria-hidden="true" />
            </div>
            <div>
              <p>{{ feature.title }}</p>
              <h3>{{ feature.subtitle }}</h3>
            </div>
          </div>
          <span>{{ feature.description }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-trust {
  position: relative;
  padding-bottom: 128px;
  background: var(--dt-color-bg);
}

.why-trust__heading {
  margin-bottom: 48px;
  text-align: center;
}

.why-trust :deep(.section-heading) {
  max-width: none;
}

.why-trust :deep(h2) {
  margin-bottom: 32px;
}

.why-trust__tabs {
  justify-content: center;
  margin-bottom: 32px;
}

.why-trust__panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.why-trust__card {
  min-height: 280px;
  padding: 28px;
}

.why-trust__card-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.why-trust__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

p {
  margin: 0 0 6px;
  color: var(--dt-color-primary);
  font-size: 14px;
  font-weight: 650;
  line-height: 20px;
}

h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
}

span {
  margin-top: 18px;
  color: var(--dt-color-text-muted);
  font-size: 15px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .why-trust__panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .why-trust {
    padding-bottom: 176px;
  }

  .why-trust__heading {
    margin-bottom: 64px;
  }

  .why-trust__panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .why-trust__card {
    padding: 32px;
  }
}
</style>
