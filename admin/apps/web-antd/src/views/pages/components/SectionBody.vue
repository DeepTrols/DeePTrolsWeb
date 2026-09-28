<script lang="ts" setup>
import type { ComponentRegistryEntry } from '#/api/components';
import type { FeatureGridItem, PageSection } from '#/api/pages';

import { computed, ref, watch } from 'vue';

import {
  Button,
  Input,
  InputNumber,
  Select,
  Switch,
  Textarea,
} from 'ant-design-vue';

import { NAV_ICON_OPTIONS } from '#/api/menus';

import BlocksEditor from '../../content/shared/BlocksEditor.vue';
import ImageField from '../../content/shared/ImageField.vue';
import { del } from '../../menus/shared';
import {
  customSectionOptions as defaultCustomSectionOptions,
  featureGridColumnOptions,
  spacingOptions,
} from '../sections';

defineOptions({ name: 'SectionBody' });

// 组件管理（015.12）：custom 组件下拉按启停过滤；缺省回退静态全量
// 组件注册表（015.13）：customComponents 描述符驱动 custom props 动态表单
const props = defineProps<{
  customComponents?: ComponentRegistryEntry[];
  customSectionOptions?: { label: string; value: string }[];
}>();

// 单区块按 type 的字段表单：defineModel 对象字段可直接 v-model（NavColumnEditor 循环别名同一先例）
const section = defineModel<PageSection>('section', { required: true });

const customOptions = computed(
  () => props.customSectionOptions ?? defaultCustomSectionOptions,
);

/** 当前 custom 组件的注册表条目（描述符表单数据源；无条目 = 零 props 组件） */
const customEntry = computed(() => {
  const s = section.value;
  if (s.type !== 'custom') return undefined;
  return props.customComponents?.find((c) => c.name === s.name);
});

/** richText 富文本（015.13）：BlocksEditor null = 不可转换/空 → 不回写 section.blocks，红字提示 */
const richBlocks = ref<null | unknown[]>(null);
const richInvalid = computed(() => richBlocks.value === null);

/** richText 的 blocks 草稿：合法 JSON 实时落回 section.blocks，非法保留草稿继续编辑（高级逃生门） */
const blocksDraft = ref('');

// featureGrid 卡片的要点/标签草稿（受控输入的原始文本，按卡片稳定 key 隔离）
const pointsDrafts = ref<Record<number, string>>({});
const tagsDrafts = ref<Record<number, string>>({});

// 稳定 key：卡片/行删除、上下移时防组件按索引复用导致 DOM/草稿串位
// （对象身份由 WeakMap 持久化，同 SectionsEditor.keyOf 先例；admin 纯客户端，无 SSR 顾虑）
const itemKeys = new WeakMap<object, number>();
let nextItemKey = 0;
function keyOf(item: object): number {
  let key = itemKeys.get(item);
  if (key === undefined) {
    key = nextItemKey;
    nextItemKey += 1;
    itemKeys.set(item, key);
  }
  return key;
}

watch(
  () => section.value,
  (s) => {
    // 区块对象整体替换（重载/复用）：清空卡片草稿，由新数据重新播种
    pointsDrafts.value = {};
    tagsDrafts.value = {};
    if (s.type === 'richText') {
      richBlocks.value = s.blocks;
      blocksDraft.value = JSON.stringify(s.blocks, null, 2);
    }
  },
  { immediate: true },
);

watch(richBlocks, (value) => {
  // null 不回写：保留已存 blocks（防止误清空），由红字提示运营
  if (value && section.value.type === 'richText') {
    section.value.blocks = value;
  }
});

function onBlocksInput(text: string) {
  blocksDraft.value = text;
  try {
    const value = JSON.parse(text);
    if (Array.isArray(value) && section.value.type === 'richText') {
      section.value.blocks = value;
      richBlocks.value = value;
    }
  } catch {
    // JSON 未输完，保持草稿
  }
}

// featureGrid 卡片的要点/标签：受控输入（草稿按卡片稳定 key 隔离，输入即解析写回数组）。
// 草稿保留原始文本（如行尾换行、未闭合逗号），数组仅存非空项；空则清掉字段。
function pointsValue(item: FeatureGridItem): string {
  return pointsDrafts.value[keyOf(item)] ?? (item.points ?? []).join('\n');
}

function onPointsInput(item: FeatureGridItem, value: string) {
  pointsDrafts.value[keyOf(item)] = value;
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  item.points = lines.length > 0 ? lines : undefined;
}

function tagsValue(item: FeatureGridItem): string {
  return tagsDrafts.value[keyOf(item)] ?? (item.tags ?? []).join(', ');
}

function onTagsInput(item: FeatureGridItem, value: string) {
  tagsDrafts.value[keyOf(item)] = value;
  const tags = value
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  item.tags = tags.length > 0 ? tags : undefined;
}

