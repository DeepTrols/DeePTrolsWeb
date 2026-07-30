<script setup lang="ts">
defineProps<{
  variant: 'token' | 'agent' | 'infra' | 'report'
}>()

interface DotPoint {
  id: string
  x: number
  y: number
}

interface FlowLine {
  key: string
  x1: number
  y1: number
  x2: number
  y2: number
  delayClass: string
}

interface MapNode {
  key: string
  x: number
  y: number
}

const cloudDots: DotPoint[] = Array.from({ length: 60 }, (_, rowIndex) => {
  const y = Number((0.375 + rowIndex * 1.375).toFixed(3))
  const offset = rowIndex % 2 === 0 ? 0 : 0.685

  return Array.from({ length: 66 }, (_, colIndex) => {
    const x = Number((52.407 + offset + colIndex * 1.369).toFixed(3))
    return { id: `cloud-${rowIndex}-${colIndex}`, x, y }
  })
}).flat().filter((dot) => {
  const clusters = [
    { x: 66, y: 19, rx: 18, ry: 21 },
    { x: 96, y: 18, rx: 17, ry: 18 },
    { x: 124, y: 22, rx: 22, ry: 23 },
    { x: 82, y: 50, rx: 24, ry: 25 },
    { x: 116, y: 58, rx: 24, ry: 22 },
  ]
  const holes = [
    { x: 76, y: 19, rx: 7, ry: 5 },
    { x: 103, y: 34, rx: 9, ry: 8 },
    { x: 135, y: 48, rx: 7, ry: 11 },
  ]
  const inCluster = clusters.some((cluster) => {
    const dx = (dot.x - cluster.x) / cluster.rx
    const dy = (dot.y - cluster.y) / cluster.ry
    return dx * dx + dy * dy <= 1
  })
  const inHole = holes.some((hole) => {
    const dx = (dot.x - hole.x) / hole.rx
    const dy = (dot.y - hole.y) / hole.ry
    return dx * dx + dy * dy <= 1
  })

  return inCluster && !inHole
})

const tokenNodes: MapNode[] = [
  { key: 'north-east', x: 133.194, y: 27.875 },
  { key: 'center', x: 118.132, y: 44.375 },
  { key: 'west', x: 86.639, y: 37.5 },
  { key: 'south', x: 103.755, y: 66.375 },
]

const tokenPaths = [
  { key: 'token-a', d: 'M86.639 37.5 C98 31 112 31 133.194 27.875', delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'token-b', d: 'M86.639 37.5 C95 50 105 56 118.132 44.375', delayClass: 'ecosystem-visual__flow--delay-1' },
  { key: 'token-c', d: 'M103.755 66.375 C112 58 122 53 133.194 27.875', delayClass: 'ecosystem-visual__flow--delay-2' },
]

