<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'lg' | 'sm'
    palette?: 'violet' | 'blue' | 'hub'
  }>(),
  {
    size: 'lg',
    palette: 'violet',
  },
)

const sizeClasses = {
  lg: {
    top: 'h-[90px] w-[90px] [transform:translateZ(10px)]',
    shadow2: '[transform:translateZ(-10px)]',
    shadow1: '[transform:translateZ(-5px)]',
    sideLeft: 'w-[20px] [transform:rotateY(-90deg)_translateX(-10px)]',
    sideFront: 'h-[20px] [transform:rotateX(90deg)_translateY(10px)]',
  },
  sm: {
    top: 'h-[70px] w-[70px] [transform:translateZ(8px)]',
    shadow2: '[transform:translateZ(-8px)]',
    shadow1: '[transform:translateZ(-4px)]',
    sideLeft: 'w-[16px] [transform:rotateY(-90deg)_translateX(-8px)]',
    sideFront: 'h-[16px] [transform:rotateX(90deg)_translateY(8px)]',
  },
}

const paletteClasses = {
  violet: {
    shadow2: 'border-violet-500/20',
    shadow1: 'border-violet-500/25',
    top: 'border-default',
    face: 'bg-elevated',
    sideLeft: 'border-violet-500/30',
    sideFront: 'border-x-violet-500/30',
  },
  blue: {
    shadow2: 'border-blue-500/20',
    shadow1: 'border-blue-500/25',
    top: 'border-default',
    face: 'bg-elevated',
    sideLeft: 'border-blue-500/30',
    sideFront: 'border-x-blue-500/30',
  },
  hub: {
    shadow2: 'border-violet-500/15',
    shadow1: 'border-violet-500/20',
    top: 'border-violet-500/40',
    face: 'bg-gradient-to-br from-violet-500/15 to-blue-500/15',
    sideLeft: 'border-violet-500/30',
    sideFront: 'border-x-violet-500/30',
  },
}
</script>

<template>
  <div class="inline-flex [perspective:800px]" aria-hidden="true">
    <div class="relative [transform:rotateX(55deg)_rotate(-45deg)] [transform-style:preserve-3d]">
      <div
        class="absolute inset-0 overflow-hidden border bg-muted"
        :class="[sizeClasses[props.size].shadow2, paletteClasses[props.palette].shadow2]"
      ></div>
      <div
        class="absolute inset-0 overflow-hidden border bg-muted"
        :class="[sizeClasses[props.size].shadow1, paletteClasses[props.palette].shadow1]"
      ></div>
      <div
        class="relative overflow-hidden border"
        :class="[sizeClasses[props.size].top, paletteClasses[props.palette].top]"
      >
        <div
          class="absolute inset-0 flex items-center justify-center"
          :class="paletteClasses[props.palette].face"
        >
          <slot />
        </div>
      </div>
      <div
        class="absolute top-0 left-0 h-full origin-left border bg-muted"
        :class="[sizeClasses[props.size].sideLeft, paletteClasses[props.palette].sideLeft]"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full origin-bottom border-x bg-dt-bg-elevated/50"
        :class="[sizeClasses[props.size].sideFront, paletteClasses[props.palette].sideFront]"
      ></div>
    </div>
  </div>
</template>