// ---- custom props 描述符表单（015.13） ----

function customProps(): Record<string, unknown> {
  return section.value.type === 'custom' ? (section.value.props ?? {}) : {};
}

function propValue(key: string): unknown {
  return customProps()[key];
}

/** 模板内类型断言会撞 vue/no-deprecated-filter（| 误判为过滤器），值读取统一走脚本 helper */
function strProp(key: string): string | undefined {
  const value = propValue(key);
  return typeof value === 'string' ? value : undefined;
}

function numProp(key: string): number | undefined {
  const value = propValue(key);
  return typeof value === 'number' ? value : undefined;
}

function setProp(key: string, value: unknown) {
  if (section.value.type !== 'custom') return;
  section.value.props = { ...customProps(), [key]: value };
}

/** 切换组件名 → 按描述符 default 重置 props（稀疏存储；空则不挂 props 键） */
watch(
  () => (section.value.type === 'custom' ? section.value.name : undefined),
  (name, oldName) => {
    if (!name || !oldName || name === oldName) return;
    if (section.value.type !== 'custom') return;
    const entry = props.customComponents?.find((c) => c.name === name);
    const next: Record<string, unknown> = {};
    for (const field of entry?.fields ?? []) {
      if (field.default !== undefined) {
        next[field.key] = field.default;
      }
    }
    section.value.props = Object.keys(next).length > 0 ? next : undefined;
  },
);

/** json 类字段：草稿失焦 parse 写回；非法保留草稿并标红。
 * 依赖 section 身份：区块对象被替换（即使组件名相同）时草稿必须重新播种，防止旧 JSON 失焦写进新区块 */
const jsonDrafts = ref<Record<string, string>>({});
const jsonInvalid = ref<Record<string, boolean>>({});
watch(
  [customEntry, () => section.value],
  ([entry]) => {
    const drafts: Record<string, string> = {};
    for (const field of entry?.fields ?? []) {
      if (field.type === 'json') {
        drafts[field.key] = JSON.stringify(
          propValue(field.key) ?? field.default ?? null,
          null,
          2,
        );
      }
    }
    jsonDrafts.value = drafts;
    jsonInvalid.value = {};
  },
  { immediate: true },
);

function onJsonBlur(key: string) {
  const text = jsonDrafts.value[key] ?? '';
  try {
    setProp(key, JSON.parse(text));
    jsonInvalid.value[key] = false;
  } catch {
    jsonInvalid.value[key] = true;
  }
}
</script>

