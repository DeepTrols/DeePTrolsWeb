<script setup lang="ts">
import BaseCard from '~/components/common/card/BaseCard.vue'
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'
import { fdeCoreValues } from '~/data/solutions/fde'
</script>

<template>
  <SectionShell title-id="fde-value-title" spacing="compact" container-spacing="top">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        title-id="fde-value-title"
        eyebrow="核心价值"
        title="缩短 AI 从想法到价值的距离"
        subtitle="FDE 将业务理解、AI 能力与工程交付整合到同一团队，通过深入现场、快速验证和持续迭代，减少业务与技术之间的反复传递，让真正有效的 AI 场景更快进入生产环境。"
        align="center"
        width="wide"
      />
    </div>

    <CardGrid columns="two">
      <BaseCard
        v-for="item in fdeCoreValues"
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
