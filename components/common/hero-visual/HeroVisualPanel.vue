<script setup lang="ts">
defineProps<{
  panelClass?: string
}>()
</script>

<template>
  <div class="hero-visual-panel" :class="panelClass">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.hero-visual-panel {
  position: relative;
}
</style>
