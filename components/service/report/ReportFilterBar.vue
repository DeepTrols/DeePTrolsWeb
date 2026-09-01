<script setup lang="ts">
import { reportFilterTabs, type ReportFilterKey } from '~/data/reports'

const props = defineProps<{
  activeFilter: ReportFilterKey
  searchQuery: string
}>()

const emit = defineEmits<{
  'update:activeFilter': [value: ReportFilterKey]
  'update:searchQuery': [value: string]
}>()

const tabBaseClasses =
  'text-sm font-medium text-toned cursor-pointer whitespace-nowrap flex min-h-10 px-4 justify-center items-center rounded-full border border-solid border-accented transition-all'

function tabClasses(key: ReportFilterKey) {
  return [
    tabBaseClasses,
    key === props.activeFilter
      ? 'text-highlighted border-primary'
      : 'hover:text-highlighted hover:border-primary/60',
  ]
}

function updateSearch(event: Event) {
  emit('update:searchQuery', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div role="tablist" class="flex gap-4 flex-wrap" aria-label="资源类型筛选">
      <button
        v-for="tab in reportFilterTabs"
        :id="`report-filter-tab-${tab.key}`"
        :key="tab.key"
        type="button"
        role="tab"
        :class="tabClasses(tab.key)"
        :aria-selected="activeFilter === tab.key"
        :aria-controls="'report-resources-panel'"
        :tabindex="activeFilter === tab.key ? 0 : -1"
        @click="emit('update:activeFilter', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div data-slot="root" class="relative inline-flex items-center w-full sm:w-64">
      <input
        type="text"
        placeholder="搜索"
        data-slot="base"
        class="w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-3 py-2 text-base gap-2 text-highlighted bg-default ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ps-11"
        autocomplete="off"
        :value="searchQuery"
        @input="updateSearch"
      >
      <span data-slot="leading" class="absolute inset-y-0 start-0 flex items-center ps-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--lucide shrink-0 text-dimmed size-5"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          data-slot="leadingIcon"
        >
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="m21 21l-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>
