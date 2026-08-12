<script setup lang="ts">
import ProductValueSection from '~/components/common/ProductValueSection.vue'
import ValueCard from '~/components/common/card/ValueCard.vue'
import BoyaoApplicationVisual from '~/components/product/boyao/BoyaoApplicationVisual.vue'
import BoyaoEfficiencyVisual from '~/components/product/boyao/BoyaoEfficiencyVisual.vue'
import BoyaoIntegrationVisual from '~/components/product/boyao/BoyaoIntegrationVisual.vue'
import { boyaoValueCards } from '~/data/boyao'

const efficiencyCard = boyaoValueCards.find((card) => card.key === 'efficiency')
const integrationCard = boyaoValueCards.find((card) => card.key === 'integration')
const applicationCard = boyaoValueCards.find((card) => card.key === 'application')
</script>

<template>
  <ProductValueSection eyebrow="核心价值" title="企业选择博曜的理由" title-id="boyao-core-value-title">
    <ValueCard
      v-if="efficiencyCard"
      :eyebrow="efficiencyCard.eyebrow"
      :title="efficiencyCard.title"
      :description="efficiencyCard.description"
      :metrics="efficiencyCard.metrics"
      layout="split"
    >
      <template #visual>
        <BoyaoEfficiencyVisual />
      </template>
    </ValueCard>

    <div class="grid gap-6 lg:grid-cols-2">
      <ValueCard
        v-if="integrationCard"
        :eyebrow="integrationCard.eyebrow"
        :title="integrationCard.title"
        :description="integrationCard.description"
        layout="stack"
      >
        <template #visual>
          <BoyaoIntegrationVisual />
        </template>
      </ValueCard>

      <ValueCard
        v-if="applicationCard"
        :eyebrow="applicationCard.eyebrow"
        :title="applicationCard.title"
        :description="applicationCard.description"
        layout="stack"
      >
        <template #visual>
          <BoyaoApplicationVisual />
        </template>
      </ValueCard>
    </div>
  </ProductValueSection>
</template>
