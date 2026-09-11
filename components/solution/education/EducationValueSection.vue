<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { educationValues } from '~/data/solutions/education'
</script>

<template>
  <SectionShell title-id="education-value-title" spacing="tight" container-spacing="top">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="education-value-title"
        eyebrow="核心价值"
        title="让 AI 从辅助工具，走向教育业务智能执行者"
        subtitle="面向教学、学习、教务与校园服务，通过智曜统一连接模型、智能体、工具和业务系统，让 AI 不仅能够理解和生成内容，更能够规划任务、调用工具、协同执行，将智能能力真正嵌入教育业务全过程。"
        align="center"
        width="wide"
      />
    </div>

    <CardGrid columns="two">
      <BaseCard
        v-for="item in educationValues"
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
