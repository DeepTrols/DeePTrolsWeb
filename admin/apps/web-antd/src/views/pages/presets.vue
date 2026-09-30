<script lang="ts" setup>
import type { ComponentRegistryEntry, HeroVisualEntry } from '#/api/components';
import type { PageSection } from '#/api/pages';
import type { SectionPreset } from '#/api/presets';

import { onMounted, ref, toRaw } from 'vue';

import {
  Button,
  Drawer,
  Input,
  message,
  Popconfirm,
  Spin,
  Table,
  Tag,
  Textarea,
} from 'ant-design-vue';

import { getComponentsApi } from '#/api/components';
import {
  deletePresetApi,
  listPresetsApi,
  updatePresetApi,
} from '#/api/presets';

import { sectionSummary, sectionTypeLabels } from './sections';
import SectionsEditor from './components/SectionsEditor.vue';

defineOptions({ name: 'PagePresets' });

// 区块模板库（015.13，015.19c 升级为多区块组合）：列表 + 名称/描述/内容编辑 + 删除；
// 内容编辑复用页面编辑器的 SectionsEditor（不传 presets 防模板递归嵌套）
const rows = ref<SectionPreset[]>([]);
const loading = ref(false);

const customComponents = ref<ComponentRegistryEntry[]>([]);
const heroVisuals = ref<HeroVisualEntry[]>([]);

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

async function loadComponentMeta() {
  try {
    const payload = await getComponentsApi();
    customComponents.value = payload.registry;
    heroVisuals.value = payload.heroVisuals;
  } catch {
    // 组件元数据拉取失败不阻塞模板管理：定制区块 props 表单回退空描述符
  }
}

const editOpen = ref(false);
const editSaving = ref(false);
const editing = ref<null | SectionPreset>(null);
const editName = ref('');
const editDescription = ref('');
const editSections = ref<PageSection[]>([]);

function openEdit(record: SectionPreset) {
  editing.value = record;
  editName.value = record.name;
  editDescription.value = record.description;
  editSections.value = structuredClone(toRaw(record.sections));
  editOpen.value = true;
}

async function saveEdit() {
  const record = editing.value;
  const name = editName.value.trim();
  if (!record || !name || editSaving.value) return;
  if (editSections.value.length === 0) {
    message.error('模板至少包含 1 个区块');
    return;
  }
  editSaving.value = true;
  try {
    await updatePresetApi(record.id, {
      description: editDescription.value.trim(),
      name,
      sections: structuredClone(toRaw(editSections.value)),
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
  { dataIndex: 'type', title: '类型', width: 200 },
  { dataIndex: 'summary', ellipsis: true, title: '内容摘要' },
  { dataIndex: 'description', ellipsis: true, title: '描述' },
  { dataIndex: 'updatedAt', title: '更新时间', width: 180 },
  { dataIndex: 'actions', fixed: 'right' as const, title: '操作', width: 140 },
];

onMounted(() => {
  void load();
  void loadComponentMeta();
});
</script>

<template>
  <div class="p-4">
    <div class="mb-3 text-xs text-gray-400">
      模板为多区块组合（015.19c）：在页面编辑器「存为模板」创建，或在此编辑名称/描述与区块内容；拖入编辑器按序整组插入
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
            <Tag
              v-for="(section, index) in (record as SectionPreset).sections"
              :key="index"
              color="blue"
            >
              {{ sectionTypeLabels[section.type] }}
            </Tag>
          </template>
          <template v-else-if="column.dataIndex === 'summary'">
            {{
              (record as SectionPreset).sections
                .map(section => sectionSummary(section))
                .join(' / ')
            }}
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

    <Drawer
      v-model:open="editOpen"
      :width="1080"
      placement="right"
      title="编辑模板"
    >
      <div class="grid gap-2 pb-4">
        <Input v-model:value="editName" placeholder="模板名称（必填）" />
        <Textarea
          v-model:value="editDescription"
          placeholder="描述（可选）"
          :rows="2"
        />
      </div>
      <SectionsEditor
        v-model:sections="editSections"
        :custom-components="customComponents"
        :hero-visuals="heroVisuals"
        @preset-saved="load"
      />
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button @click="editOpen = false">取消</Button>
          <Button :loading="editSaving" type="primary" @click="saveEdit">
            保存
          </Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
