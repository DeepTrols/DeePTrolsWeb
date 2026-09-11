<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { hydraulicValues } from '~/data/solutions/hydraulic'
</script>

<template>
  <SectionShell title-id="hydraulic-value-title" spacing="tight" container-spacing="top">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="hydraulic-value-title"
        eyebrow="核心价值"
        title="让水利知识可沉淀、可理解、可调用、可决策"
        subtitle="面向防洪减灾、水资源管理与水工程调度等核心业务，通过数曜统一治理多源水利数据，依托博曜构建专业知识库与知识图谱，让分散的数据、文档、规则与专家经验转化为可持续积累、可智能检索、可关联推理的知识资产，为水利业务提供更加高效、精准的辅助决策支撑。"
        align="center"
      />
    </div>

    <CardGrid columns="two">
      <BaseCard
        v-for="item in hydraulicValues"
        :key="item.title"
        variant="product"
        padding="none"
        accent
        equal-height
        class="!p-7 lg:!p-8"
      >
        <div class="flex items-center gap-4">
          <IconBox :icon="item.icon" :size="40" :icon-size="20" />
          <h3 class="m-0 text-2xl font-bold leading-[1.25] text-highlighted">{{ item.title }}</h3>
        </div>
        <p class="m-0 mt-5 text-lg font-semibold leading-normal text-primary">{{ item.subtitle }}</p>
        <p class="m-0 mt-3 text-[15px] leading-[1.75] text-muted lg:text-base">{{ item.description }}</p>
        <ul class="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
          <li
            v-for="tag in item.tags"
            :key="tag"
            class="rounded-full bg-dt-bg-soft px-3 py-1 text-xs leading-relaxed text-muted"
          >
            {{ tag }}
          </li>
        </ul>
      </BaseCard>
    </CardGrid>
  </SectionShell>
</template>