const edgeLines: FlowLine[] = [
  { key: 'edge-a', x1: 105, y1: 30, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'edge-b', x1: 145, y1: 35, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-3' },
  { key: 'edge-c', x1: 135, y1: 70, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'edge-d', x1: 95, y1: 65, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-4' },
]

const edgeNodes: MapNode[] = [
  { key: 'edge-node-a', x: 105, y: 30 },
  { key: 'edge-node-b', x: 145, y: 35 },
  { key: 'edge-node-c', x: 135, y: 70 },
  { key: 'edge-node-d', x: 95, y: 65 },
]

const serverLines: FlowLine[] = [
  { key: 'server-a', x1: 120, y1: 28, x2: 140, y2: 52, delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'server-b', x1: 140, y1: 52, x2: 110, y2: 65, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'server-c', x1: 120, y1: 28, x2: 110, y2: 65, delayClass: 'ecosystem-visual__flow--delay-5' },
]

const serverNodes = [
  { key: 'server-top', transform: 'translate(115, 21)', delaySet: 'ecosystem-visual__server--top' },
  { key: 'server-right', transform: 'translate(135, 45)', delaySet: 'ecosystem-visual__server--right' },
  { key: 'server-left', transform: 'translate(105, 58)', delaySet: 'ecosystem-visual__server--left' },
]

const rackRows = [
  { key: 'row-a', y: 2, cy: 3.2, delayClass: 'ecosystem-visual__led--delay-0' },
  { key: 'row-b', y: 5.8, cy: 7, delayClass: 'ecosystem-visual__led--delay-1' },
  { key: 'row-c', y: 9.6, cy: 10.8, delayClass: 'ecosystem-visual__led--delay-2' },
]

const bridgeLines: FlowLine[] = [
  { key: 'bridge-a', x1: 80, y1: 42, x2: 115, y2: 40, delayClass: 'ecosystem-visual__flow--delay-1' },
  { key: 'bridge-b', x1: 115, y1: 40, x2: 150, y2: 38, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'bridge-c', x1: 150, y1: 38, x2: 115, y2: 40, delayClass: 'ecosystem-visual__flow--delay-6' },
]
</script>

<template>
  <div class="ecosystem-visual" :class="`ecosystem-visual--${variant}`" aria-hidden="true">
    <div class="ecosystem-visual__fade"></div>
    <div class="ecosystem-visual__stage">
      <svg v-if="variant === 'token'" viewBox="50 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow-map" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g class="ecosystem-visual__cloud-grid">
          <circle v-for="dot in cloudDots" :key="dot.id" :cx="dot.x" :cy="dot.y" r="0.35" />
        </g>
        <g>
          <path
            v-for="path in tokenPaths"
            :key="`${path.key}-base`"
            class="ecosystem-visual__base-line ecosystem-visual__map-line"
            :d="path.d"
          />
          <path
            v-for="path in tokenPaths"
            :key="path.key"
            class="ecosystem-visual__flow ecosystem-visual__map-flow"
            :class="path.delayClass"
            :d="path.d"
            filter="url(#glow-map)"
          />
        </g>
        <g v-for="node in tokenNodes" :key="node.key" class="ecosystem-visual__map-node" :transform="`translate(${node.x}, ${node.y})`">
          <circle class="ecosystem-visual__outer-node" r="1.5" />
          <circle class="ecosystem-visual__inner-node" r="0.5" />
        </g>
      </svg>

      <svg v-else-if="variant === 'agent'" viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="edgeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g v-for="line in edgeLines" :key="line.key">
          <line
            class="ecosystem-visual__base-line"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 2"
          />
          <line
            class="ecosystem-visual__flow"
            :class="line.delayClass"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 15"
            filter="url(#edgeGlow)"
          />
        </g>
        <g v-for="node in edgeNodes" :key="node.key">
          <circle class="ecosystem-visual__outer-node" :cx="node.x" :cy="node.y" r="1.5" />
          <circle class="ecosystem-visual__inner-node" :cx="node.x" :cy="node.y" r="0.5" />
        </g>
        <g transform="translate(125, 55)">
          <circle class="ecosystem-visual__hub-disc" r="4.5" />
          <g transform="translate(-4.5, -5.5) scale(0.4)">
            <path
              class="ecosystem-visual__cloud-icon"
              d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
            />
          </g>
        </g>
      </svg>

      <svg v-else-if="variant === 'infra'" viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="serverGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g v-for="line in serverLines" :key="line.key">
          <line
            class="ecosystem-visual__base-line"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 2"
          />
          <line
            class="ecosystem-visual__flow"
            :class="line.delayClass"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 15"
            filter="url(#serverGlow)"
          />
        </g>
        <g v-for="server in serverNodes" :key="server.key" class="ecosystem-visual__server" :class="server.delaySet" :transform="server.transform">
          <rect x="0" y="0" width="10" height="14" rx="1" class="ecosystem-visual__server-shell" />
          <g v-for="row in rackRows" :key="row.key">
            <rect x="1.5" :y="row.y" width="7" height="2.5" rx="0.4" class="ecosystem-visual__server-row" />
            <circle cx="7.2" :cy="row.cy" r="0.5" class="ecosystem-visual__led" :class="row.delayClass" />
          </g>
        </g>
      </svg>

      <svg v-else viewBox="70 0 100 100" class="ecosystem-visual__svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="bridgeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g v-for="line in bridgeLines" :key="line.key">
          <line
            v-if="line.key !== 'bridge-c'"
            class="ecosystem-visual__base-line"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 2"
          />
          <line
            class="ecosystem-visual__flow"
            :class="line.delayClass"
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke-dasharray="1 15"
            filter="url(#bridgeGlow)"
          />
        </g>
        <g transform="translate(80, 42)">
          <text y="-10" text-anchor="middle" class="ecosystem-visual__device-label">论文</text>
          <g transform="translate(-5, -4) scale(0.4)">
            <rect x="2" y="3" width="20" height="14" rx="2" class="ecosystem-visual__device-shell" />
            <path d="M8 21h8M12 17v4" class="ecosystem-visual__device-line" />
            <path d="M6 8h12M6 12h8" class="ecosystem-visual__device-line ecosystem-visual__device-line--muted" />
          </g>
        </g>
        <g transform="translate(115, 40)">
          <circle class="ecosystem-visual__outer-node" r="1.5" />
          <circle class="ecosystem-visual__inner-node" r="0.5" />
        </g>
        <g transform="translate(150, 38)">
          <text y="-8" text-anchor="middle" class="ecosystem-visual__device-label ecosystem-visual__device-label--cloud">领域</text>
          <circle class="ecosystem-visual__hub-disc" r="4.5" />
          <g transform="translate(-4.5, -4.5) scale(0.4)">
            <path
              class="ecosystem-visual__cloud-icon"
              d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
            />
          </g>
        </g>
      </svg>
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

.ecosystem-visual__svg {
  display: block;
  width: 100%;
  height: 100%;
}

.ecosystem-visual__cloud-grid {
  fill: rgba(94, 78, 255, 0.1);
  transition: fill 300ms ease;
}

.ecosystem-visual__base-line,
.ecosystem-visual__flow,
.ecosystem-visual__map-line,
.ecosystem-visual__map-flow,
.ecosystem-visual__cloud-icon,
.ecosystem-visual__device-line {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ecosystem-visual__base-line,
.ecosystem-visual__map-line {
  opacity: 0.2;
  stroke-width: 0.2;
  transition: opacity 300ms ease;
}

.ecosystem-visual__map-line {
  stroke-width: 0.28;
  stroke-dasharray: 1 2;
}

.ecosystem-visual__flow,
.ecosystem-visual__map-flow {
  opacity: 0;
  stroke-width: 0.6;
  animation: ecosystemVisualFlow 500ms linear infinite;
  animation-play-state: paused;
  transition: opacity 300ms ease;
}

.ecosystem-visual__map-flow {
  stroke-dasharray: 1 15;
}

.ecosystem-visual--token {
  .ecosystem-visual__flow,
  .ecosystem-visual__map-flow {
    animation-duration: 800ms;
  }
}

.ecosystem-visual--infra {
  .ecosystem-visual__stage {
    top: -5px;
  }

  .ecosystem-visual__flow {
    animation-duration: 600ms;
  }
}

.ecosystem-visual__flow--delay-0 {
  animation-delay: 0s;
}

.ecosystem-visual__flow--delay-1 {
  animation-delay: -300ms;
}

.ecosystem-visual__flow--delay-2 {
  animation-delay: -600ms;
}

.ecosystem-visual__flow--delay-3 {
  animation-delay: -1300ms;
}

.ecosystem-visual__flow--delay-4 {
  animation-delay: -1900ms;
}

.ecosystem-visual__flow--delay-5 {
  animation-delay: -1600ms;
}

.ecosystem-visual__flow--delay-6 {
  animation-delay: -100ms;
}

.ecosystem-visual__outer-node,
.ecosystem-visual__hub-disc,
.ecosystem-visual__server-shell,
.ecosystem-visual__device-shell {
  fill: #151515;
  stroke: rgba(94, 78, 255, 0.2);
  transition:
    fill 300ms ease,
    stroke 300ms ease;
}

.ecosystem-visual__outer-node {
  stroke-width: 0.15;
}

.ecosystem-visual__inner-node {
  fill: rgba(94, 78, 255, 0.2);
  transition: fill 300ms ease;
}

.ecosystem-visual__hub-disc {
  stroke-width: 0;
}

.ecosystem-visual__cloud-icon {
  fill: #151515;
  stroke: rgba(94, 78, 255, 0.2);
  stroke-width: 0.8;
  transition:
    fill 300ms ease,
    stroke 300ms ease;
}

.ecosystem-visual__server {
  transition: transform 300ms ease;
}

.ecosystem-visual__server-shell {
  stroke-width: 0.3;
}

.ecosystem-visual__server-row {
  fill: rgba(94, 78, 255, 0.03);
  stroke: rgba(94, 78, 255, 0.15);
  stroke-width: 0.1;
}

.ecosystem-visual__led {
  fill: currentColor;
  opacity: 0.08;
  animation: ecosystemVisualPulse 800ms ease-in-out infinite;
  animation-play-state: paused;
}

.ecosystem-visual__server--right .ecosystem-visual__led--delay-0 {
  animation-delay: -1500ms;
}

.ecosystem-visual__server--right .ecosystem-visual__led--delay-1 {
  animation-delay: -2000ms;
}

.ecosystem-visual__server--right .ecosystem-visual__led--delay-2 {
  animation-delay: -2500ms;
}

.ecosystem-visual__server--top .ecosystem-visual__led--delay-1,
.ecosystem-visual__server--left .ecosystem-visual__led--delay-1 {
  animation-delay: -500ms;
}

.ecosystem-visual__server--top .ecosystem-visual__led--delay-2,
.ecosystem-visual__server--left .ecosystem-visual__led--delay-2 {
  animation-delay: -1000ms;
}

.ecosystem-visual__device-label {
  fill: currentColor;
  opacity: 0.3;
  font-size: 3px;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: opacity 300ms ease;
}

.ecosystem-visual__device-label--cloud {
  opacity: 0.5;
}

.ecosystem-visual__device-shell {
  stroke-width: 0.8;
}

.ecosystem-visual__device-line {
  stroke: rgba(94, 78, 255, 0.2);
  stroke-width: 0.8;
  transition: stroke 300ms ease;
}

.ecosystem-visual__device-line--muted {
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
  .ecosystem-visual__flow,
  .ecosystem-visual__map-flow,
  .ecosystem-visual__led {
    animation: none;
  }
}

@media (min-width: 640px) {
  .ecosystem-visual__stage {
    width: 65%;
  }
}
</style>
