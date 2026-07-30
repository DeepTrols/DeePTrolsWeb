<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import { whyTrustTabs } from '~/data/why'

const activeKey = ref(whyTrustTabs[0]?.key ?? '')
const activeTab = computed(() => whyTrustTabs.find((tab) => tab.key === activeKey.value) ?? whyTrustTabs[0])
</script>

<template>
  <section class="why-trust dt-section relative pb-32 lg:pb-44" aria-labelledby="why-trust-title">
    <div class="container">
      <div class="why-trust__heading mb-12 text-center lg:mb-16">
        <SectionHeading
          title="为什么DeepTrols值得信赖"
          title-id="why-trust-title"
          align="center"
        />

        <div class="why-trust__tabs dt-segmented-tabs" role="tablist" aria-label="DeepTrols 信赖维度">
          <button
            v-for="tab in whyTrustTabs"
            :id="`why-trust-tab-${tab.key}`"
            :key="tab.key"
            class="dt-segmented-tab"
            type="button"
            role="tab"
            :aria-selected="activeKey === tab.key"
            :aria-controls="`why-trust-panel-${tab.key}`"
            @click="activeKey = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div
        v-if="activeTab"
        :id="`why-trust-panel-${activeTab.key}`"
        class="why-trust__panel grid gap-5 md:grid-cols-2 lg:gap-6"
        role="tabpanel"
        :aria-labelledby="`why-trust-tab-${activeTab.key}`"
      >
        <article v-for="feature in activeTab.features" :key="feature.title" class="why-trust__card dt-product-card min-h-[280px] !p-7 lg:!p-8">
          <div class="why-trust__card-accent dt-product-card__accent"></div>
          <div class="why-trust__card-head flex items-center gap-4">
            <div class="why-trust__icon dt-icon-box !size-12 !rounded-xl">
              <component :is="feature.icon" :size="24" aria-hidden="true" />
            </div>
            <h3>{{ feature.title }}</h3>
          </div>
          <p class="why-trust__subtitle">{{ feature.subtitle }}</p>
          <p class="why-trust__description">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-trust :deep(.section-heading) {
  max-width: none;
}

.why-trust :deep(h2) {
  margin-bottom: 32px;
}

.why-trust__tabs {
  justify-content: center;
}

h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
}

.why-trust__subtitle {
  margin: 20px 0 0;
  color: var(--dt-color-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

.why-trust__description {
  flex: 1;
  margin: 12px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 15px;
  line-height: 1.75;
}

@media (min-width: 1024px) {
  .why-trust__description {
    font-size: 16px;
  }
}
</style>
