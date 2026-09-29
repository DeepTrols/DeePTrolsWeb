<script lang="ts" setup>
import type { AdminCaseRecord, SolutionCasePageKey } from '#/api/content';

import { computed, onMounted, ref } from 'vue';

import {
  Button,
  message,
  Popconfirm,
  Select,
  Spin,
  Tabs,
  Tag,
} from 'ant-design-vue';

import {
  getSolutionCasePicksApi,
  listAdminCasesApi,
  saveSolutionCasePicksApi,
} from '#/api/content';

import { moveItem } from '../menus/shared';

defineOptions({ name: 'ContentSolutionCases' });

const MAX_PICKS = 3;

const pageTabs: { key: SolutionCasePageKey; label: string }[] = [
  { key: 'manufacturing', label: '智能制造' },
  { key: 'water', label: '智慧水利' },
  { key: 'energy', label: '算电协同' },
  { key: 'smart-education', label: '智慧教育' },
  { key: 'fde', label: 'FDE' },
];

const activeKey = ref<SolutionCasePageKey>('manufacturing');
const items = ref<string[]>([]);
const source = ref<'db' | 'static'>('static');
const updatedAt = ref<null | string>(null);
const caseRows = ref<AdminCaseRecord[]>([]);
const loading = ref(false);
const saving = ref(false);

const caseOptions = computed(() =>
  caseRows.value
    .filter((row) => row.status === 'published')
    .map((row) => ({ label: `${row.title}（${row.slug}）`, value: row.slug })),
);

async function load() {
  loading.value = true;
  try {
    const payload = await getSolutionCasePicksApi(activeKey.value);
    items.value = [...payload.items];
    source.value = payload.source;
    updatedAt.value = payload.updatedAt;
  } finally {
    loading.value = false;
  }
}

function handleTabChange(key: number | string) {
  activeKey.value = key as SolutionCasePageKey;
  load();
}

function updateSlug(index: number, value: unknown) {
  items.value = items.value.map((slug, i) =>
    i === index ? String(value) : slug,
  );
}

function add() {
  if (items.value.length >= MAX_PICKS) {
    message.warning(`每个方案页最多推荐 ${MAX_PICKS} 条案例`);
    return;
  }
  const candidate = caseOptions.value.find(
    (option) => !items.value.includes(option.value),
  );
  if (!candidate) {
    message.warning('暂无可添加的已发布案例');
    return;
  }
  items.value = [...items.value, candidate.value];
}

function remove(index: number) {
  items.value = items.value.filter((_, i) => i !== index);
}

async function save() {
  if (new Set(items.value).size !== items.value.length) {
    message.error('存在重复案例，请调整后再保存');
    return;
  }
  saving.value = true;
  try {
    await saveSolutionCasePicksApi(activeKey.value, items.value);
    message.success('已保存，方案页案例推荐即时生效');
    await load();
  } catch (error: unknown) {
    // vben RequestClient 抛的是 h3 错误体（error.response 已丢失），状态码读 statusCode
    const status = (error as null | { statusCode?: number })?.statusCode;
    message.error(
      status === 400
        ? '保存失败：存在无效或已删除的案例，请重新选择'
        : '保存失败',
    );
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  caseRows.value = await listAdminCasesApi();
  await load();
});
</script>

<template>
  <div class="p-4">
    <Tabs :active-key="activeKey" @change="handleTabChange">
      <Tabs.TabPane v-for="tab in pageTabs" :key="tab.key" :tab="tab.label" />
    </Tabs>
    <div class="mb-3 flex items-center gap-3">
      <Button type="primary" :loading="saving" @click="save">保存</Button>
      <Button @click="add">添加案例</Button>
      <Tag :color="source === 'db' ? 'green' : 'orange'">
        {{ source === 'db' ? '数据库' : '静态快照（保存后入库）' }}
      </Tag>
      <span v-if="updatedAt" class="text-xs text-gray-400">
        更新于 {{ new Date(updatedAt).toLocaleString() }}
      </span>
    </div>
    <p class="mb-3 text-xs text-gray-400">
      方案页底部「客户案例」推荐位：从案例库挑选已发布案例，按列表顺序展示，最多
      {{ MAX_PICKS }} 条；未配置时页面展示对应行业的静态回退案例。
    </p>
    <Spin :spinning="loading">
      <div class="flex max-w-3xl flex-col gap-2">
        <div
          v-for="(slug, index) in items"
          :key="`${slug}-${index}`"
          class="flex items-center gap-2"
        >
          <Select
            class="flex-1"
            option-filter-prop="label"
            :options="caseOptions"
            show-search
            :value="slug"
            @change="(value) => updateSlug(index, value)"
          />
          <Button :disabled="index === 0" @click="moveItem(items, index, -1)">
            上移
          </Button>
          <Button
            :disabled="index === items.length - 1"
            @click="moveItem(items, index, 1)"
          >
            下移
          </Button>
          <Popconfirm
            cancel-text="取消"
            ok-text="删除"
            title="确认移除该案例？"
            @confirm="remove(index)"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </div>
        <p v-if="items.length === 0" class="text-sm text-gray-400">
          尚未配置推荐案例，页面将展示静态回退内容。
        </p>
      </div>
    </Spin>
  </div>
</template>
