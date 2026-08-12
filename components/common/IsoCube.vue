<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'lg' | 'sm'
    float?: boolean
  }>(),
  {
    size: 'lg',
    float: true,
  },
)
</script>

<template>
  <div class="iso-cube-wrap" :class="float && 'animate-iso-float'">
    <div class="iso-cube" :class="`iso-cube--${size}`" aria-hidden="true">
      <div class="iso-cube__inner">
        <div class="iso-cube__layer iso-cube__layer--shadow-2 border-primary/15 bg-muted"></div>
        <div class="iso-cube__layer iso-cube__layer--shadow-1 border-primary/20 bg-muted"></div>
        <div class="iso-cube__layer iso-cube__layer--top border-primary/40 bg-elevated">
          <div class="iso-cube__icon bg-primary/12">
            <slot />
          </div>
        </div>
        <div class="iso-cube__side iso-cube__side--left border-primary/25 bg-muted"></div>
        <div class="iso-cube__side iso-cube__side--front border-primary/25 bg-elevated/50"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iso-cube-wrap {
  display: inline-flex;
}

.iso-cube {
  --iso-size: 120px;
  --iso-depth: 20px;
  --iso-radius: 22px;

  width: var(--iso-size);
  height: var(--iso-size);
  transform: rotateX(58deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.iso-cube--sm {
  --iso-size: 92px;
  --iso-depth: 14px;
  --iso-radius: 16px;
}

.iso-cube__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.iso-cube__layer {
  position: absolute;
  inset: 0;
  border-width: 1px;
  border-radius: var(--iso-radius);
}

.iso-cube__layer--shadow-2 {
  transform: translateZ(calc(var(--iso-depth) * -1));
}

.iso-cube__layer--shadow-1 {
  transform: translateZ(calc(var(--iso-depth) * -0.5));
}

.iso-cube__icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--iso-radius);
}

.iso-cube__side {
  position: absolute;
  border-width: 1px;
  border-radius: 6px;
}

.iso-cube__side--left {
  top: 0;
  left: 0;
  width: var(--iso-depth);
  height: 100%;
  transform: rotateY(90deg);
  transform-origin: left center;
}

.iso-cube__side--front {
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--iso-depth);
  transform: rotateX(90deg);
  transform-origin: center bottom;
}
</style>
