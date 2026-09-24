<script lang="ts" setup>
import { ref, toRaw, watch } from 'vue';

import { VbenTiptap } from '@vben/plugins/tiptap';

import { uploadMediaApi } from '#/api/media';

import { blocksToHtml, htmlToBlocks } from './blocks-html';

defineOptions({ name: 'BlocksEditor' });

// null = 当前 HTML 无法转换（含不支持元素）或正文为空，父级据此阻止保存
const blocks = defineModel<null | unknown[]>('blocks', { default: null });

const html = ref('');
const problems = ref<string[]>([]);
// 哨兵：记录最近一次由本组件转换产出的 blocks，避免 watch 回灌覆盖正在输入的内容。
// 注意：父级 ref() 会把数组包成 reactive Proxy，回传的 model 是 Proxy 而非原引用，
// 必须用 toRaw 解包后再比较，否则每次击键都会误判为外部变更并 setContent 重置光标。
let lastEmitted: null | unknown[] = null;

watch(
  blocks,
  (value) => {
    if (!value || toRaw(value) === lastEmitted) return;
    html.value = blocksToHtml(value);
    problems.value = [];
  },
  { immediate: true },
);

const imageUpload = {
  upload: async (file: File) => {
    const asset = await uploadMediaApi(file);
    return asset.path;
  },
};

function onChange() {
  const result = htmlToBlocks(html.value);
  problems.value = result.problems;
  if (result.problems.length > 0 || result.blocks.length === 0) {
    lastEmitted = null;
    blocks.value = null;
    return;
  }
  lastEmitted = result.blocks;
  blocks.value = result.blocks;
}
</script>

<template>
  <div class="w-full">
    <VbenTiptap
      v-model="html"
      :image-upload="imageUpload"
      :min-height="320"
      @change="onChange"
    />
    <div v-if="problems.length > 0" class="mt-2 text-xs text-red-500">
      <div v-for="problem in problems" :key="problem">
        {{ problem }}，保存已被阻止，请移除后重试
      </div>
    </div>
    <div class="mt-1 text-xs text-gray-400">
      支持
      标题(H2-H4)/段落/列表/引用/图片/分割线；加粗、斜体、链接、颜色等行内格式保存时会被去除
    </div>
  </div>
</template>
