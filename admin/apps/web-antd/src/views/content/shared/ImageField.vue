<script lang="ts" setup>
import { ref } from 'vue';

import { Button, Input, Modal } from 'ant-design-vue';

import MediaPanel from '#/views/media/components/MediaPanel.vue';

defineOptions({ name: 'ImageField' });

const value = defineModel<string>('value', { default: '' });
const pickerOpen = ref(false);

function handleSelect(path: string) {
  value.value = path;
  pickerOpen.value = false;
}
</script>

<template>
  <div class="flex items-start gap-2">
    <div class="flex-1">
      <Input v-model:value="value" placeholder="/images/... 或从媒体库选择" />
      <div v-if="value" class="mt-2">
        <img
          :src="value"
          alt="预览"
          class="h-20 rounded border border-solid border-gray-200 object-contain"
        />
      </div>
    </div>
    <Button @click="pickerOpen = true">媒体库</Button>
    <Modal
      v-model:open="pickerOpen"
      :footer="null"
      :width="920"
      title="选择图片"
    >
      <MediaPanel selectable @select="handleSelect" />
    </Modal>
  </div>
</template>
