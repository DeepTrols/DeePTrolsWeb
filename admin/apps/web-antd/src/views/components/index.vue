<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { Button, message, Spin, Switch, Table, Tag } from 'ant-design-vue';

import { getComponentsApi, saveComponentsApi } from '#/api/components';

import {
  componentDescriptions,
  customSectionLabels,
  sectionTypeLabels,
} from '../pages/sections';

defineOptions({ name: 'ComponentManager' });

interface ComponentRow {
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

const rows = ref<ComponentRow[]>([]);
const loading = ref(false);
const saving = ref(false);
const updatedAt = ref<null | string>(null);
const source = ref<'db' | 'static'>('static');

async function load() {
  loading.value = true;
  try {
    const payload = await getComponentsApi();
    const disabled = new Set(payload.disabled);
    rows.value = [
      ...STANDARD_IDS.map((id) => ({
        description: componentDescriptions[id] ?? '',
        enabled: !disabled.has(id),
        id,
        kind: 'standard' as const,
        name: sectionTypeLabels[id],
      })),
      ...CUSTOM_IDS.map((id) => ({
        description: componentDescriptions[id] ?? '',
        enabled: !disabled.has(id),
        id,
        kind: 'custom' as const,
        name: customSectionLabels[id] ?? id,
      })),
    ];
    updatedAt.value = payload.updatedAt;
    source.value = payload.source;
  } finally {
    loading.value = false;
  }
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
  { dataIndex: 'name', title: '名称', width: 200 },
  { dataIndex: 'kind', title: '类型', width: 100 },
  { dataIndex: 'description', ellipsis: true, title: '说明' },
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
          <template v-else-if="column.dataIndex === 'enabled'">
            <Switch v-model:checked="record.enabled" size="small" />
          </template>
        </template>
      </Table>
    </Spin>
  </div>
</template>
