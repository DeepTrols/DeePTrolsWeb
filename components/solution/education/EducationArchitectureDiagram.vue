<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import zhiyaoLogo from '~/assets/images/brand/zhiyao-logo.svg?url'
import { educationDiagram } from '~/data/solutions/education'

// 架构图画布：宽 760 设计单位按容器宽等比缩放；高随左列拉伸，但被限制在 [MIN, MAX] 区间内，
// 防止窄屏时左列文字换行变高导致画布被过度拉长（间距爆炸）或超宽屏时元素重叠。
// 行位置由固定高度 + 最小间距 + 剩余空间按权重分配计算，间距自动且受控地拉开。
const DIAGRAM_DESIGN_WIDTH = 760
const DIAGRAM_FALLBACK_HEIGHT = 640
const DIAGRAM_MIN_HEIGHT = 624
const DIAGRAM_MAX_HEIGHT = 880
const DIAGRAM_FIXED = { topPad: 8, entries: 64, sideRow: 64, cube: 160, panel: 90, gap1: 48, gap2: 40, gap3: 40, gap4: 44 }
const DIAGRAM_GAP_WEIGHTS = [0.3, 0.25, 0.25, 0.2] as const

const diagramWrapEl = ref<HTMLElement | null>(null)
const diagramMetrics = ref<{ height: number, scale: number, offsetX: number, offsetY: number } | null>(null)

const diagramHeight = computed(() => diagramMetrics.value?.height ?? DIAGRAM_FALLBACK_HEIGHT)

const diagramCanvasStyle = computed(() =>
  diagramMetrics.value
    ? {
        height: `${diagramMetrics.value.height}px`,
        transform: `scale(${diagramMetrics.value.scale})`,
        left: `${diagramMetrics.value.offsetX}px`,
        top: `${diagramMetrics.value.offsetY}px`,
      }
    : {
        height: `${DIAGRAM_FALLBACK_HEIGHT}px`,
        transform: `scale(calc(100cqw / ${DIAGRAM_DESIGN_WIDTH}px))`,
        left: '0px',
        top: '0px',
      },
)

const diagramLayout = computed(() => {
  const surplus = Math.max(0, diagramHeight.value - DIAGRAM_MIN_HEIGHT)
  const entriesTop = DIAGRAM_FIXED.topPad
  const topRowTop = entriesTop + DIAGRAM_FIXED.entries + DIAGRAM_FIXED.gap1 + surplus * DIAGRAM_GAP_WEIGHTS[0]
  const cubeTop = topRowTop + DIAGRAM_FIXED.sideRow + DIAGRAM_FIXED.gap2 + surplus * DIAGRAM_GAP_WEIGHTS[1]
  const bottomRowTop = cubeTop + DIAGRAM_FIXED.cube + DIAGRAM_FIXED.gap3 + surplus * DIAGRAM_GAP_WEIGHTS[2]
  return { entriesTop, topRowTop, cubeTop, bottomRowTop }
})

const diagramLines = computed(() => {
  const { entriesTop, topRowTop, cubeTop, bottomRowTop } = diagramLayout.value
  const cubeY = cubeTop + DIAGRAM_FIXED.cube / 2
  const panelTop = diagramHeight.value - DIAGRAM_FIXED.panel
  return [
    [380, entriesTop + DIAGRAM_FIXED.entries + 4, 380, cubeTop - 20],
    [284, topRowTop + 32, 320, cubeY - 30],
    [476, topRowTop + 32, 440, cubeY - 30],
    [284, bottomRowTop + 32, 320, cubeY + 30],
    [476, bottomRowTop + 32, 440, cubeY + 30],
    [380, cubeY + 104, 380, panelTop - 4],
  ]
})

let diagramObserver: ResizeObserver | null = null

