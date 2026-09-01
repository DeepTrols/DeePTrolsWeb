<script setup lang="ts">
import IconBox from '~/components/common/card/IconBox.vue'
import HeroVisualShell from '~/components/common/hero-visual/HeroVisualShell.vue'
import type { SolutionScenarioVisualConfig } from '~/data/solutions/use-cases'

defineProps<{
  visual: SolutionScenarioVisualConfig
}>()
</script>

<template>
  <HeroVisualShell
    glow
    panel-class="overflow-hidden rounded-2xl border border-default bg-dt-bg-soft/70 p-5 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-6"
  >
    <div class="flex items-center gap-4">
      <IconBox :icon="visual.icon" :size="48" :icon-size="24" tone="gradient" />
      <div class="min-w-0">
        <p class="text-sm font-semibold uppercase tracking-wide text-primary">{{ visual.title }}</p>
        <h2 class="mt-1 text-xl font-semibold leading-tight text-highlighted">{{ visual.subtitle }}</h2>
      </div>
    </div>

    <div class="mt-6 grid gap-3">
      <div
        v-for="(layer, index) in visual.layers"
        :key="layer.label"
        class="group relative overflow-hidden rounded-2xl border border-default bg-default p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
      >
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div class="flex items-start gap-3">
          <IconBox :icon="layer.icon" :size="40" :icon-size="20" tone="soft" />
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-primary">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="text-sm font-semibold leading-5 text-highlighted">{{ layer.label }}</h3>
            </div>
            <p class="mt-1 text-xs leading-5 text-muted">{{ layer.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-3 gap-3">
      <div
        v-for="signal in visual.signals"
        :key="signal.label"
        class="rounded-xl border border-default bg-dt-bg-soft/50 px-3 py-3 text-center"
      >
        <div class="text-base font-semibold leading-6 text-highlighted">{{ signal.value }}</div>
        <div class="mt-0.5 text-xs leading-5 text-muted">{{ signal.label }}</div>
      </div>
    </div>
  </HeroVisualShell>
</template>
