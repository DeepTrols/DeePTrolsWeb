<script setup lang="ts">
import shapeOneSrc from '../../../doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape1.png?url'
import shapeTwoSrc from '../../../doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape2.png?url'
import shapeThreeSrc from '../../../doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ban-shape3.png?url'
import coreVisualSrc from '../../../doc/product/PAGE_REQUIREMENTS/PRODUCT/DATA/SHUYAODGP/imgs/ruizhi1.png?url'

const nodes = [
  'left-[12%] top-[22%] [animation-delay:0ms]',
  'left-[24%] top-[64%] [animation-delay:240ms]',
  'left-[42%] top-[16%] [animation-delay:480ms]',
  'left-[54%] top-[72%] [animation-delay:720ms]',
  'left-[72%] top-[28%] [animation-delay:960ms]',
  'left-[84%] top-[58%] [animation-delay:1200ms]',
  'left-[36%] top-[48%] [animation-delay:1440ms]',
  'left-[66%] top-[45%] [animation-delay:1680ms]',
]
</script>

<template>
  <figure class="relative m-0 h-[360px] w-full overflow-visible sm:h-[420px] lg:h-full">
    <div class="relative mx-auto h-full min-h-[360px] w-full max-w-[680px] overflow-visible">
      <img
        :src="shapeOneSrc"
        alt=""
        class="pointer-events-none absolute left-[8%] top-[8%] h-[46%] select-none opacity-70 mix-blend-screen motion-safe:animate-pulse"
        draggable="false"
      />
      <img
        :src="shapeTwoSrc"
        alt=""
        class="pointer-events-none absolute right-[10%] top-[12%] h-[46%] select-none opacity-65 mix-blend-screen motion-safe:animate-pulse [animation-delay:600ms]"
        draggable="false"
      />
      <img
        :src="shapeThreeSrc"
        alt=""
        class="pointer-events-none absolute bottom-[5%] left-[35%] h-[46%] select-none opacity-60 mix-blend-screen motion-safe:animate-bounce [animation-duration:5s]"
        draggable="false"
      />

      <svg
        class="absolute inset-0 h-full w-full text-dt-primary/80"
        viewBox="0 0 680 460"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dgpFlowGradient" x1="76" y1="92" x2="604" y2="360" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5e4eff" stop-opacity="0" />
            <stop offset="0.48" stop-color="#569aff" stop-opacity="0.95" />
            <stop offset="1" stop-color="#a685ff" stop-opacity="0" />
          </linearGradient>
          <filter id="dgpFlowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M88 330 C184 178 252 154 340 228 C436 310 492 160 596 94"
          stroke="url(#dgpFlowGradient)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="18 28"
          filter="url(#dgpFlowGlow)"
        >
          <animate attributeName="stroke-dashoffset" from="140" to="0" dur="4s" repeatCount="indefinite" />
        </path>
        <path
          d="M96 136 C212 244 278 290 366 210 C470 116 548 244 608 326"
          stroke="url(#dgpFlowGradient)"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-dasharray="12 22"
          filter="url(#dgpFlowGlow)"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="128" dur="4.6s" repeatCount="indefinite" />
        </path>
        <circle r="4" fill="#569aff" filter="url(#dgpFlowGlow)">
          <animateMotion dur="5.2s" repeatCount="indefinite" path="M88 330 C184 178 252 154 340 228 C436 310 492 160 596 94" />
        </circle>
        <circle r="3" fill="#a685ff" filter="url(#dgpFlowGlow)">
          <animateMotion dur="4.8s" repeatCount="indefinite" path="M96 136 C212 244 278 290 366 210 C470 116 548 244 608 326" />
        </circle>
      </svg>

      <img
        :src="coreVisualSrc"
        alt="数曜·数据治理平台数据连接视觉"
        class="pointer-events-none absolute left-1/2 top-1/2 w-[78%] max-w-[440px] -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_0_46px_rgba(86,154,255,0.36)] motion-safe:animate-pulse"
        draggable="false"
      />

      <span
        v-for="node in nodes"
        :key="node"
        class="absolute size-2 rounded-full bg-dt-secondary shadow-[0_0_22px_rgba(86,154,255,0.85)] motion-safe:animate-pulse"
        :class="node"
        aria-hidden="true"
      >
        <span class="absolute inset-[-7px] rounded-full border border-dt-secondary/30 motion-safe:animate-ping"></span>
      </span>
    </div>
  </figure>
</template>
