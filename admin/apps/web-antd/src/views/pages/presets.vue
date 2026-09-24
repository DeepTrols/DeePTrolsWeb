<script lang="ts" setup>
import type { SectionPreset } from '#/api/presets';

import { onMounted, ref } from 'vue';

import {
  Button,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  Table,
  Tag,
  Textarea,
} from 'ant-design-vue';

import {
  deletePresetApi,
  listPresetsApi,
  updatePresetApi,
} from '#/api/presets';

import { sectionSummary, sectionTypeLabels } from './sections';

defineOptions({ name: 'PagePresets' });

// 区块模板库（015.13）：列表 + 改名/描述 + 删除；一期不在此编辑模板内容（改内容 = 编辑器改完另存新模板）
const rows = ref<SectionPreset[]>([]);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const payload = await listPresetsApi();
    rows.value = payload.presets;
  } catch {
    message.error('模板列表加载失败：请检查数据库连接');
  } finally {
    loading.value = false;
  }
}

const editOpen = ref(false);
const editSaving = ref(false);
const editing = ref<null | SectionPreset>(null);
const editName = ref('');
const editDescription = ref('');

function openEdit(record: SectionPreset) {
  editing.value = record;
  editName.value = record.name;
  editDescription.value = record.description;
  editOpen.value = true;
}

async function saveEdit() {
  const record = editing.value;
  const name = editName.value.trim();
  if (!record || !name || editSaving.value) return;
  editSaving.value = true;
  try {
    await updatePresetApi(record.id, {
      description: editDescription.value.trim(),
      name,
      section: record.section,
    });
    message.success('已保存');
    editOpen.value = false;
    await load();
  } catch {
    message.error('保存失败');
  } finally {
    editSaving.value = false;
  }
}

async function remove(id: number) {
  try {
    await deletePresetApi(id);
    message.success('已删除');
    await load();
  } catch {
    message.error('删除失败');
  }
}

const columns = [
  { dataIndex: 'name', title: '名称', width: 200 },
  { dataIndex: 'type', title: '类型', width: 120 },
  { dataIndex: 'summary', ellipsis: true, title: '内容摘要' },
  { dataIndex: 'description', ellipsis: true, title: '描述' },
  { dataIndex: 'updatedAt', title: '更新时间', width: 180 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 140 },
];

onMounted(load);
</script>

<template>
  <div class="p-4">
    <div class="mb-3 text-xs text-gray-400">
      模板在页面编辑器中创建（区块卡片「存为模板」），拖入编辑器即插入快照；此处仅维护名称/描述与删除
    </div>
    <Spin :spinning="loading">
      <Table
        :columns="columns"
        :data-source="rows"
        :pagination="false"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'type'">
            <Tag color="blue">
              {{ sectionTypeLabels[(record as SectionPreset).section.type] }}
            </Tag>
          </template>
          <template v-else-if="column.dataIndex === 'summary'">
            {{ sectionSummary((record as SectionPreset).section) }}
          </template>
          <template v-else-if="column.dataIndex === 'updatedAt'">
            {{ new Date((record as SectionPreset).updatedAt).toLocaleString() }}
          </template>
          <template v-else-if="column.dataIndex === 'actions'">
            <Button
              size="small"
              type="link"
              @click="openEdit(record as SectionPreset)"
            >
              编辑
            </Button>
            <Popconfirm
              cancel-text="取消"
              ok-text="删除"
              title="删除该模板？（已插入页面的快照不受影响）"
              @confirm="remove((record as SectionPreset).id)"
            >
              <Button danger size="small" type="link">删除</Button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </Spin>

    <Modal
      v-model:open="editOpen"
      :confirm-loading="editSaving"
      ok-text="保存"
      title="编辑模板"
      @ok="saveEdit"
    >
      <div class="grid gap-2 pt-2">
        <Input v-model:value="editName" placeholder="模板名称（必填）" />
        <Textarea
          v-model:value="editDescription"
          placeholder="描述（可选）"
          :rows="2"
        />
      </div>
    </Modal>
  </div>
</template>
