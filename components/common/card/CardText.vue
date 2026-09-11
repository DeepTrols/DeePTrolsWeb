<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    description?: string
    points?: string[]
    titleId?: string
    titleSize?: 'sm' | 'md' | 'lg'
    descriptionSize?: 'sm' | 'md' | 'lg'
    align?: 'left' | 'center' | 'right'
  }>(),
  {
    title: undefined,
    subtitle: undefined,
    description: undefined,
    points: undefined,
    titleId: undefined,
    titleSize: 'md',
    descriptionSize: 'md',
    align: 'left',
  },
)
</script>

<template>
  <div class="card-text" :class="[`card-text--${align}`, `card-text--title-${titleSize}`, `card-text--description-${descriptionSize}`]">
    <h3 v-if="title" :id="titleId" class="card-text__title">{{ title }}</h3>
    <p v-if="subtitle" class="m-0 mt-1.5 text-sm font-medium leading-relaxed text-primary">{{ subtitle }}</p>
    <ul v-if="points?.length" class="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0">
      <li
        v-for="point in points"
        :key="point"
        class="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-current before:content-['']"
      >
        {{ point }}
      </li>
    </ul>
    <p v-if="description" class="card-text__description">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card-text--center {
  text-align: center;
}

.card-text--right {
  text-align: right;
}

.card-text__title {
  margin: 0;
  color: var(--dt-color-text-highlighted);
  letter-spacing: 0;
}

.card-text--title-sm .card-text__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
}

.card-text--title-md .card-text__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
}

.card-text--title-lg .card-text__title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
}

.card-text__description {
  margin: 10px 0 0;
  color: var(--dt-color-text-muted);
}

.card-text--description-sm .card-text__description {
  font-size: 14px;
  line-height: 1.625;
}

.card-text--description-md .card-text__description {
  font-size: 15px;
  line-height: 27px;
}

.card-text--description-lg .card-text__description {
  font-size: 16px;
  line-height: 28px;
}
</style>
