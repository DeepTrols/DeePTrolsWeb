<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import SectionShell from '~/components/common/section/SectionShell.vue'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    titleId: string
    subtitle?: string
  }>(),
  {
    subtitle: undefined,
  },
)
</script>

<template>
  <SectionShell :title-id="titleId">
    <div class="mb-12 text-center lg:mb-16">
      <SectionHeader :title-id="titleId" :eyebrow="eyebrow" :title="title" :subtitle="subtitle" align="center" />
    </div>

    <div class="flex flex-col gap-6">
      <slot />
    </div>
  </SectionShell>
</template>