function syncDiagramMetrics() {
  const width = diagramWrapEl.value?.clientWidth ?? 0
  const height = diagramWrapEl.value?.clientHeight ?? 0
  if (!width || !height) {
    return
  }

  let scale = width / DIAGRAM_DESIGN_WIDTH
  let designHeight = height / scale
  if (designHeight < DIAGRAM_MIN_HEIGHT) {
    // 高度受限（超宽屏）：按高缩放，画布水平居中，避免元素重叠
    scale = height / DIAGRAM_MIN_HEIGHT
    designHeight = DIAGRAM_MIN_HEIGHT
  }
  else if (designHeight > DIAGRAM_MAX_HEIGHT) {
    // 高度过剩（窄屏）：封顶，画布贴底，多余空间留在标题下方，避免间距被无限拉大
    designHeight = DIAGRAM_MAX_HEIGHT
  }

  diagramMetrics.value = {
    height: Math.round(designHeight),
    scale,
    offsetX: Math.max(0, (width - DIAGRAM_DESIGN_WIDTH * scale) / 2),
    offsetY: Math.max(0, height - designHeight * scale),
  }
}

onMounted(() => {
  syncDiagramMetrics()
  if (!diagramWrapEl.value || typeof ResizeObserver === 'undefined') {
    return
  }

  diagramObserver = new ResizeObserver(syncDiagramMetrics)
  diagramObserver.observe(diagramWrapEl.value)
})

onBeforeUnmount(() => {
  diagramObserver?.disconnect()
  diagramObserver = null
})
</script>

