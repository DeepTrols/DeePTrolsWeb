<script setup lang="ts">
import EcosystemAgentVisual from '~/components/home/ecosystem-visuals/EcosystemAgentVisual.vue'
import EcosystemInfraVisual from '~/components/home/ecosystem-visuals/EcosystemInfraVisual.vue'
import EcosystemReportVisual from '~/components/home/ecosystem-visuals/EcosystemReportVisual.vue'
import EcosystemTokenVisual from '~/components/home/ecosystem-visuals/EcosystemTokenVisual.vue'

type EcosystemVisualVariant = 'token' | 'agent' | 'infra' | 'report'

defineProps<{
  variant: EcosystemVisualVariant
}>()

const visualComponents = {
  token: EcosystemTokenVisual,
  agent: EcosystemAgentVisual,
  infra: EcosystemInfraVisual,
  report: EcosystemReportVisual,
}
</script>

<template>
  <div class="ecosystem-visual" :class="`ecosystem-visual--${variant}`" aria-hidden="true">
    <div class="ecosystem-visual__fade"></div>
    <div class="ecosystem-visual__stage">
      <component :is="visualComponents[variant]" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ecosystem-visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: var(--dt-color-primary);
  pointer-events: none;
}

.ecosystem-visual__fade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, var(--dt-color-bg) 0%, var(--dt-color-bg) 30%, transparent 100%);
}

.ecosystem-visual--token .ecosystem-visual__fade {
  background: linear-gradient(90deg, var(--dt-color-bg) 0%, var(--dt-color-bg) 25%, transparent 50%);
}

.ecosystem-visual__stage {
  position: absolute;
  top: -5%;
  right: -5%;
  width: 80%;
  height: 110%;
}

.ecosystem-visual--infra .ecosystem-visual__stage {
  top: -5px;
}

.ecosystem-visual :deep(.ecosystem-visual__svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.ecosystem-visual :deep(.ecosystem-visual__cloud-grid) {
  fill: rgba(94, 78, 255, 0.1);
  transition: fill 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__base-line),
.ecosystem-visual :deep(.ecosystem-visual__flow),
.ecosystem-visual :deep(.ecosystem-visual__map-line),
.ecosystem-visual :deep(.ecosystem-visual__map-flow),
.ecosystem-visual :deep(.ecosystem-visual__cloud-icon),
.ecosystem-visual :deep(.ecosystem-visual__device-line) {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ecosystem-visual :deep(.ecosystem-visual__base-line),
.ecosystem-visual :deep(.ecosystem-visual__map-line) {
  opacity: 0.2;
  stroke-width: 0.2;
  transition: opacity 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__map-line) {
  stroke-width: 0.28;
  stroke-dasharray: 1 2;
}

.ecosystem-visual :deep(.ecosystem-visual__flow),
.ecosystem-visual :deep(.ecosystem-visual__map-flow) {
  opacity: 0;
  stroke-width: 0.6;
  animation: ecosystemVisualFlow 500ms linear infinite;
  animation-play-state: paused;
  transition: opacity 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__map-flow) {
  stroke-dasharray: 1 15;
}

.ecosystem-visual--token {
  :deep(.ecosystem-visual__flow),
  :deep(.ecosystem-visual__map-flow) {
    animation-duration: 800ms;
  }
}

.ecosystem-visual--infra :deep(.ecosystem-visual__flow) {
  animation-duration: 600ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-0) {
  animation-delay: 0s;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-1) {
  animation-delay: -300ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-2) {
  animation-delay: -600ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-3) {
  animation-delay: -1300ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-4) {
  animation-delay: -1900ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-5) {
  animation-delay: -1600ms;
}

.ecosystem-visual :deep(.ecosystem-visual__flow--delay-6) {
  animation-delay: -100ms;
}

.ecosystem-visual :deep(.ecosystem-visual__outer-node),
.ecosystem-visual :deep(.ecosystem-visual__hub-disc),
.ecosystem-visual :deep(.ecosystem-visual__server-shell),
.ecosystem-visual :deep(.ecosystem-visual__device-shell) {
  fill: #151515;
  stroke: rgba(94, 78, 255, 0.2);
  transition:
    fill 300ms ease,
    stroke 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__outer-node) {
  stroke-width: 0.15;
}

.ecosystem-visual :deep(.ecosystem-visual__inner-node) {
  fill: rgba(94, 78, 255, 0.2);
  transition: fill 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__hub-disc) {
  stroke-width: 0;
}

.ecosystem-visual :deep(.ecosystem-visual__cloud-icon) {
  fill: #151515;
  stroke: rgba(94, 78, 255, 0.2);
  stroke-width: 0.8;
  transition:
    fill 300ms ease,
    stroke 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__server) {
  transition: transform 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__server-shell) {
  stroke-width: 0.3;
}

.ecosystem-visual :deep(.ecosystem-visual__server-row) {
  fill: rgba(94, 78, 255, 0.03);
  stroke: rgba(94, 78, 255, 0.15);
  stroke-width: 0.1;
}

.ecosystem-visual :deep(.ecosystem-visual__led) {
  fill: currentColor;
  opacity: 0.08;
  animation: ecosystemVisualPulse 800ms ease-in-out infinite;
  animation-play-state: paused;
}

.ecosystem-visual :deep(.ecosystem-visual__server--right .ecosystem-visual__led--delay-0) {
  animation-delay: -1500ms;
}

.ecosystem-visual :deep(.ecosystem-visual__server--right .ecosystem-visual__led--delay-1) {
  animation-delay: -2000ms;
}

.ecosystem-visual :deep(.ecosystem-visual__server--right .ecosystem-visual__led--delay-2) {
  animation-delay: -2500ms;
}

.ecosystem-visual :deep(.ecosystem-visual__server--top .ecosystem-visual__led--delay-1),
.ecosystem-visual :deep(.ecosystem-visual__server--left .ecosystem-visual__led--delay-1) {
  animation-delay: -500ms;
}

.ecosystem-visual :deep(.ecosystem-visual__server--top .ecosystem-visual__led--delay-2),
.ecosystem-visual :deep(.ecosystem-visual__server--left .ecosystem-visual__led--delay-2) {
  animation-delay: -1000ms;
}

.ecosystem-visual :deep(.ecosystem-visual__device-label) {
  fill: currentColor;
  opacity: 0.3;
  font-size: 3px;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: opacity 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__device-label--cloud) {
  opacity: 0.5;
}

.ecosystem-visual :deep(.ecosystem-visual__device-shell) {
  stroke-width: 0.8;
}

.ecosystem-visual :deep(.ecosystem-visual__device-line) {
  stroke: rgba(94, 78, 255, 0.2);
  stroke-width: 0.8;
  transition: stroke 300ms ease;
}

.ecosystem-visual :deep(.ecosystem-visual__device-line--muted) {
  stroke: rgba(94, 78, 255, 0.15);
}

@keyframes ecosystemVisualFlow {
  from {
    stroke-dashoffset: 16;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ecosystemVisualPulse {
  0%,
  100% {
    opacity: 0.15;
  }

  50% {
    filter: drop-shadow(0 0 1px currentColor);
    opacity: 0.8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem-visual :deep(.ecosystem-visual__flow),
  .ecosystem-visual :deep(.ecosystem-visual__map-flow),
  .ecosystem-visual :deep(.ecosystem-visual__led) {
    animation: none;
  }
}

@media (min-width: 640px) {
  .ecosystem-visual__stage {
    width: 65%;
  }
}
</style>
