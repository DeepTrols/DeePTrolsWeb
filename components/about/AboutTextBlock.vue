<script setup lang="ts">
withDefaults(
  defineProps<{
    paragraphs: string[]
    align?: 'left' | 'center'
    size?: 'default' | 'large'
  }>(),
  {
    align: 'center',
    size: 'large',
  },
)
</script>

<template>
  <div
    class="about-text-block mx-auto"
    :class="[
      align === 'center' ? 'text-center' : 'text-left',
      size === 'large' ? 'max-w-5xl text-xl leading-relaxed md:text-2xl' : 'max-w-3xl text-lg leading-relaxed md:text-xl',
    ]"
  >
    <p v-for="paragraph in paragraphs" :key="paragraph" class="about-text-block__paragraph text-default">
      {{ paragraph }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.about-text-block__paragraph {
  margin: 0;
}

.about-text-block__paragraph + .about-text-block__paragraph {
  margin-top: 24px;
}
</style>
