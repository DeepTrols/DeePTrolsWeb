<script lang="ts" setup>
import type { AdminCategoryRecord, CategoryScope } from '#/api/content';

import { onMounted, reactive, ref } from 'vue';

import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
} from 'ant-design-vue';

import {
  createCategoryApi,
  deleteCategoryApi,
  listAdminCategoriesApi,
  updateCategoryApi,
} from '#/api/content';

defineOptions({ name: 'ContentCategories' });

const scopeTabs: { key: CategoryScope; label: string }[] = [
  { key: 'news-category', label: '新闻分类' },
  { key: 'solution', label: '行业分类（案例/报告共享）' },
  { key: 'report-type', label: '报告类型' },
];

const activeScope = ref<CategoryScope>('news-category');
const rows = ref<AdminCategoryRecord[]>([]);
const loading = ref(false);

async function fetchRows() {
  loading.value = true;
  try {
    rows.value = await listAdminCategoriesApi(activeScope.value);
  } finally {
    loading.value = false;
  }
}

function handleScopeChange(key: number | string) {
  activeScope.value = key as CategoryScope;
  fetchRows();
}

// ---- 新建 / 编辑 ----
const modalOpen = ref(false);
const editing = ref<AdminCategoryRecord | null>(null);
const saving = ref(false);
const form = reactive({ key: '', label: '', sortOrder: 0 });

function openCreate() {
  editing.value = null;
  form.key = '';
  form.label = '';
  form.sortOrder = (rows.value.at(-1)?.sortOrder ?? -1) + 1;
  modalOpen.value = true;
}

function openEdit(record: AdminCategoryRecord) {
  editing.value = record;
  form.key = record.key;
  form.label = record.label;
  form.sortOrder = record.sortOrder;
  modalOpen.value = true;
}

async function handleSave() {
  if (!form.key.trim() || !form.label.trim()) {
    message.error('key 与名称不能为空');
    return;
  }
  saving.value = true;
  try {
    editing.value
      ? await updateCategoryApi(activeScope.value, editing.value.key, {
          label: form.label.trim(),
          sortOrder: form.sortOrder,
        })
      : await createCategoryApi({
          scope: activeScope.value,
          key: form.key.trim(),
          label: form.label.trim(),
          sortOrder: form.sortOrder,
        });
    message.success(editing.value ? '已保存' : '已创建');
    modalOpen.value = false;
    await fetchRows();
  } catch (error: unknown) {
    // vben RequestClient 抛的是 h3 错误体（error.response 已丢失），状态码读 statusCode
    const status = (error as null | { statusCode?: number })?.statusCode;
    if (status === 409) {
      message.error('同 scope 下该 key 已存在');
    }
    // 其余失败提示由请求拦截器统一弹出
  } finally {
    saving.value = false;
  }
}

async function handleDelete(record: AdminCategoryRecord) {
  try {
    await deleteCategoryApi(record.scope, record.key);
    message.success('已删除');
    await fetchRows();
  } catch (error: unknown) {
    // 软外键（015.16）：409 = 分类仍被内容引用，服务端 statusMessage 附引用数
    // vben RequestClient 抛的是 h3 错误体（error.response 已丢失），状态码读 statusCode
    const status = (error as null | { statusCode?: number })?.statusCode;
    message.error(
      status === 409
        ? `该分类仍被 ${record.refs} 条内容引用，无法删除`
        : '删除失败',
    );
  }
}

const columns = [
  { dataIndex: 'key', title: 'Key', width: 200 },
  { dataIndex: 'label', title: '名称', width: 180 },
  { dataIndex: 'sortOrder', title: '排序', width: 80 },
  { dataIndex: 'refs', title: '引用数', width: 90 },
  { dataIndex: 'updatedAt', title: '更新时间', width: 200 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 150 },
];

// antd bodyCell 插槽 record 类型为 Record<string, any>；模板内 as 断言会撞 vue/no-deprecated-filter，脚本侧收窄
function asRecord(record: Record<string, any>): AdminCategoryRecord {
  return record as AdminCategoryRecord;
}

onMounted(fetchRows);
</script>

<template>
  <div class="p-4">
    <Tabs :active-key="activeScope" @change="handleScopeChange">
      <Tabs.TabPane v-for="tab in scopeTabs" :key="tab.key" :tab="tab.label" />
    </Tabs>
    <div class="mb-4 flex items-center justify-between">
      <span class="text-sm text-gray-500">共 {{ rows.length }} 条</span>
      <Button type="primary" @click="openCreate">新建分类</Button>
    </div>
    <Table
      :columns="columns"
      :data-source="rows"
      :loading="loading"
      :pagination="false"
      row-key="key"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'refs'">
          <Tag :color="record.refs > 0 ? 'blue' : 'default'">
            {{ record.refs }}
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
              @click="openEdit(asRecord(record))"
            >
              编辑
            </Button>
            <Popconfirm
              cancel-text="取消"
              ok-text="删除"
              title="确认删除该分类？被引用的分类将被拒绝。"
              @confirm="handleDelete(asRecord(record))"
            >
              <Button danger size="small" type="link">删除</Button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </Table>

    <Modal
      v-model:open="modalOpen"
      :confirm-loading="saving"
      :title="editing ? '编辑分类' : '新建分类'"
      @ok="handleSave"
    >
      <Form layout="vertical">
        <FormItem label="Key" required>
          <Input
            v-model:value="form.key"
            :disabled="!!editing"
            :placeholder="
              activeScope === 'report-type'
                ? '报告类型 key 即名称（允许中文）'
                : '小写 slug，如 smart-retail'
            "
            :maxlength="50"
          />
        </FormItem>
        <FormItem label="名称" required>
          <Input v-model:value="form.label" :maxlength="100" />
        </FormItem>
        <FormItem label="排序">
          <InputNumber v-model:value="form.sortOrder" :min="0" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
