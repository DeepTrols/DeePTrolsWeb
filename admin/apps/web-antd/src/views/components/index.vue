<script lang="ts" setup>
import type { ComponentUsage } from '#/api/components';

import { onMounted, ref } from 'vue';

import {
  Button,
  message,
  Modal,
  Popover,
  Spin,
  Switch,
  Table,
  Tag,
} from 'ant-design-vue';

import { getComponentsApi, saveComponentsApi } from '#/api/components';

import {
  componentDescriptions,
  customSectionLabels,
  sectionTypeLabels,
} from '../pages/sections';

defineOptions({ name: 'ComponentManager' });

interface ComponentRow {
  category: 'architecture' | 'content' | 'form' | 'marketing' | null;
  description: string;
  enabled: boolean;
  id: string;
  kind: 'custom' | 'standard';
  name: string;
}

const STANDARD_IDS: (keyof typeof sectionTypeLabels)[] = [
  'hero',
  'metrics',
  'featureGrid',
  'cta',
  'richText',
  'logoStrip',
  'imageBanner',
  'custom',
];
const CUSTOM_IDS = Object.keys(customSectionLabels);

const categoryLabels: Record<string, string> = {
  architecture: '架构',
  content: '内容',
  form: '表单',
  marketing: '营销',
};
const categoryColors: Record<string, string> = {
  architecture: 'geekblue',
  content: 'cyan',
  form: 'orange',
  marketing: 'purple',
};

const rows = ref<ComponentRow[]>([]);
const usage = ref<Record<string, ComponentUsage>>({});
const loading = ref(false);
const saving = ref(false);
const updatedAt = ref<null | string>(null);
const source = ref<'db' | 'static'>('static');

async function load() {
  loading.value = true;
  try {
    const payload = await getComponentsApi();
    const disabled = new Set(payload.disabled);
    usage.value = payload.usage ?? {};
    const registry = payload.registry ?? [];
    // 注册组件（015.13）：API registry 为准；静态 maps 仅作 label/description fallback
    const customIds =
      registry.length > 0 ? registry.map((entry) => entry.name) : CUSTOM_IDS;
    rows.value = [
      ...STANDARD_IDS.map((id) => ({
        category: null,
        description: componentDescriptions[id] ?? '',
        enabled: !disabled.has(id),
        id,
        kind: 'standard' as const,
        name: sectionTypeLabels[id],
      })),
      ...customIds.map((id) => {
        const entry = registry.find((item) => item.name === id);
        return {
          category: entry?.category ?? null,
          description: entry?.description ?? componentDescriptions[id] ?? '',
          enabled: !disabled.has(id),
          id,
          kind: 'custom' as const,
          name: entry?.label ?? customSectionLabels[id] ?? id,
        };
      }),
    ];
    updatedAt.value = payload.updatedAt;
    source.value = payload.source;
  } finally {
    loading.value = false;
  }
}

/** 禁用告警（015.13）：关掉仍被页面引用的组件时先确认；取消则还原 Switch */
function onToggle(record: ComponentRow, checked: boolean | number | string) {
  const next = checked === true || checked === 'true';
  const used = usage.value[record.id];
  if (next || !used || used.count === 0) {
    record.enabled = next;
    return;
  }
  Modal.confirm({
    content: `该组件正被 ${used.count} 个页面使用（${used.slugs.join('、')}）。禁用仅影响编辑器「新增区块」下拉，已发布页面照常渲染。确认禁用？`,
    cancelText: '取消',
    okText: '确认禁用',
    onCancel: () => {
      record.enabled = true;
    },
    onOk: () => {
      record.enabled = false;
    },
    title: '禁用使用中的组件',
  });
}

async function save() {
  saving.value = true;
  try {
    const disabled = rows.value
      .filter((row) => !row.enabled)
      .map((row) => row.id);
    await saveComponentsApi(disabled);
    message.success('已保存：禁用组件不再出现在页面编辑器的新增区块中');
    await load();
  } catch {
    message.error('保存失败：请检查数据库连接');
  } finally {
    saving.value = false;
  }
}

const columns = [
  { dataIndex: 'id', title: '组件 ID', width: 180 },
  { dataIndex: 'name', title: '名称', width: 160 },
  { dataIndex: 'kind', title: '类型', width: 90 },
  { dataIndex: 'category', title: '分类', width: 90 },
  { dataIndex: 'description', ellipsis: true, title: '说明' },
  { dataIndex: 'usage', title: '使用次数', width: 100 },
  { dataIndex: 'enabled', fixed: 'right' as const, title: '启用', width: 80 },
];

onMounted(load);
</script>

<template>
  <div class="p-4">
    <div class="mb-3 flex items-center gap-3">
      <Button type="primary" :loading="saving" @click="save">保存</Button>
      <Tag :color="source === 'db' ? 'green' : 'orange'">
        {{ source === 'db' ? '数据库' : '静态默认（全部启用，保存后入库）' }}
      </Tag>
      <span v-if="updatedAt" class="text-xs text-gray-400">
        更新于 {{ new Date(updatedAt).toLocaleString() }}
      </span>
      <span class="text-xs text-gray-400">
        禁用仅影响编辑器「新增区块」下拉，已发布页面照常渲染
      </span>
    </div>
    <Spin :spinning="loading">
      <Table
        :columns="columns"
        :data-source="rows"
        :pagination="false"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'id'">
            <code class="text-xs">{{ record.id }}</code>
          </template>
          <template v-else-if="column.dataIndex === 'kind'">
            <Tag :color="record.kind === 'standard' ? 'blue' : 'purple'">
              {{ record.kind === 'standard' ? '标准区块' : '定制组件' }}
            </Tag>
          </template>
          <template v-else-if="column.dataIndex === 'category'">
            <Tag
              v-if="record.category"
              :color="categoryColors[record.category]"
            >
              {{ categoryLabels[record.category] }}
            </Tag>
            <span v-else class="text-xs text-gray-300">—</span>
          </template>
          <template v-else-if="column.dataIndex === 'usage'">
            <Popover v-if="usage[record.id]?.count" placement="left">
              <template #content>
                <div class="max-w-72 text-xs">
                  <div v-for="slug in usage[record.id]?.slugs" :key="slug">
                    {{ slug }}
                  </div>
                </div>
              </template>
              <a>{{ usage[record.id]?.count }} 页</a>
            </Popover>
            <span v-else class="text-xs text-gray-300">0</span>
          </template>
          <template v-else-if="column.dataIndex === 'enabled'">
            <Switch
              :checked="record.enabled"
              size="small"
              @update:checked="(v) => onToggle(record as ComponentRow, v)"
            />
          </template>
        </template>
      </Table>
    </Spin>
  </div>
</template>