<template>
  <div
    ref="diagramWrapEl"
    class="relative mt-4 aspect-[760/624] w-full flex-none overflow-hidden @container xl:aspect-auto xl:min-h-0 xl:flex-1"
  >
    <div class="absolute w-[760px] origin-top-left" :style="diagramCanvasStyle">
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/8 via-fuchsia-500/6 to-blue-500/8 blur-3xl"
        ></div>
      </div>
      <svg class="pointer-events-none absolute inset-0 h-full w-full" :viewBox="`0 0 760 ${diagramHeight}`" aria-hidden="true">
        <defs>
          <linearGradient id="educationHubLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35" />
            <stop offset="50%" stop-color="var(--color-primary)" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.35" />
          </linearGradient>
          <filter id="educationLineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line
          v-for="line in diagramLines"
          :key="line.join('-')"
          :x1="line[0]"
          :y1="line[1]"
          :x2="line[2]"
          :y2="line[3]"
          stroke="url(#educationHubLine)"
          stroke-width="1.5"
          stroke-dasharray="4 6"
          filter="url(#educationLineGlow)"
        >
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
        </line>
      </svg>

      <!-- 顶部：用户与应用入口 -->
      <div class="absolute left-1/2 flex -translate-x-1/2 items-center gap-4" :style="{ top: `${diagramLayout.entriesTop}px` }">
        <span
          v-for="entry in educationDiagram.entries"
          :key="entry.name"
          class="flex h-[64px] w-[236px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 text-[14px] font-semibold text-highlighted shadow-sm backdrop-blur-xl"
        >
          <component :is="entry.icon" class="size-6 shrink-0 text-muted" />
          <span class="flex flex-col">
            <span class="text-[14px] font-semibold leading-tight whitespace-nowrap text-highlighted">{{ entry.name }}</span>
            <span class="text-[12px] font-semibold leading-tight whitespace-nowrap text-muted">{{ entry.label }}</span>
          </span>
        </span>
      </div>

      <!-- 左侧能力块 -->
      <div class="absolute left-0" :style="{ top: `${diagramLayout.topRowTop}px` }">
        <div class="flex h-[64px] w-[268px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 shadow-sm backdrop-blur-xl">
          <component :is="educationDiagram.leftTop.icon" class="size-6 shrink-0 text-muted" />
          <span class="text-[15px] font-semibold whitespace-nowrap text-highlighted">{{ educationDiagram.leftTop.title }}</span>
        </div>
      </div>
      <div class="absolute left-0" :style="{ top: `${diagramLayout.bottomRowTop}px` }">
        <div class="flex h-[64px] w-[268px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 shadow-sm backdrop-blur-xl">
          <component :is="educationDiagram.leftBottom.icon" class="size-6 shrink-0 text-muted" />
          <span class="text-[15px] font-semibold whitespace-nowrap text-highlighted">{{ educationDiagram.leftBottom.title }}</span>
        </div>
      </div>

      <!-- 右侧能力块 -->
      <div class="absolute right-0" :style="{ top: `${diagramLayout.topRowTop}px` }">
        <div class="flex h-[64px] w-[268px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 shadow-sm backdrop-blur-xl">
          <component :is="educationDiagram.rightTop.icon" class="size-6 shrink-0 text-muted" />
          <span class="text-[15px] font-semibold whitespace-nowrap text-highlighted">{{ educationDiagram.rightTop.title }}</span>
        </div>
      </div>
      <div class="absolute right-0" :style="{ top: `${diagramLayout.bottomRowTop}px` }">
        <div class="flex h-[64px] w-[268px] items-center gap-3 rounded-2xl border border-default bg-default px-4 py-2.5 shadow-sm backdrop-blur-xl">
          <component :is="educationDiagram.rightBottom.icon" class="size-6 shrink-0 text-muted" />
          <span class="text-[15px] font-semibold whitespace-nowrap text-highlighted">{{ educationDiagram.rightBottom.title }}</span>
        </div>
      </div>

      <!-- 中央立体方块：智曜·AgentOS -->
      <div class="absolute left-1/2 -translate-x-1/2" :style="{ top: `${diagramLayout.cubeTop}px` }">
        <div class="relative h-[160px] w-[160px]">
          <div class="animate-platform-float">
            <div class="[perspective:900px]">
              <div class="relative [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
                <div class="absolute h-[150px] w-[150px] border border-primary/25 bg-default [transform:translateZ(-15px)]"></div>
                <div class="absolute h-[150px] w-[150px] border border-primary/20 bg-default [transform:translateZ(-16px)]"></div>
                <div class="relative h-[150px] w-[150px] overflow-hidden border border-primary/50 bg-muted [transform:translateZ(14px)]">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/10 to-blue-400/15"></div>
                  <div
                    class="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(135deg,var(--color-primary)_1px,transparent_1px),linear-gradient(225deg,var(--color-primary)_1px,transparent_1px)] [background-size:26px_26px]"
                  ></div>
                  <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <img :src="zhiyaoLogo" class="mb-2 size-7" alt="" />
                    <div class="text-[13px] font-semibold whitespace-nowrap text-highlighted">{{ educationDiagram.center.name }}</div>
                    <div class="mt-1 text-[12px] font-semibold whitespace-nowrap text-muted">{{ educationDiagram.center.caption }}</div>
                  </div>
                </div>
                <div
                  class="absolute left-0 top-0 h-[150px] w-[28px] origin-left border border-primary/30 bg-default [transform:rotateY(-90deg)_translateX(-14px)]"
                ></div>
                <div
                  class="absolute bottom-0 left-0 h-[28px] w-[150px] origin-bottom border-x border-primary/30 bg-default [transform:rotateX(90deg)_translateY(14px)]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部：基础能力（bottom-0 贴画布底边，与左侧卡片底边对齐） -->
      <div class="absolute bottom-0 left-1/2 w-[620px] -translate-x-1/2">
        <div class="rounded-3xl border border-default bg-white/95 px-[0.3rem] py-5 shadow-sm backdrop-blur-xl">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="foundation in educationDiagram.foundations"
              :key="foundation.label"
              class="flex items-center justify-center gap-2.5 px-2 py-1 text-[16px] font-semibold whitespace-nowrap text-muted"
            >
              <component :is="foundation.icon" class="size-10" />
              {{ foundation.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
