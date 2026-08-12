<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'lg' | 'sm'
  }>(),
  {
    size: 'lg',
  },
)
</script>

<template>
  <div class="iso-cube">
    <div class="iso-cube__inner" :class="`iso-cube__inner--${size}`" aria-hidden="true">
      <div class="iso-cube__layer iso-cube__layer--shadow-2 border-primary/15 bg-muted"></div>
      <div class="iso-cube__layer iso-cube__layer--shadow-1 border-primary/20 bg-muted"></div>
      <div class="iso-cube__layer iso-cube__layer--top border-primary/40 bg-elevated">
        <div class="iso-cube__icon bg-primary/12">
          <slot />
        </div>
      </div>
      <div class="iso-cube__side iso-cube__side--left border-primary/25 bg-muted"></div>
      <div class="iso-cube__side iso-cube__side--front border-x-primary/25 bg-elevated/50"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iso-cube {
  display: inline-flex;
  perspective: 800px;
}

.iso-cube__inner {
  position: relative;
  transform: rotateX(55deg) rotate(-45deg);
  transform-style: preserve-3d;
}

.iso-cube__layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-width: 1px;
}

.iso-cube__layer--shadow-2 {
  transform: translateZ(-10px);
}

.iso-cube__layer--shadow-1 {
  transform: translateZ(-5px);
}

.iso-cube__layer--top {
  position: relative;
  width: 90px;
  height: 90px;
  transform: translateZ(10px);
}

.iso-cube__inner--sm .iso-cube__layer--shadow-2 {
  transform: translateZ(-8px);
}

.iso-cube__inner--sm .iso-cube__layer--shadow-1 {
  transform: translateZ(-4px);
}

.iso-cube__inner--sm .iso-cube__layer--top {
  width: 70px;
  height: 70px;
  transform: translateZ(8px);
}

.iso-cube__icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iso-cube__side {
  position: absolute;
  border-width: 1px;
}

.iso-cube__side--left {
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  transform: rotateY(-90deg) translate(-10px);
  transform-origin: left;
}

.iso-cube__side--front {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  transform: rotateX(90deg) translateY(10px);
  transform-origin: bottom;
}

.iso-cube__inner--sm .iso-cube__side--left {
  width: 16px;
  transform: rotateY(-90deg) translate(-8px);
}

.iso-cube__inner--sm .iso-cube__side--front {
  height: 16px;
  transform: rotateX(90deg) translateY(8px);
}
</style>
