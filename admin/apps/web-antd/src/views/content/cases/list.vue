<script lang="ts" setup>
import type { AdminCaseRecord } from '#/api/content';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  Button,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
} from 'ant-design-vue';

import {
  deleteCaseApi,
  listAdminCasesApi,
  setCaseFeaturedApi,
} from '#/api/content';

import {
  solutionKeyLabels,
  statusColors,
  statusLabels,
} from '../shared/options';

defineOptions({ name: 'ContentCases' });

const router = useRouter();
const rows = ref<AdminCaseRecord[]>([]);
const loading = ref(false);

async function fetchRows() {
  loading.value = true;
  try {
    rows.value = await listAdminCasesApi();
  } finally {
    loading.value = false;
  }
}

async function handleDelete(slug: string) {
  await deleteCaseApi(slug);
  message.success('已删除');
  await fetchRows();
}

/** 案例精选推荐开关：PATCH 单列切换（015.15，镜像审计#16） */
async function toggleFeatured(record: AdminCaseRecord, checked: boolean) {
  try {
    await setCaseFeaturedApi(record.slug, checked);
    message.success(checked ? '已推荐到案例精选' : '已取消推荐');
    await fetchRows();
  } catch (error: unknown) {
    // 推荐位预算硬限制（015.15）：409 = 案例精选已达 3 条上限
    const status = (error as null | { response?: { status?: number } })
      ?.response?.status;
    message.error(
      status === 409
        ? '案例精选最多 3 条，请先取消其他推荐'
        : '推荐状态更新失败',
    );
  }
}

const columns = [
  { dataIndex: 'slug', title: 'Slug', width: 220 },
  { dataIndex: 'title', ellipsis: true, title: '标题' },
  { dataIndex: 'solutionKey', title: '方案分类', width: 110 },
  { dataIndex: 'sortOrder', title: '排序', width: 70 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'hasDetail', title: '详情', width: 80 },
  { dataIndex: 'featured', title: '推荐', width: 80 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 150 },
];

onMounted(fetchRows);
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-sm text-gray-500">共 {{ rows.length }} 条</span>
      <Button type="primary" @click="router.push('/content/cases/create')">
        新建案例
      </Button>
    </div>
    <Table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :pagination="{ pageSize: 20 }"
      row-key="slug"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'solutionKey'">
          {{
            record.solutionKey
              ? (solutionKeyLabels[
                  record.solutionKey as keyof typeof solutionKeyLabels
                ] ?? record.solutionKey)
              : '—'
          }}
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <Tag
            :color="statusColors[record.status as keyof typeof statusColors]"
          >
            {{ statusLabels[record.status as keyof typeof statusLabels] }}
          </Tag>
        </template>
        <template v-else-if="column.dataIndex === 'hasDetail'">
          <Tag v-if="record.hasDetail" color="blue">有</Tag>
          <Tag v-else color="red">缺失</Tag>
        </template>
        <template v-else-if="column.dataIndex === 'featured'">
          <Switch
            :checked="record.featured"
            size="small"
            @change="
              (checked) =>
                toggleFeatured(record as AdminCaseRecord, checked as boolean)
            "
          />
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <Space>
            <Button
              size="small"
              type="link"
              @click="router.push(`/content/cases/${record.slug}`)"
            >
              编辑
            </Button>
            <Popconfirm
              cancel-text="取消"
              ok-text="删除"
              title="确认删除该案例？详情将一并删除。"
              @confirm="handleDelete(record.slug)"
            >
              <Button danger size="small" type="link">删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </Table>
  </div>
</template>
