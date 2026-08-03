<script setup lang="ts">
import { computed } from 'vue'

export interface BaseTabItem {
  key: string
  label: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    items: BaseTabItem[]
    idPrefix: string
    label: string
    variant?: 'pill' | 'segmented' | 'underline'
    panelIdPrefix?: string
  }>(),
  {
    variant: 'pill',
    panelIdPrefix: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const panelPrefix = computed(() => props.panelIdPrefix ?? `${props.idPrefix}-panel`)
const listClasses = computed(() => {
  if (props.variant === 'segmented') {
    return 'dt-segmented-tabs'
  }

  if (props.variant === 'underline') {
    return 'scrollbar-hide group relative -mb-px flex w-full justify-start overflow-x-auto overflow-y-hidden border-b border-dt-line p-1 md:justify-center'
  }

  return 'dt-tab-list'
})

function triggerClasses(key: string) {
  if (props.variant === 'segmented') {
    return 'dt-segmented-tab'
  }

  if (props.variant === 'underline') {
    return [
      'group relative inline-flex min-w-0 flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-5 py-4 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dt-primary disabled:cursor-not-allowed disabled:opacity-75 data-[state=active]:text-dt-text-highlighted',
      key === props.modelValue ? 'text-dt-text-highlighted' : 'text-dt-text-muted hover:text-dt-text-highlighted',
    ]
  }

  return 'dt-tab'
}

function selectTab(key: string) {
  emit('update:modelValue', key)
}

function moveSelection(direction: 'previous' | 'next' | 'first' | 'last') {
  const currentIndex = props.items.findIndex((item) => item.key === props.modelValue)
  const fallbackIndex = currentIndex === -1 ? 0 : currentIndex
  const nextIndex =
    direction === 'first'
      ? 0
      : direction === 'last'
        ? props.items.length - 1
        : direction === 'next'
          ? (fallbackIndex + 1) % props.items.length
          : (fallbackIndex - 1 + props.items.length) % props.items.length

  const nextItem = props.items[nextIndex]

  if (nextItem) {
    selectTab(nextItem.key)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    moveSelection('next')
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    moveSelection('previous')
  } else if (event.key === 'Home') {
    event.preventDefault()
    moveSelection('first')
  } else if (event.key === 'End') {
    event.preventDefault()
    moveSelection('last')
  }
}
</script>

<template>
  <div data-slot="root" class="base-tabs" :class="`base-tabs--${variant}`" data-orientation="horizontal">
    <div
      data-slot="list"
      :class="listClasses"
      tabindex="0"
      data-orientation="horizontal"
      dir="ltr"
      role="tablist"
      aria-orientation="horizontal"
      :aria-label="label"
      @keydown="handleKeydown"
    >
      <button
        v-for="item in items"
        :id="`${idPrefix}-tab-${item.key}`"
        :key="item.key"
        data-slot="trigger"
        data-orientation="horizontal"
        role="tab"
        type="button"
        :class="triggerClasses(item.key)"
        :tabindex="modelValue === item.key ? 0 : -1"
        :aria-selected="modelValue === item.key"
        :aria-controls="`${panelPrefix}-${item.key}`"
        :data-state="modelValue === item.key ? 'active' : 'inactive'"
        :data-active="modelValue === item.key ? '' : undefined"
        @click="selectTab(item.key)"
      >
        <span
          v-if="variant === 'underline' && modelValue === item.key"
          data-slot="indicator"
          class="absolute inset-x-5 -bottom-px h-1 rounded-full bg-dt-primary transition-all duration-200"
          aria-hidden="true"
        ></span>
        <span data-slot="label" class="truncate">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>
