<script lang="ts" setup>
import type { NavFeature } from '#/api/menus';

import { Button, Input, Select } from 'ant-design-vue';

import { NAV_ICON_OPTIONS } from '#/api/menus';

import { moveItem as mv } from '../shared';

const features = defineModel<NavFeature[]>('features', { required: true });

function addFeature() {
  features.value.push({
    description: '',
    href: '/',
    icon: 'Rocket',
    title: '新特性',
  });
}

function removeFeature(i: number) {
  features.value.splice(i, 1);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(feature, i) in features"
      :key="i"
      class="rounded border border-solid border-gray-200 p-2"
    >
      <div class="flex flex-wrap items-center gap-2">
        <Input v-model:value="feature.title" class="w-40" placeholder="标题" />
        <Input v-model:value="feature.href" class="w-56" placeholder="/path" />
        <Select
          v-model:value="feature.icon"
          class="w-44"
          :options="NAV_ICON_OPTIONS"
          placeholder="图标（必选）"
        />
        <Button size="small" @click="mv(features, i, -1)">上移</Button>
        <Button size="small" @click="mv(features, i, 1)">下移</Button>
        <Button danger size="small" @click="removeFeature(i)">删除</Button>
      </div>
      <div class="mt-2">
        <Input v-model:value="feature.description" placeholder="描述" />
      </div>
    </div>
    <Button block type="dashed" @click="addFeature">新增特性</Button>
  </div>
</template>
