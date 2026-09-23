<script lang="ts" setup>
import type { AdminPageRecord } from '#/api/pages';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Button, message, Popconfirm, Space, Table, Tag } from 'ant-design-vue';

import { deletePageApi, listAdminPagesApi } from '#/api/pages';

import { statusColors, statusLabels } from '../content/shared/options';

defineOptions({ name: 'PageList' });

const router = useRouter();
const rows = ref<AdminPageRecord[]>([]);
const loading = ref(false);

async function fetchRows() {
  loading.value = true;
  try {
    rows.value = await listAdminPagesApi();
  } finally {
    loading.value = false;
  }
}

async function handleDelete(slug: string) {
  await deletePageApi(slug);
  message.success('已删除');
  await fetchRows();
}

const columns = [
  { dataIndex: 'slug', title: '路径', width: 260 },
  { dataIndex: 'title', ellipsis: true, title: '标题' },
  { dataIndex: 'sortOrder', title: '排序', width: 70 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'updatedAt', title: '更新时间', width: 180 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 150 },
];

onMounted(fetchRows);
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-sm text-gray-500">共 {{ rows.length }} 条</span>
      <Button type="primary" @click="router.push('/pages/create')">
        新建页面
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
        <template v-if="column.dataIndex === 'slug'">
          <a :href="record.slug" target="_blank">{{ record.slug }}</a>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <Tag
            :color="statusColors[record.status as keyof typeof statusColors]"
          >
            {{ statusLabels[record.status as keyof typeof statusLabels] }}
          </Tag>
        </template>
        <template v-else-if="column.dataIndex === 'updatedAt'">
          {{ new Date(record.updatedAt).toLocaleString() }}
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <Space>
            <Button
              size="small"
              type="link"
              @click="
                router.push({
                  path: '/pages/edit',
                  query: { slug: record.slug },
                })
              "
            >
              编辑
            </Button>
            <Popconfirm
              cancel-text="取消"
              ok-text="删除"
              title="确认删除该页面？"
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
