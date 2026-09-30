<script lang="ts" setup>
import type { ComponentFieldMeta } from '#/api/components';

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

import ImageField from '../../content/shared/ImageField.vue';
import { del, moveItem } from '../../menus/shared';

defineOptions({ name: 'PropListField' });

/**
 * 定制组件 list 字段的行编辑器（015.20a）：文字/图片/图标/下拉/嵌套列表逐行编辑，
 * 替代裸 JSON。prop 缺失时渲染 field.fallback 的深克隆预览行，首次编辑才写回
 * （setProp 不可变替换），保持稀疏存储不被默认值灌满。
 */
const props = defineProps<{ field: ComponentFieldMeta; value?: unknown }>();
const emit = defineEmits<{ 'update:value': [value: unknown[]] }>();

const isScalar = computed(() => props.field.itemType !== undefined);

const rowKeys = new WeakMap<object, number>();
let nextRowKey = 0;
function keyOf(item: object): number {
  let key = rowKeys.get(item);
  if (key === undefined) {
    key = nextRowKey;
    nextRowKey += 1;
    rowKeys.set(item, key);
  }
  return key;
}

function cloneRows(source: unknown): unknown[] {
  if (!Array.isArray(source)) {
    return [];
  }
  return JSON.parse(JSON.stringify(source)) as unknown[];
}

const rows = ref<unknown[]>([]);
watch(
  () => [props.value, props.field],
  () => {
    rows.value = Array.isArray(props.value)
      ? props.value
      : cloneRows(props.field.fallback);
  },
  { immediate: true },
);

function touch() {
  emit('update:value', rows.value);
}

const atMax = computed(
  () =>
    props.field.maxItems !== undefined &&
    rows.value.length >= props.field.maxItems,
);
const atMin = computed(
  () =>
    props.field.minItems !== undefined &&
    rows.value.length <= props.field.minItems,
);

function blankRow(): unknown {
  if (props.field.itemType === 'number') return 0;
  if (props.field.itemType === 'string') return '';
  const row: Record<string, unknown> = {};
  for (const sub of props.field.itemFields ?? []) {
    if (sub.type === 'list') row[sub.key] = [];
    else if (sub.type === 'boolean') row[sub.key] = false;
    else if (sub.type === 'number') row[sub.key] = 0;
    else row[sub.key] = sub.default ?? '';
  }
  return row;
}

function addRow() {
  if (atMax.value) return;
  rows.value.push(blankRow());
  touch();
}

function removeRow(index: number) {
  if (atMin.value) return;
  del(rows.value, index);
  touch();
}

function moveRow(index: number, delta: number) {
  moveItem(rows.value, index, delta);
  touch();
}

function replaceRow(index: number, value: unknown) {
  rows.value[index] = value;
  touch();
}

function asRecord(row: unknown): Record<string, unknown> {
  return row as Record<string, unknown>;
}

function rowStr(row: unknown, key: string): string | undefined {
  const value = asRecord(row)[key];
  return typeof value === 'string' ? value : undefined;
}

function rowNum(row: unknown, key: string): number | undefined {
  const value = asRecord(row)[key];
  return typeof value === 'number' ? value : undefined;
}

function scalarStr(row: unknown): string | undefined {
  return typeof row === 'string' ? row : undefined;
}

function scalarNum(row: unknown): number | undefined {
  return typeof row === 'number' ? row : undefined;
}

function setRow(row: unknown, key: string, value: unknown) {
  asRecord(row)[key] = value;
  touch();
}
</script>

<template>
  <div class="grid gap-2">
    <div
      v-for="(row, index) in rows"
      :key="isScalar ? index : keyOf(asRecord(row))"
      class="rounded border border-dashed border-gray-200 p-2"
    >
      <div class="mb-1 flex items-center justify-between">
        <span class="text-xs text-gray-400">#{{ index + 1 }}</span>
        <div class="flex gap-1">
          <Button
            size="small"
            type="link"
            :disabled="index === 0"
            @click="moveRow(index, -1)"
          >
            上移
          </Button>
          <Button
            size="small"
            type="link"
            :disabled="index === rows.length - 1"
            @click="moveRow(index, 1)"
          >
            下移
          </Button>
          <Button
            danger
            size="small"
            type="link"
            :disabled="atMin"
            @click="removeRow(index)"
          >
            删除
          </Button>
        </div>
      </div>

      <template v-if="isScalar">
        <Input
          v-if="field.itemType === 'string'"
          :placeholder="field.placeholder"
          :value="scalarStr(row)"
          @update:value="(v) => replaceRow(index, v)"
        />
        <InputNumber
          v-else
          class="w-40"
          :value="scalarNum(row)"
          @update:value="(v) => replaceRow(index, v)"
        />
      </template>

      <div v-else class="grid gap-1">
        <div
          v-for="sub in field.itemFields"
          :key="sub.key"
          class="grid gap-1"
        >
          <span class="text-xs text-gray-400">
            {{ sub.label }}{{ sub.required ? '（必填）' : '' }}
          </span>
          <Input
            v-if="sub.type === 'string'"
            :placeholder="sub.placeholder"
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <Textarea
            v-else-if="sub.type === 'text'"
            :placeholder="sub.placeholder"
            :rows="2"
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <InputNumber
            v-else-if="sub.type === 'number'"
            class="w-40"
            :value="rowNum(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <Switch
            v-else-if="sub.type === 'boolean'"
            :checked="Boolean(asRecord(row)[sub.key])"
            @update:checked="(v) => setRow(row, sub.key, v)"
          />
          <Select
            v-else-if="sub.type === 'select'"
            class="w-48"
            :options="sub.options"
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <ImageField
            v-else-if="sub.type === 'image'"
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <Select
            v-else-if="sub.type === 'icon'"
            allow-clear
            class="w-48"
            :options="NAV_ICON_OPTIONS"
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <PropListField
            v-else-if="sub.type === 'list'"
            :field="sub"
            :value="asRecord(row)[sub.key]"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
          <Input
            v-else
            :value="rowStr(row, sub.key)"
            @update:value="(v) => setRow(row, sub.key, v)"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button :disabled="atMax" size="small" @click="addRow">
        新增{{ isScalar ? '项' : '行' }}
      </Button>
      <span class="text-xs text-gray-400">
        {{ rows.length }} {{ isScalar ? '项' : '行'
        }}{{ field.maxItems !== undefined ? ` / 上限 ${field.maxItems}` : '' }}
        {{
          field.fallback !== undefined && value === undefined
            ? '（当前为静态缺省内容，编辑后存入页面）'
            : ''
        }}
      </span>
    </div>
  </div>
</template>
