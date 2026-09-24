<script lang="ts" setup>
import type { SectionType } from '../sections';

import type { ComponentRegistryEntry } from '#/api/components';
import type { SectionPreset } from '#/api/presets';

import { computed, useTemplateRef } from 'vue';

import { useSortable } from '@vueuse/integrations/useSortable';

import {
  customSectionLabels,
  sectionSummary,
  sectionTypeLabels,
} from '../sections';

defineOptions({ name: 'SectionPalette' });

// 左侧面板（015.13）：标准区块 / 定制组件 / 区块模板三组，拖入右侧列表即插入（pull:'clone' 不消耗面板项）
const props = defineProps<{
  customComponents?: ComponentRegistryEntry[];
  customSectionOptions?: { label: string; value: string }[];
  presets?: SectionPreset[];
  sectionTypeOptions?: { label: string; value: SectionType }[];
}>();

const standardOptions = computed(() =>
  (props.sectionTypeOptions ?? []).filter((o) => o.value !== 'custom'),
);

const customOptions = computed(() => {
  const enabled = props.customSectionOptions;
  const entries = props.customComponents ?? [];
  const list = enabled
    ? entries.filter((e) => enabled.some((o) => o.value === e.name))
    : entries;
  return list.map((e) => ({
    description: e.description,
    label: e.label || customSectionLabels[e.name] || e.name,
    value: e.name,
  }));
});

const presetOptions = computed(() => props.presets ?? []);

const sortableGroup = {
  animation: 150,
  group: { name: 'sections', pull: 'clone' as const, put: false as const },
  sort: false,
};

const standardEl = useTemplateRef<HTMLElement>('standardEl');
const customEl = useTemplateRef<HTMLElement>('customEl');
const presetEl = useTemplateRef<HTMLElement>('presetEl');

useSortable(standardEl, [], sortableGroup);
useSortable(customEl, [], sortableGroup);
useSortable(presetEl, [], sortableGroup);

const itemClass =
  'mb-1 cursor-grab rounded border border-gray-200 bg-white px-2 py-1.5 text-sm hover:border-blue-400';
</script>

<template>
  <div class="w-56 shrink-0">
    <div class="mb-1 text-xs font-semibold text-gray-500">标准区块</div>
    <div ref="standardEl" class="mb-4">
      <div
        v-for="o in standardOptions"
        :key="o.value"
        :class="itemClass"
        :data-id="o.value"
        data-kind="standard"
      >
        {{ o.label || sectionTypeLabels[o.value] }}
      </div>
    </div>

    <div class="mb-1 text-xs font-semibold text-gray-500">定制组件</div>
    <div ref="customEl" class="mb-4">
      <div
        v-for="o in customOptions"
        :key="o.value"
        :class="itemClass"
        :data-id="o.value"
        :title="o.description"
        data-kind="custom"
      >
        {{ o.label }}
      </div>
      <div v-if="customOptions.length === 0" class="text-xs text-gray-400">
        无可用组件
      </div>
    </div>

    <div class="mb-1 text-xs font-semibold text-gray-500">区块模板</div>
    <div ref="presetEl">
      <div
        v-for="p in presetOptions"
        :key="p.id"
        :class="itemClass"
        :data-id="String(p.id)"
        :title="p.description || sectionSummary(p.section)"
        data-kind="preset"
      >
        {{ p.name }}
      </div>
      <div v-if="presetOptions.length === 0" class="text-xs text-gray-400">
        暂无模板（可在区块卡片上「存为模板」）
      </div>
    </div>
  </div>
</template>
