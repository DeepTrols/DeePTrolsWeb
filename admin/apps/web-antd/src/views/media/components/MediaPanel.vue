<script lang="ts" setup>
import type { MediaAssetRecord } from '#/api/media';

import { onMounted, ref } from 'vue';

import {
  Button,
  Empty,
  message,
  Popconfirm,
  Spin,
  UploadDragger,
} from 'ant-design-vue';

import {
  deleteMediaApi,
  formatMediaSize,
  listMediaApi,
  uploadMediaApi,
} from '#/api/media';

defineOptions({ name: 'MediaPanel' });

const props = withDefaults(defineProps<{ selectable?: boolean }>(), {
  selectable: false,
});
const emit = defineEmits<{ select: [path: string] }>();

const rows = ref<MediaAssetRecord[]>([]);
const loading = ref(false);
const uploading = ref(false);

async function fetchRows() {
  loading.value = true;
  try {
    rows.value = await listMediaApi();
  } finally {
    loading.value = false;
  }
}

function handleBeforeUpload(file: File) {
  void doUpload(file);
  return false;
}

async function doUpload(file: File) {
  uploading.value = true;
  try {
    await uploadMediaApi(file);
    message.success(`已上传 ${file.name}`);
    await fetchRows();
  } finally {
    uploading.value = false;
  }
}

async function copyPath(path: string) {
  await navigator.clipboard.writeText(path);
  message.success('路径已复制');
}

async function handleDelete(id: number) {
  await deleteMediaApi(id);
  message.success('已删除');
  await fetchRows();
}

function handleSelect(path: string) {
  if (props.selectable) {
    emit('select', path);
  }
}

onMounted(fetchRows);
</script>

<template>
  <div>
    <UploadDragger
      :before-upload="handleBeforeUpload"
      :disabled="uploading"
      :show-upload-list="false"
      accept=".png,.jpg,.jpeg,.webp,.gif,image/png,image/jpeg,image/webp,image/gif"
      class="mb-4"
    >
      <p class="my-3 text-sm">
        {{
          uploading
            ? '上传中…'
            : '点击或拖拽图片到此处上传（png / jpg / webp / gif，≤5MB）'
        }}
      </p>
    </UploadDragger>

    <Spin :spinning="loading">
      <Empty v-if="rows.length === 0 && !loading" description="暂无媒体文件" />
      <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <div
          v-for="row in rows"
          :key="row.id"
          class="flex flex-col overflow-hidden rounded-lg border border-solid border-gray-200"
        >
          <div
            class="flex h-28 cursor-pointer items-center justify-center bg-gray-50"
            @click="handleSelect(row.path)"
          >
            <img
              :alt="row.alt || row.filename"
              class="max-h-full max-w-full object-contain"
              :src="row.path"
            />
          </div>
          <div class="flex flex-col gap-1 p-2">
            <span class="truncate text-xs" :title="row.filename">{{
              row.filename
            }}</span>
            <span class="text-xs text-gray-400">{{
              formatMediaSize(row.size)
            }}</span>
            <div class="mt-1 flex items-center gap-1">
              <Button
                v-if="selectable"
                size="small"
                type="primary"
                @click="handleSelect(row.path)"
              >
                选用
              </Button>
              <Button size="small" @click="copyPath(row.path)">复制路径</Button>
              <Popconfirm
                cancel-text="取消"
                ok-text="删除"
                title="确认删除该图片？（已引用位置不会自动替换）"
                @confirm="handleDelete(row.id)"
              >
                <Button danger size="small">删除</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>