<template>
  <div class="grid gap-2">
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-400">间距</span>
      <Select
        v-model:value="section.spacing"
        :options="spacingOptions"
        class="w-28"
      />
    </div>
    <template v-if="section.type === 'hero'">
      <Input v-model:value="section.eyebrow" placeholder="眉题（可选）" />
      <Input v-model:value="section.title" placeholder="主标题（必填）" />
      <Textarea
        v-model:value="section.subtitle"
        :rows="2"
        placeholder="副标题（可选）"
      />
    </template>

    <template v-else-if="section.type === 'metrics'">
      <div
        v-for="(item, i) in section.items"
        :key="keyOf(item)"
        class="flex items-center gap-2"
      >
        <Input v-model:value="item.value" class="w-40" placeholder="数值" />
        <Input v-model:value="item.label" placeholder="说明" />
        <Button danger size="small" type="link" @click="del(section.items, i)">
          删除
        </Button>
      </div>
      <Button
        class="self-start"
        @click="section.items.push({ value: '', label: '' })"
      >
        新增指标
      </Button>
    </template>

    <template v-else-if="section.type === 'featureGrid'">
      <div class="flex gap-2">
        <Input v-model:value="section.eyebrow" placeholder="眉题（可选）" />
        <Input v-model:value="section.title" placeholder="标题（必填）" />
        <Select
          v-model:value="section.columns"
          :options="featureGridColumnOptions"
          class="w-28"
        />
      </div>
      <Textarea
        v-model:value="section.subtitle"
        :rows="2"
        placeholder="副标题（可选）"
      />
      <div
        v-for="(item, i) in section.items"
        :key="keyOf(item)"
        class="rounded border border-dashed border-gray-200 p-2"
      >
        <div class="mb-2 flex items-center gap-2">
          <Input v-model:value="item.title" placeholder="卡片标题" />
          <Input v-model:value="item.subtitle" placeholder="卡片副题（可选）" />
          <Select
            v-model:value="item.icon"
            allow-clear
            :options="NAV_ICON_OPTIONS"
            class="w-36"
            placeholder="图标"
          />
          <Button
            danger
            size="small"
            type="link"
            @click="del(section.items, i)"
          >
            删除
          </Button>
        </div>
        <Textarea
          v-model:value="item.description"
          :rows="2"
          placeholder="卡片描述"
        />
        <div class="mt-2 grid gap-2">
          <Textarea
            :rows="2"
            :value="pointsValue(item)"
            placeholder="要点（可选，每行一条）"
            @update:value="(v) => onPointsInput(item, v)"
          />
          <Input
            :value="tagsValue(item)"
            placeholder="标签（可选，逗号分隔）"
            @update:value="(v) => onTagsInput(item, v)"
          />
        </div>
      </div>
      <Button
        class="self-start"
        @click="section.items.push({ description: '', title: '' })"
      >
        新增卡片
      </Button>
    </template>

    <template v-else-if="section.type === 'cta'">
      <Input v-model:value="section.title" placeholder="CTA 标题（必填）" />
      <Textarea
        v-model:value="section.description"
        :rows="2"
        placeholder="描述（可选）"
      />
      <div class="flex gap-2">
        <Input v-model:value="section.ctaLabel" placeholder="按钮文案" />
        <Input v-model:value="section.ctaHref" placeholder="按钮链接" />
      </div>
    </template>

    <template v-else-if="section.type === 'richText'">
      <BlocksEditor v-model:blocks="richBlocks" />
      <div v-if="richInvalid" class="text-xs text-red-500">
        正文为空或含不可转换内容，当前修改不会写入区块（已存内容保留）
      </div>
      <details class="text-xs text-gray-400">
        <summary class="cursor-pointer">高级：直接编辑 JSON</summary>
        <Textarea
          :value="blocksDraft"
          class="mt-2 font-mono"
          :rows="8"
          @update:value="onBlocksInput"
        />
        <div class="mt-1">
          ArticleBlock[] JSON（heading / paragraph / list / quote / image /
          divider），合法 JSON 实时生效
        </div>
      </details>
    </template>

    <template v-else-if="section.type === 'logoStrip'">
      <Input v-model:value="section.title" placeholder="标题（可选）" />
      <div
        v-for="(logo, i) in section.logos"
        :key="keyOf(logo)"
        class="flex items-center gap-2"
      >
        <Input v-model:value="logo.name" class="w-44" placeholder="名称" />
        <Input v-model:value="logo.text" placeholder="文字（无图时展示）" />
        <ImageField v-model:value="logo.image" />
        <Button danger size="small" type="link" @click="del(section.logos, i)">
          删除
        </Button>
      </div>
      <Button
        class="self-start"
        @click="section.logos.push({ name: '', text: '' })"
      >
        新增 logo
      </Button>
    </template>

    <template v-else-if="section.type === 'imageBanner'">
      <ImageField v-model:value="section.src" />
      <div class="flex gap-2">
        <Input v-model:value="section.alt" placeholder="alt（必填）" />
        <Input v-model:value="section.caption" placeholder="说明文字（可选）" />
      </div>
    </template>

    <template v-else-if="section.type === 'custom'">
      <Select
        v-model:value="section.name"
        :options="customOptions"
        class="w-64"
      />
      <template v-if="customEntry && customEntry.fields.length > 0">
        <div
          v-for="field in customEntry.fields"
          :key="field.key"
          class="grid gap-1"
        >
          <span class="text-xs text-gray-400">
            {{ field.label }}{{ field.required ? '（必填）' : '' }}
          </span>
          <Input
            v-if="field.type === 'string'"
            :placeholder="field.placeholder"
            :value="strProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <Textarea
            v-else-if="field.type === 'text'"
            :placeholder="field.placeholder"
            :rows="3"
            :value="strProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <InputNumber
            v-else-if="field.type === 'number'"
            class="w-40"
            :value="numProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <Switch
            v-else-if="field.type === 'boolean'"
            :checked="Boolean(propValue(field.key))"
            @update:checked="(v) => setProp(field.key, v)"
          />
          <Select
            v-else-if="field.type === 'select'"
            class="w-48"
            :options="field.options"
            :value="strProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <ImageField
            v-else-if="field.type === 'image'"
            :value="strProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <Select
            v-else-if="field.type === 'icon'"
            allow-clear
            class="w-48"
            :options="NAV_ICON_OPTIONS"
            :value="strProp(field.key)"
            @update:value="(v) => setProp(field.key, v)"
          />
          <template v-else>
            <Textarea
              v-model:value="jsonDrafts[field.key]"
              class="font-mono"
              :placeholder="field.placeholder"
              :rows="4"
              @blur="() => onJsonBlur(field.key)"
            />
            <div v-if="jsonInvalid[field.key]" class="text-xs text-red-500">
              JSON 非法，未写入（保留草稿继续编辑）
            </div>
          </template>
        </div>
      </template>
      <div class="text-xs text-gray-400">
        {{ customEntry?.description ?? '按名嵌入定制组件' }}
      </div>
    </template>
  </div>
</template>
