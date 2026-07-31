<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '~/components/common/SectionHeading.vue'
import type { Component } from 'vue'

export interface TrustTabsFeature {
  title: string
  subtitle: string
  description: string
  icon: Component
}

export interface TrustTabsItem {
  key: string
  label: string
  features: TrustTabsFeature[]
}

const props = defineProps<{
  tabs: TrustTabsItem[]
  title: string
  titleId: string
  tablistLabel: string
}>()

const activeKey = ref(props.tabs[0]?.key ?? '')
const activeTab = computed(() => props.tabs.find((tab) => tab.key === activeKey.value) ?? props.tabs[0])
</script>

<template>
  <section class="trust-tabs-section dt-section relative pb-32 lg:pb-44" :aria-labelledby="titleId">
    <div class="container">
      <div class="trust-tabs-section__heading mb-12 text-center lg:mb-16">
        <SectionHeading :title="title" :title-id="titleId" align="center" />

        <div class="trust-tabs-section__tabs dt-segmented-tabs" role="tablist" :aria-label="tablistLabel">
          <button
            v-for="tab in tabs"
            :id="`${titleId}-tab-${tab.key}`"
            :key="tab.key"
            class="dt-segmented-tab"
            type="button"
            role="tab"
            :aria-selected="activeKey === tab.key"
            :aria-controls="`${titleId}-panel-${tab.key}`"
            @click="activeKey = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div
        v-if="activeTab"
        :id="`${titleId}-panel-${activeTab.key}`"
        class="trust-tabs-section__panel grid gap-5 md:grid-cols-2 lg:gap-6"
        role="tabpanel"
        :aria-labelledby="`${titleId}-tab-${activeTab.key}`"
      >
        <article
          v-for="feature in activeTab.features"
          :key="feature.title"
          class="trust-tabs-section__card dt-product-card min-h-[280px] !p-7 lg:!p-8"
        >
          <div class="trust-tabs-section__card-accent dt-product-card__accent"></div>
          <div class="trust-tabs-section__card-head flex items-center gap-4">
            <div class="trust-tabs-section__icon dt-icon-box !size-12 !rounded-xl">
              <component :is="feature.icon" :size="24" aria-hidden="true" />
            </div>
            <h3>{{ feature.title }}</h3>
          </div>
          <p class="trust-tabs-section__subtitle">{{ feature.subtitle }}</p>
          <p class="trust-tabs-section__description">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trust-tabs-section :deep(.section-heading) {
  max-width: none;
}

.trust-tabs-section :deep(h2) {
  margin-bottom: 32px;
}

.trust-tabs-section__tabs {
  justify-content: center;
}

h3 {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
}

.trust-tabs-section__subtitle {
  margin: 20px 0 0;
  color: var(--dt-color-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

.trust-tabs-section__description {
  flex: 1;
  margin: 12px 0 0;
  color: var(--dt-color-text-muted);
  font-size: 15px;
  line-height: 1.75;
}

@media (min-width: 1024px) {
  .trust-tabs-section__description {
    font-size: 16px;
  }
}
</style>
