<script setup lang="ts">
import CardGrid from '~/components/common/card/CardGrid.vue'
import IconBox from '~/components/common/card/IconBox.vue'
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'

export interface CompatibilityGridItem {
  label: string
  icon: string
}

export interface CompatibilityGridCategory {
  key: string
  title: string
  items: CompatibilityGridItem[]
}

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle: string
    categories: CompatibilityGridCategory[]
    nowrapSubtitle?: boolean
  }>(),
  {
    nowrapSubtitle: false,
  },
)
</script>

<template>
  <SectionShell :title-id="titleId">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader
        :title-id="titleId"
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        :nowrap-subtitle="nowrapSubtitle"
        :width="nowrapSubtitle ? 'wide' : 'default'"
      />
    </div>

    <CardGrid columns="three">
      <div
        v-for="category in categories"
        :key="category.key"
        class="overflow-hidden rounded-2xl border border-muted bg-dt-bg-soft/30 p-5"
      >
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">{{ category.title }}</h3>
        <div class="space-y-3">
          <div
            v-for="item in category.items"
            :key="item.label"
            class="flex items-center gap-3 rounded-xl border border-muted bg-default px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
          >
            <IconBox :size="40" tone="soft">
              <img :src="item.icon" :alt="item.label" class="size-8" loading="lazy" />
            </IconBox>
            <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </CardGrid>
  </SectionShell>
</template>
