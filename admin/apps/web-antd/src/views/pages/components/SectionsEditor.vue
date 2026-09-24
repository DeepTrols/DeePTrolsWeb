<script lang="ts" setup>
import type { SectionType } from '../sections';

import type { ComponentRegistryEntry } from '#/api/components';
import type { PageSection } from '#/api/pages';
import type { SectionPreset } from '#/api/presets';

import { computed, ref, toRaw, useTemplateRef, watch } from 'vue';

import { useSortable } from '@vueuse/integrations/useSortable';
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Select,
  Switch,
  Tag,
  Textarea,
} from 'ant-design-vue';

import { createPresetApi } from '#/api/presets';

import { del, moveItem } from '../../menus/shared';
import {
  createCustomSection,
  createSection,
  sectionTypeOptions as defaultSectionTypeOptions,
  sectionSummary,
  sectionTypeLabels,
} from '../sections';
import SectionBody from './SectionBody.vue';
import SectionPalette from './SectionPalette.vue';

defineOptions({ name: 'SectionsEditor' });

// 组件管理（015.12）：父级传入按启停过滤后的选项；缺省回退静态全量
// 拖拽编辑器（015.13）：customComponents 描述符驱动 props 表单；presets 供模板拖入
const props = defineProps<{
  customComponents?: ComponentRegistryEntry[];
  customSectionOptions?: { label: string; value: string }[];
  presets?: SectionPreset[];
  sectionTypeOptions?: { label: string; value: SectionType }[];
}>();

const emit = defineEmits<{ presetSaved: [] }>();

// 结构化区块编辑器：数组顺序即展示顺序，拖拽/上下移排序
const sections = defineModel<PageSection[]>('sections', { required: true });

const typeOptions = computed(
  () => props.sectionTypeOptions ?? defaultSectionTypeOptions,
);

// 稳定 key：拖拽重排时防 DOM 错位（对象身份由 WeakMap 持久化）
const sectionKeys = new WeakMap<PageSection, number>();
let nextKey = 0;
function keyOf(s: PageSection): number {
  let key = sectionKeys.get(s);
  if (key === undefined) {
    key = nextKey;
    nextKey += 1;
    sectionKeys.set(s, key);
  }
  return key;
}

// 折叠：本地状态（key 集合），v-show 切换不销毁表单
const collapsed = ref(new Set<number>());
function toggleCollapse(s: PageSection) {
  const key = keyOf(s);
  const next = new Set(collapsed.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  collapsed.value = next;
}

function duplicate(i: number) {
  const source = sections.value[i];
  if (!source) return;
  sections.value.splice(i + 1, 0, structuredClone(toRaw(source)));
}

// 拖拽排序 + 面板拖入（clone 项读 dataset 转成新区块，DOM 克隆体移除由 Vue 按 model 重绘）
const listEl = useTemplateRef<HTMLElement>('listEl');
useSortable(listEl, sections, {
  animation: 150,
  group: { name: 'sections' },
  handle: '.drag-handle',
  onAdd(evt) {
    const { kind, id } = evt.item.dataset;
    evt.item.remove();
    const index = evt.newIndex ?? sections.value.length;
    let created: PageSection | undefined;
    if (kind === 'standard' && id) {
      created = createSection(id as SectionType);
    } else if (kind === 'custom' && id) {
      const entry = props.customComponents?.find((c) => c.name === id);
      created = createCustomSection(id, entry?.fields);
    } else if (kind === 'preset' && id) {
      const preset = props.presets?.find((p) => String(p.id) === id);
      if (preset) {
        created = structuredClone(toRaw(preset.section));
      }
    }
    if (created) {
      sections.value.splice(index, 0, created);
    }
  },
});

// 存为模板：快照当前区块 → Modal 收集名称/描述 → 入库后通知父级刷新模板列表
const presetModalOpen = ref(false);
const presetSaving = ref(false);
const presetName = ref('');
const presetDescription = ref('');
const presetSource = ref<null | PageSection>(null);

function openPresetModal(s: PageSection) {
  presetSource.value = s;
  presetName.value = '';
  presetDescription.value = '';
  presetModalOpen.value = true;
}

async function savePreset() {
  const source = presetSource.value;
  const name = presetName.value.trim();
  if (!source || !name || presetSaving.value) return;
  presetSaving.value = true;
  try {
    await createPresetApi({
      description: presetDescription.value.trim(),
      name,
      section: structuredClone(toRaw(source)),
    });
    presetModalOpen.value = false;
    emit('presetSaved');
  } finally {
    presetSaving.value = false;
  }
}

// 无拖拽环境 fallback：底部 Select + 新增区块按钮
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
  <div class="flex items-start gap-4">
    <SectionPalette
      :custom-components="customComponents"
      :custom-section-options="customSectionOptions"
      :presets="presets"
      :section-type-options="typeOptions"
    />
    <div class="min-w-0 flex-1">
      <div ref="listEl">
        <div
          v-for="(s, i) in sections"
          :key="keyOf(s)"
          class="mb-3 rounded border border-gray-200 p-3"
        >
          <div class="mb-2 flex items-center gap-2">
            <span
              class="drag-handle cursor-grab select-none px-1 text-gray-400"
              title="拖拽排序"
            >
              ⠿
            </span>
            <Tag color="blue">{{ sectionTypeLabels[s.type] }}</Tag>
            <span class="flex-1 truncate text-sm text-gray-500">
              {{ sectionSummary(s) }}
            </span>
            <Switch v-model:checked="s.visible" size="small" />
            <Button size="small" type="link" @click="toggleCollapse(s)">
              {{ collapsed.has(keyOf(s)) ? '展开' : '折叠' }}
            </Button>
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
            <Button size="small" type="link" @click="duplicate(i)">
              复制
            </Button>
            <Button size="small" type="link" @click="openPresetModal(s)">
              存为模板
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
          <div v-show="!collapsed.has(keyOf(s))">
            <SectionBody
              :custom-components="customComponents"
              :custom-section-options="customSectionOptions"
              :section="s"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Select v-model:value="newType" :options="typeOptions" class="w-40" />
        <Button @click="add">新增区块</Button>
      </div>
    </div>

    <Modal
      v-model:open="presetModalOpen"
      :confirm-loading="presetSaving"
      ok-text="保存"
      title="存为区块模板"
      @ok="savePreset"
    >
      <div class="grid gap-2 pt-2">
        <Input v-model:value="presetName" placeholder="模板名称（必填）" />
        <Textarea
          v-model:value="presetDescription"
          placeholder="描述（可选）"
          :rows="2"
        />
      </div>
    </Modal>
  </div>
</template>
