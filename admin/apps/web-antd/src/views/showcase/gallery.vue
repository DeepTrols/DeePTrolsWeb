<script lang="ts" setup>
import type { ShowcaseGalleryItem } from '#/api/showcase';

import { onMounted, ref } from 'vue';

import { Button, Input, message, Popconfirm, Spin, Tag } from 'ant-design-vue';

import { getShowcaseApi, saveShowcaseApi } from '#/api/showcase';

import CropperUpload from './components/CropperUpload.vue';

defineOptions({ name: 'ShowcaseGallery' });

const MAX_ITEMS = 24;

const items = ref<ShowcaseGalleryItem[]>([]);
const source = ref<'db' | 'static'>('static');
const updatedAt = ref<null | string>(null);
const loading = ref(false);
const saving = ref(false);

async function load() {
  loading.value = true;
  try {
    const payload =
      await getShowcaseApi<ShowcaseGalleryItem[]>('about-gallery');
    items.value = payload.items;
    source.value = payload.source;
    updatedAt.value = payload.updatedAt;
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
    message.warning(`最多 ${MAX_ITEMS} 张`);
    return;
  }
  items.value = [...items.value, { image: path, alt: '' }];
}

function handleReplaced(index: number, path: string) {
  items.value = items.value.map((item, i) =>
    i === index ? { ...item, image: path } : item,
  );
}

async function save() {
  if (items.value.some((item) => !item.alt.trim())) {
    message.error('请为每张图片填写描述（alt）');
    return;
  }
  saving.value = true;
  try {
    await saveShowcaseApi('about-gallery', items.value);
    message.success('已保存，关于页图集即时生效');
    await load();
  } catch {
    message.error('保存失败：请检查图片描述与图片路径');
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
        aspect-ratio="10:16"
        button-text="新增图片（10:16 裁剪）"
        format="image/jpeg"
        :output-height="768"
        :output-width="480"
        :quality="0.85"
        @uploaded="handleAdded"
      />
      <Tag :color="source === 'db' ? 'green' : 'orange'">
        {{ source === 'db' ? '数据库' : '静态快照（保存后入库）' }}
      </Tag>
      <span v-if="updatedAt" class="text-xs text-gray-400">
        更新于 {{ new Date(updatedAt).toLocaleString() }}
      </span>
    </div>
    <p class="mb-3 text-xs text-gray-400">
      关于我们页「公司介绍」横向滚动图集；图片统一 10:16 裁剪（输出 480×768，2x
      清晰度），最多 {{ MAX_ITEMS }} 张。
    </p>
    <Spin :spinning="loading">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <div
          v-for="(item, index) in items"
          :key="`${item.image}-${index}`"
          class="flex flex-col overflow-hidden rounded-lg border border-solid border-gray-200"
        >
          <div
            class="flex aspect-[10/16] items-center justify-center bg-gray-50"
          >
            <img
              :alt="item.alt || '预览'"
              class="h-full w-full object-cover"
              :src="item.image"
            />
          </div>
          <div class="flex flex-col gap-2 p-2">
            <Input
              v-model:value="item.alt"
              :maxlength="200"
              placeholder="图片描述（alt）"
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
                aspect-ratio="10:16"
                button-text="替换"
                format="image/jpeg"
                :output-height="768"
                :output-width="480"
                :quality="0.85"
                @uploaded="(path: string) => handleReplaced(index, path)"
              />
              <Popconfirm
                cancel-text="取消"
                ok-text="删除"
                title="确认删除该图片？"
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
