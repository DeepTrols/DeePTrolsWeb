<script lang="ts" setup>
import type { ShowcaseLogoItem } from '#/api/showcase';

import { onMounted, ref } from 'vue';

import {
  Alert,
  Button,
  Input,
  message,
  Popconfirm,
  Spin,
  Tag,
} from 'ant-design-vue';

import { getShowcaseApi, saveShowcaseApi } from '#/api/showcase';

import CropperUpload from './components/CropperUpload.vue';

defineOptions({ name: 'ShowcaseLogos' });

const MAX_ITEMS = 40;

const items = ref<ShowcaseLogoItem[]>([]);
const source = ref<'db' | 'static'>('static');
const updatedAt = ref<null | string>(null);
const skippedTextEntries = ref(0);
const loading = ref(false);
const saving = ref(false);

async function load() {
  loading.value = true;
  try {
    const payload = await getShowcaseApi<ShowcaseLogoItem[]>('home-logos');
    items.value = payload.items;
    source.value = payload.source;
    updatedAt.value = payload.updatedAt;
    skippedTextEntries.value = payload.skippedTextEntries;
  } finally {
    loading.value = false;
  }
}

function move(index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.value.length) {
    return;
  }
  const next = [...items.value];
  const current = next[index];
  const swap = next[target];
  if (!current || !swap) {
    return;
  }
  next[index] = swap;
  next[target] = current;
  items.value = next;
}

function remove(index: number) {
  items.value = items.value.filter((_, i) => i !== index);
}

function handleAdded(path: string) {
  if (items.value.length >= MAX_ITEMS) {
    message.warning(`最多 ${MAX_ITEMS} 个`);
    return;
  }
  items.value = [...items.value, { name: '', image: path }];
}

function handleReplaced(index: number, path: string) {
  items.value = items.value.map((item, i) =>
    i === index ? { ...item, image: path } : item,
  );
}

async function save() {
  if (items.value.some((item) => !item.name.trim())) {
    message.error('请为每个 Logo 填写名称');
    return;
  }
  saving.value = true;
  try {
    await saveShowcaseApi('home-logos', items.value);
    message.success('已保存，首页 Logo 墙即时生效');
    await load();
  } catch {
    message.error('保存失败：请检查名称与图片路径');
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="p-4">
    <div class="mb-3 flex items-center gap-3">
      <Button type="primary" :loading="saving" @click="save">保存</Button>
      <CropperUpload
        button-text="新增 Logo（自由裁剪）"
        format="image/png"
        :max-output-height="192"
        @uploaded="handleAdded"
      />
      <Tag :color="source === 'db' ? 'green' : 'orange'">
        {{ source === 'db' ? '数据库' : '静态快照（保存后入库）' }}
      </Tag>
      <span v-if="updatedAt" class="text-xs text-gray-400">
        更新于 {{ new Date(updatedAt).toLocaleString() }}
      </span>
    </div>
    <Alert
      v-if="skippedTextEntries > 0"
      class="mb-3"
      :message="`${skippedTextEntries} 个纯文本条目仅在静态回退中保留，不入库；保存后前台将只展示下列图片条目`"
      show-icon
      type="warning"
    />
    <p class="mb-3 text-xs text-gray-400">
      首页「关于我们」横向滚动 Logo 墙；自由比例裁剪，输出
      PNG（保留透明），高度不超过 192px（2x 清晰度），最多 {{ MAX_ITEMS }} 个。
    </p>
    <Spin :spinning="loading">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <div
          v-for="(item, index) in items"
          :key="`${item.image}-${index}`"
          class="flex flex-col overflow-hidden rounded-lg border border-solid border-gray-200"
        >
          <div class="flex h-20 items-center justify-center bg-gray-50 p-2">
            <img
              :alt="item.name || '预览'"
              class="max-h-full max-w-full object-contain"
              :src="item.image"
            />
          </div>
          <div class="flex flex-col gap-2 p-2">
            <Input
              v-model:value="item.name"
              :maxlength="100"
              placeholder="名称"
            />
            <div class="flex flex-wrap items-center gap-1">
              <Button :disabled="index === 0" @click="move(index, -1)">
                上移
              </Button>
              <Button
                :disabled="index === items.length - 1"
                @click="move(index, 1)"
              >
                下移
              </Button>
              <CropperUpload
                button-text="替换"
                format="image/png"
                :max-output-height="192"
                @uploaded="(path: string) => handleReplaced(index, path)"
              />
              <Popconfirm
                cancel-text="取消"
                ok-text="删除"
                title="确认删除该 Logo？"
                @confirm="remove(index)"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>
