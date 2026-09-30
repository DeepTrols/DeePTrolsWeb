<script lang="ts" setup>
import type { ComponentCatalogEntry, ComponentUsage } from '#/api/components';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  Button,
  Drawer,
  Input,
  message,
  Modal,
  Popover,
  Select,
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

const router = useRouter();

interface ComponentRow extends ComponentCatalogEntry {
  enabled: boolean;
}

const kindLabels: Record<ComponentRow['kind'], string> = {
  custom: '定制组件',
  'hero-visual': 'hero 视觉',
  standard: '标准区块',
};
const kindColors: Record<ComponentRow['kind'], string> = {
  custom: 'purple',
  'hero-visual': 'gold',
  standard: 'blue',
};
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

// 015.19d：筛选与搜索（client-side）
const kindFilter = ref<ComponentRow['kind'] | 'all'>('all');
const categoryFilter = ref<string>('all');
const keyword = ref('');

const filteredRows = computed(() =>
  rows.value.filter((row) => {
    if (kindFilter.value !== 'all' && row.kind !== kindFilter.value) {
      return false;
    }
    if (categoryFilter.value !== 'all' && row.category !== categoryFilter.value) {
      return false;
    }
    const kw = keyword.value.trim().toLowerCase();
    if (!kw) {
      return true;
    }
    return [row.id, row.label, row.description]
      .join(' ')
      .toLowerCase()
      .includes(kw);
  }),
);

async function load() {
  loading.value = true;
  try {
    const payload = await getComponentsApi();
    const disabled = new Set(payload.disabled);
    usage.value = payload.usage ?? {};
    // 015.19d：行源改为服务端全量清单（标准+定制+hero 视觉）；静态 maps 仅作 label fallback
    const catalog = payload.catalog ?? [];
    rows.value = catalog.map((entry) => ({
      ...entry,
      label:
        entry.label ||
        sectionTypeLabels[entry.id as keyof typeof sectionTypeLabels] ||
        customSectionLabels[entry.id] ||
        entry.id,
      description: entry.description || componentDescriptions[entry.id] || '',
      enabled: !disabled.has(entry.id),
    }));
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
    // 具体错误由请求拦截器统一提示；此处静默，避免双重弹窗与误导性归因
  } finally {
    saving.value = false;
  }
}

// 详情抽屉（015.19d）
const detailOpen = ref(false);
const detail = ref<null | ComponentRow>(null);
function openDetail(record: ComponentRow) {
  detail.value = record;
  detailOpen.value = true;
}
function goContentEntry() {
  const route = detail.value?.contentEntry?.adminRoute;
  if (route) {
    detailOpen.value = false;
    router.push(route);
  }
}

const columns = [
  { dataIndex: 'id', title: '组件 ID', width: 200 },
  { dataIndex: 'label', title: '名称', width: 180 },
  { dataIndex: 'kind', title: '类型', width: 100 },
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
    <div class="mb-3 flex items-center gap-2">
      <Select
        v-model:value="kindFilter"
        :options="[
          { label: '全部类型', value: 'all' },
          { label: '标准区块', value: 'standard' },
          { label: '定制组件', value: 'custom' },
          { label: 'hero 视觉', value: 'hero-visual' },
        ]"
        class="w-32"
      />
      <Select
        v-model:value="categoryFilter"
        :options="[
          { label: '全部分类', value: 'all' },
          { label: '架构', value: 'architecture' },
          { label: '内容', value: 'content' },
          { label: '表单', value: 'form' },
          { label: '营销', value: 'marketing' },
        ]"
        class="w-32"
      />
      <Input
        v-model:value="keyword"
        class="w-64"
        placeholder="搜索 ID / 名称 / 说明"
        allow-clear
      />
      <span class="text-xs text-gray-400">
        {{ filteredRows.length }} / {{ rows.length }} 个组件
      </span>
    </div>
    <Spin :spinning="loading">
      <Table
        :columns="columns"
        :data-source="filteredRows"
        :pagination="false"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'id'">
            <code class="cursor-pointer text-xs" @click="openDetail(record as ComponentRow)">
              {{ record.id }}
            </code>
          </template>
          <template v-else-if="column.dataIndex === 'label'">
            <a @click="openDetail(record as ComponentRow)">{{ record.label }}</a>
          </template>
          <template v-else-if="column.dataIndex === 'kind'">
            <Tag :color="kindColors[(record as ComponentRow).kind]">
              {{ kindLabels[(record as ComponentRow).kind] }}
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

    <Drawer
      v-model:open="detailOpen"
      :width="520"
      placement="right"
      title="组件详情"
    >
      <div v-if="detail" class="grid gap-4 text-sm">
        <div>
          <div class="mb-1 text-xs text-gray-400">组件 ID / 类型</div>
          <code class="text-xs">{{ detail.id }}</code>
          <Tag :color="kindColors[detail.kind]" class="ml-2">
            {{ kindLabels[detail.kind] }}
          </Tag>
        </div>
        <div>
          <div class="mb-1 text-xs text-gray-400">名称 / 分类</div>
          {{ detail.label }}
          <Tag v-if="detail.category" :color="categoryColors[detail.category]" class="ml-2">
            {{ categoryLabels[detail.category] }}
          </Tag>
        </div>
        <div>
          <div class="mb-1 text-xs text-gray-400">说明</div>
          {{ detail.description }}
        </div>
        <div>
          <div class="mb-1 text-xs text-gray-400">
            使用情况（{{ usage[detail.id]?.count ?? 0 }} 页）
          </div>
          <div v-if="usage[detail.id]?.count" class="text-xs">
            {{ usage[detail.id]?.slugs.join('、') }}
          </div>
          <div v-else class="text-xs text-gray-300">未被 CMS 页面引用</div>
        </div>
        <div>
          <div class="mb-1 text-xs text-gray-400">可配置字段</div>
          <div v-if="detail.fields.length === 0" class="text-xs text-gray-300">
            无 props（零 props 数据驱动或标准区块专用表单）
          </div>
          <div v-else class="grid gap-1 text-xs">
            <div v-for="field in detail.fields" :key="field.key">
              <code>{{ field.key }}</code>
              · {{ field.label }} · {{ field.type }}
              <span v-if="field.required" class="text-red-400">必填</span>
            </div>
          </div>
        </div>
        <div v-if="detail.contentEntry">
          <div class="mb-1 text-xs text-gray-400">内容运维入口</div>
          <div class="flex items-center gap-2 text-xs">
            {{ detail.contentEntry.label }}
            <Button
              v-if="detail.contentEntry.adminRoute"
              size="small"
              type="link"
              @click="goContentEntry"
            >
              前往
            </Button>
          </div>
          <code v-if="detail.contentEntry.dataPath" class="text-xs">
            {{ detail.contentEntry.dataPath }}
          </code>
        </div>
      </div>
    </Drawer>
  </div>
</template>
