<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { energySavingValues } from '~/data/solutions/energy-saving'
</script>

<template>
  <SectionShell title-id="energy-saving-value-title" spacing="tight" container-spacing="top">
    <div class="mb-12 lg:mb-16">
      <SectionHeader
        title-id="energy-saving-value-title"
        title="贯通感知、数据、分析与优化的储能智能能力体系"
        align="left"
      />
    </div>

    <CardGrid columns="three">
      <BaseCard
        v-for="item in energySavingValues"
        :key="item.title"
        as="article"
        equal-height
      >
        <h3 class="m-0 text-lg font-semibold text-highlighted">
          {{ item.title }}
        </h3>
        <p class="m-0 mt-3 text-sm leading-relaxed text-default">
          {{ item.description }}
        </p>
      </BaseCard>
    </CardGrid>
  </SectionShell>
</template>
