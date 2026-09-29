<script lang="ts" setup>
import type { AdminPageRecord } from '#/api/pages';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Button, message, Popconfirm, Space, Table, Tag } from 'ant-design-vue';

import { deletePageApi, listAdminPagesApi, takeoverPageApi } from '#/api/pages';

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
  try {
    await deletePageApi(slug);
    message.success('已删除');
    await fetchRows();
  } catch {
    // 失败提示由请求拦截器统一弹出；此处吞掉避免 unhandled rejection
  }
}

// 接管白名单（015.18）：与服务端 pages-admin CMS_TAKEOVER_PATHS 保持一致（当前仅首页）
const TAKEOVER_PATHS = new Set(['/']);
function isTakeoverable(slug: string) {
  return TAKEOVER_PATHS.has(slug);
}

async function handleTakeover(slug: string) {
  try {
    await takeoverPageApi(slug);
    message.success('已创建接管草稿，发布后生效');
    router.push({ path: '/pages/edit', query: { slug } });
  } catch {
    // 失败提示由请求拦截器统一弹出；此处吞掉避免 unhandled rejection
  }
}

// dev 下 admin 与主站不同源（5666/3000），预览主站页面需拼 origin；生产同域直接用相对路径
const siteBase = import.meta.env.DEV ? 'http://localhost:3000' : '';
function siteUrl(slug: string) {
  return `${siteBase}${slug}`;
}
// 代码页目录含动态路由模式（/news/:id 等），不是真实可打开的 URL → 只作纯文本/禁用态展示
function isDynamicPattern(slug: string) {
  return slug.includes(':');
}

const columns = [
  { dataIndex: 'slug', title: '路径', width: 260 },
  { dataIndex: 'title', ellipsis: true, title: '标题' },
  { dataIndex: 'source', title: '来源', width: 90 },
  { dataIndex: 'sortOrder', title: '排序', width: 70 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'updatedAt', title: '更新时间', width: 180 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 200 },
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
          <span v-if="isDynamicPattern(record.slug)" class="text-gray-400">
            {{ record.slug }}
          </span>
          <a v-else :href="siteUrl(record.slug)" target="_blank">
            {{ record.slug }}
          </a>
        </template>
        <template v-else-if="column.dataIndex === 'source'">
          <Tag v-if="record.source === 'cms'" color="blue">CMS</Tag>
          <Tag
            v-else-if="record.takenOver"
            :color="record.status === 'published' ? 'green' : 'orange'"
          >
            {{ record.status === 'published' ? '已接管' : '接管中·草稿' }}
          </Tag>
          <Tag v-else color="default">代码页</Tag>
        </template>
        <template v-else-if="column.dataIndex === 'sortOrder'">
          {{ record.sortOrder ?? '—' }}
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <Tag
            v-if="record.status"
            :color="statusColors[record.status as keyof typeof statusColors]"
          >
            {{ statusLabels[record.status as keyof typeof statusLabels] }}
          </Tag>
          <span v-else>—</span>
        </template>
        <template v-else-if="column.dataIndex === 'updatedAt'">
          {{
            record.updatedAt ? new Date(record.updatedAt).toLocaleString() : '—'
          }}
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <Space v-if="record.source === 'cms'">
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
          <Space v-else>
            <Button
              :disabled="isDynamicPattern(record.slug)"
              :href="
                isDynamicPattern(record.slug) ? undefined : siteUrl(record.slug)
              "
              size="small"
              target="_blank"
              type="link"
            >
              查看
            </Button>
            <template v-if="isTakeoverable(record.slug)">
              <Button
                v-if="record.takenOver"
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
                v-if="record.takenOver"
                cancel-text="返回"
                ok-text="取消接管"
                title="取消接管后将立即回落代码渲染，确认取消？"
                @confirm="handleDelete(record.slug)"
              >
                <Button danger size="small" type="link">取消接管</Button>
              </Popconfirm>
              <Popconfirm
                v-else
                cancel-text="取消"
                ok-text="接管"
                title="接管该页面？将按当前线上内容创建草稿，发布后生效"
                @confirm="handleTakeover(record.slug)"
              >
                <Button size="small" type="link">接管</Button>
              </Popconfirm>
            </template>
          </Space>
        </template>
      </template>
    </Table>
  </div>
</template>
