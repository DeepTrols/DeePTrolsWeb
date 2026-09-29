<script lang="ts" setup>
import type { AdminNewsRecord } from '#/api/content';

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
  deleteNewsApi,
  listAdminNewsApi,
  setNewsFeaturedApi,
} from '#/api/content';

import {
  newsCategoryLabels,
  statusColors,
  statusLabels,
} from '../shared/options';

defineOptions({ name: 'ContentNews' });

const router = useRouter();
const rows = ref<AdminNewsRecord[]>([]);
const loading = ref(false);

async function fetchRows() {
  loading.value = true;
  try {
    rows.value = await listAdminNewsApi();
  } finally {
    loading.value = false;
  }
}

async function handleDelete(id: number) {
  await deleteNewsApi(id);
  message.success('已删除');
  await fetchRows();
}

/** 首页推荐开关：PATCH 单列切换（审计#16）——不再 GET→整条 PUT 读改写，取消推荐也不再被缺正文的旧数据阻止 */
async function toggleFeatured(record: AdminNewsRecord, checked: boolean) {
  try {
    await setNewsFeaturedApi(record.id, checked);
    message.success(checked ? '已推荐到首页' : '已取消推荐');
    await fetchRows();
  } catch (error: unknown) {
    // 推荐位预算硬限制（015.15）：409 = 首页推荐已达 4 条上限
    // vben RequestClient 抛的是 h3 错误体（error.response 已丢失），状态码读 statusCode
    const status = (error as null | { statusCode?: number })?.statusCode;
    message.error(
      status === 409
        ? '首页推荐最多 4 条（新闻+报告合计），请先取消其他推荐'
        : '推荐状态更新失败',
    );
  }
}

const columns = [
  { dataIndex: 'id', title: 'ID', width: 70 },
  { dataIndex: 'title', ellipsis: true, title: '标题' },
  { dataIndex: 'category', title: '分类', width: 110 },
  { dataIndex: 'publishedAt', title: '发布日期', width: 120 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'hasDetail', title: '正文', width: 80 },
  { dataIndex: 'featured', title: '推荐到首页', width: 100 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 150 },
];

onMounted(fetchRows);
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-sm text-gray-500">共 {{ rows.length }} 条</span>
      <Button type="primary" @click="router.push('/content/news/create')">
        新建新闻
      </Button>
    </div>
    <Table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :pagination="{ pageSize: 20 }"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'category'">
          {{ newsCategoryLabels[record.category] ?? record.category }}
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
                toggleFeatured(record as AdminNewsRecord, checked as boolean)
            "
          />
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <Space>
            <Button
              size="small"
              type="link"
              @click="router.push(`/content/news/${record.id}`)"
            >
              编辑
            </Button>
            <Popconfirm
              cancel-text="取消"
              ok-text="删除"
              title="确认删除该新闻？正文将一并删除。"
              @confirm="handleDelete(record.id)"
            >
              <Button danger size="small" type="link">删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </Table>
  </div>
</template>
