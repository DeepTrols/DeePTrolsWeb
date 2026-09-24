<script lang="ts" setup>
import type { FeatureGridItem, PageSection } from '#/api/pages';

import { computed, ref, watch } from 'vue';

import { Button, Input, Select, Textarea } from 'ant-design-vue';

import { NAV_ICON_OPTIONS } from '#/api/menus';

import ImageField from '../../content/shared/ImageField.vue';
import { del } from '../../menus/shared';
import {
  customSectionOptions as defaultCustomSectionOptions,
  featureGridColumnOptions,
  spacingOptions,
} from '../sections';

defineOptions({ name: 'SectionBody' });

// 组件管理（015.12）：custom 组件下拉按启停过滤；缺省回退静态全量
const props = defineProps<{
  customSectionOptions?: { label: string; value: string }[];
}>();

// 单区块按 type 的字段表单：defineModel 对象字段可直接 v-model（NavColumnEditor 循环别名同一先例）
const section = defineModel<PageSection>('section', { required: true });

const customOptions = computed(
  () => props.customSectionOptions ?? defaultCustomSectionOptions,
);

/** richText 的 blocks 草稿：合法 JSON 实时落回 section.blocks，非法保留草稿继续编辑 */
const blocksDraft = ref('');
watch(
  () => section.value,
  (s) => {
    if (s.type === 'richText') {
      blocksDraft.value = JSON.stringify(s.blocks, null, 2);
    }
  },
  { immediate: true },
);

function onBlocksInput(text: string) {
  blocksDraft.value = text;
  try {
    const value = JSON.parse(text);
    if (Array.isArray(value) && section.value.type === 'richText') {
      section.value.blocks = value;
    }
  } catch {
    // JSON 未输完，保持草稿
  }
}

// featureGrid 卡片的要点/标签：多行/逗号分隔文本 ↔ 数组，失焦时写回（空则清掉字段）
function onPointsChange(item: FeatureGridItem, event: Event) {
  const target = event.target as HTMLTextAreaElement | null;
  const lines = (target?.value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  item.points = lines.length > 0 ? lines : undefined;
}

function onTagsChange(item: FeatureGridItem, event: Event) {
  const target = event.target as HTMLInputElement | null;
  const tags = (target?.value ?? '')
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  item.tags = tags.length > 0 ? tags : undefined;
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
        :key="i"
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
        :key="i"
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
            :default-value="(item.points ?? []).join('\n')"
            :rows="2"
            placeholder="要点（可选，每行一条，失焦生效）"
            @change="(e) => onPointsChange(item, e)"
          />
          <Input
            :default-value="(item.tags ?? []).join(', ')"
            placeholder="标签（可选，逗号分隔，失焦生效）"
            @change="(e) => onTagsChange(item, e)"
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
      <Textarea
        :value="blocksDraft"
        class="font-mono"
        :rows="8"
        @update:value="onBlocksInput"
      />
      <div class="text-xs text-gray-400">
        ArticleBlock[] JSON（heading / paragraph / list / quote / image /
        divider），合法 JSON 实时生效
      </div>
    </template>

    <template v-else-if="section.type === 'logoStrip'">
      <Input v-model:value="section.title" placeholder="标题（可选）" />
      <div
        v-for="(logo, i) in section.logos"
        :key="i"
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
      <div class="text-xs text-gray-400">
        逃生门：按名嵌入零 props 定制组件（架构图类），props 不入库
      </div>
    </template>
  </div>
</template>
