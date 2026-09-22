<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import CardText from '~/components/common/card/CardText.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { dgpUseCases } from '~/data/dgp'
</script>

<template>
  <SectionShell title-id="dgp-use-cases-title">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="dgp-use-cases-title"
        eyebrow="应用场景"
        title="数据治理赋能关键业务场景"
        subtitle="面向政务、制造、企业经营与 AI 应用，构建可持续演进的高质量数据基础。"
        align="center"
        width="wide"
        nowrap-subtitle
      />
    </div>

    <CardGrid columns="two">
      <BaseCard
        v-for="item in dgpUseCases"
        :key="item.title"
        variant="product"
        padding="none"
        accent
        equal-height
        class="!p-7 lg:!p-8"
      >
        <div class="flex items-center gap-4">
          <IconBox :icon="item.icon" :size="48" :icon-size="24" />
          <CardText :title="item.title" title-size="lg" />
        </div>
        <CardText
          class="mt-5"
          :description="item.description"
          :points="item.points"
          description-size="md"
        />
      </BaseCard>
    </CardGrid>
  </SectionShell>
</template>
