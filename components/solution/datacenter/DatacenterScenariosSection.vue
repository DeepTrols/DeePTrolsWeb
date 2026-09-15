<script setup lang="ts">
import SectionHeader from '~/components/common/section/SectionHeader.vue'
import { datacenterScenarios } from '~/data/solutions/datacenter'
</script>

<template>
  <section class="relative flow-root bg-dt-bg pb-32 lg:pb-44" aria-labelledby="datacenter-scenarios-title">
    <div class="container">
      <div class="mb-12 text-center lg:mb-16">
        <SectionHeader
          title-id="datacenter-scenarios-title"
          title="典型场景"
          align="center"
          width="wide"
        />
      </div>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="item in datacenterScenarios"
          :key="item.title"
          class="grid h-full grid-rows-[auto_auto_1fr] content-start gap-4 rounded-lg border border-default bg-muted p-8"
        >
          <component :is="item.icon" class="size-8 text-muted" aria-hidden="true" />
          <h3 class="text-lg font-semibold text-highlighted">{{ item.title }}</h3>
          <p class="text-base font-normal text-default">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
