<script lang="ts" setup>
import { ref } from 'vue';

import { VCropper } from '@vben/common-ui';

import { Button, message, Modal } from 'ant-design-vue';

import { uploadMediaApi } from '#/api/media';

defineOptions({ name: 'CropperUpload' });

const props = withDefaults(
  defineProps<{
    /** 裁剪比例（如 '10:16'）；不传 = 自由比例 */
    aspectRatio?: string;
    /** 触发按钮文案 */
    buttonText?: string;
    /** 输出格式：jpeg 不透明照片 / png 保留透明 */
    format: 'image/jpeg' | 'image/png';
    /** 裁剪后等比缩放到该高度（自由比例场景保尺寸上限，不拉伸） */
    maxOutputHeight?: number;
    /** 固定输出高度（仅固定比例场景传，VCropper 会强制拉伸到该尺寸） */
    outputHeight?: number;
    /** 固定输出宽度（仅固定比例场景传） */
    outputWidth?: number;
    /** jpeg 质量 0-1 */
    quality?: number;
  }>(),
  {
    aspectRatio: undefined,
    buttonText: '上传并裁剪',
    maxOutputHeight: undefined,
    outputHeight: undefined,
    outputWidth: undefined,
    quality: 0.92,
  },
);

const emit = defineEmits<{ uploaded: [path: string] }>();

interface CropperExpose {
  getCropImage: (
    format: 'image/jpeg' | 'image/png',
    quality?: number,
    outputType?: 'base64' | 'blob',
    targetWidth?: number,
    targetHeight?: number,
  ) => Promise<Blob | string | undefined>;
}

const fileInputRef = ref<HTMLInputElement | null>(null);
const cropperRef = ref<CropperExpose | null>(null);
const cropperOpen = ref(false);
const uploading = ref(false);
const objectUrl = ref('');
const sourceName = ref('image');

function openPicker() {
  fileInputRef.value?.click();
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) {
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    message.error('图片不能超过 5MB');
    return;
  }
  sourceName.value = file.name.replace(/\.[^.]+$/, '') || 'image';
  objectUrl.value = URL.createObjectURL(file);
  cropperOpen.value = true;
}

function closeCropper() {
  cropperOpen.value = false;
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = '';
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () => reject(new Error('图片加载失败')));
    img.src = url;
  });
}

/** 自由比例裁剪后若高度超限，用 canvas 等比缩小（png 保留透明） */
async function limitImageHeight(blob: Blob, maxHeight: number): Promise<Blob> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    if (img.naturalHeight <= maxHeight) {
      return blob;
    }
    const scale = maxHeight / img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = maxHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return blob;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve) => {
      canvas.toBlob(
        (result) => resolve(result ?? blob),
        props.format,
        props.quality,
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function handleConfirm() {
  const cropper = cropperRef.value;
  if (!cropper) {
    return;
  }
  uploading.value = true;
  try {
    const result = await cropper.getCropImage(
      props.format,
      props.quality,
      'blob',
      props.outputWidth,
      props.outputHeight,
    );
    if (!(result instanceof Blob) || result.size === 0) {
      message.error('裁剪失败，请重新选择区域');
      return;
    }
    const blob = props.maxOutputHeight
      ? await limitImageHeight(result, props.maxOutputHeight)
      : result;
    const ext = props.format === 'image/png' ? 'png' : 'jpg';
    const file = new File([blob], `${sourceName.value}.${ext}`, {
      type: props.format,
    });
    const record = await uploadMediaApi(file);
    message.success('已上传');
    emit('uploaded', record.path);
    closeCropper();
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <input
    ref="fileInputRef"
    accept="image/png,image/jpeg,image/webp"
    class="hidden"
    type="file"
    @change="handleFileChange"
  />
  <Button @click="openPicker">{{ buttonText }}</Button>
  <Modal
    :confirm-loading="uploading"
    :open="cropperOpen"
    :width="640"
    cancel-text="取消"
    ok-text="裁剪并上传"
    title="裁剪图片"
    @cancel="closeCropper"
    @ok="handleConfirm"
  >
    <div class="flex justify-center py-2">
      <VCropper
        v-if="objectUrl"
        ref="cropperRef"
        :aspect-ratio="aspectRatio"
        :height="420"
        :img="objectUrl"
        :width="560"
      />
    </div>
  </Modal>
</template>
