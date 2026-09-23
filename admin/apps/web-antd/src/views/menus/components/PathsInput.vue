<script lang="ts" setup>
import { computed } from 'vue';

import { Input } from 'ant-design-vue';

import { pathsToText, textToPaths } from '../shared';

const props = defineProps<{ value?: string[] }>();
const emit = defineEmits<{ 'update:value': [string[] | undefined] }>();

const text = computed({
  get: () => pathsToText(props.value),
  set: (value: string) => emit('update:value', textToPaths(value)),
});
</script>

<template>
  <Input
    v-model:value="text"
    placeholder="逗号分隔，如 /solutions/fde, /services/fde"
  />
</template>
