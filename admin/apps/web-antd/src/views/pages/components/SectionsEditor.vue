<script lang="ts" setup>
import type { SectionType } from '../sections';

import type { PageSection } from '#/api/pages';

import { computed, ref, watch } from 'vue';

import { Button, Popconfirm, Select, Switch, Tag } from 'ant-design-vue';

import { del, moveItem } from '../../menus/shared';
import {
  createSection,
  sectionTypeOptions as defaultSectionTypeOptions,
  sectionSummary,
  sectionTypeLabels,
} from '../sections';
import SectionBody from './SectionBody.vue';

defineOptions({ name: 'SectionsEditor' });

// 组件管理（015.12）：父级传入按启停过滤后的选项；缺省回退静态全量
const props = defineProps<{
  customSectionOptions?: { label: string; value: string }[];
  sectionTypeOptions?: { label: string; value: SectionType }[];
}>();

// 结构化区块编辑器：数组顺序即展示顺序，上下移排序（与菜单编辑器同一先例）
const sections = defineModel<PageSection[]>('sections', { required: true });

const typeOptions = computed(
  () => props.sectionTypeOptions ?? defaultSectionTypeOptions,
);

const newType = ref<SectionType>('richText');
watch(
  typeOptions,
  (options) => {
    const first = options[0];
    if (first && !options.some((o) => o.value === newType.value)) {
      newType.value = first.value;
    }
  },
  { immediate: true },
);

function add() {
  sections.value.push(createSection(newType.value));
}
</script>

<template>
  <div>
    <div
      v-for="(s, i) in sections"
      :key="i"
      class="mb-3 rounded border border-gray-200 p-3"
    >
      <div class="mb-2 flex items-center gap-2">
        <Tag color="blue">{{ sectionTypeLabels[s.type] }}</Tag>
        <span class="flex-1 truncate text-sm text-gray-500">
          {{ sectionSummary(s) }}
        </span>
        <Switch v-model:checked="s.visible" size="small" />
        <Button
          :disabled="i === 0"
          size="small"
          type="link"
          @click="moveItem(sections, i, -1)"
        >
          上移
        </Button>
        <Button
          :disabled="i === sections.length - 1"
          size="small"
          type="link"
          @click="moveItem(sections, i, 1)"
        >
          下移
        </Button>
        <Popconfirm
          cancel-text="取消"
          ok-text="删除"
          title="删除该区块？"
          @confirm="del(sections, i)"
        >
          <Button danger size="small" type="link">删除</Button>
        </Popconfirm>
      </div>
      <SectionBody
        :custom-section-options="customSectionOptions"
        :section="s"
      />
    </div>
    <div class="flex items-center gap-2">
      <Select v-model:value="newType" :options="typeOptions" class="w-40" />
      <Button @click="add">新增区块</Button>
    </div>
  </div>
</template>
