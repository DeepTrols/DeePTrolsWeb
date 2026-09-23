<script lang="ts" setup>
import type { NavColumn, NavFeature, NavItem } from '#/api/menus';

import { Button, Collapse, CollapsePanel, Input, Select } from 'ant-design-vue';

import { moveItem as mv } from '../shared';
import NavColumnEditor from './NavColumnEditor.vue';
import NavFeatureList from './NavFeatureList.vue';
import PathsInput from './PathsInput.vue';

const items = defineModel<NavItem[]>('items', { required: true });

const layoutOptions = [
  { label: 'product（产品布局）', value: 'product' },
  { label: 'solutions（方案布局）', value: 'solutions' },
];

function addItem() {
  items.value.push({ href: '/', label: '新菜单' });
}

function removeItem(i: number) {
  items.value.splice(i, 1);
}

function ensureColumns(item: NavItem): NavColumn[] {
  item.columns ??= [];
  return item.columns;
}

function ensureFeatures(item: NavItem): NavFeature[] {
  item.features ??= [];
  return item.features;
}
</script>

<template>
  <Collapse>
    <CollapsePanel
      v-for="(item, i) in items"
      :key="i"
      :header="`${i + 1}. ${item.label || '（未命名）'}`"
    >
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <Input v-model:value="item.label" class="w-40" placeholder="名称" />
        <Input v-model:value="item.href" class="w-56" placeholder="/path" />
        <Select
          v-model:value="item.layout"
          allow-clear
          class="w-52"
          :options="layoutOptions"
          placeholder="布局（可选）"
        />
        <Button size="small" @click="mv(items, i, -1)">上移</Button>
        <Button size="small" @click="mv(items, i, 1)">下移</Button>
        <Button danger size="small" @click="removeItem(i)">删除</Button>
      </div>
      <div class="mb-3 flex flex-wrap gap-2">
        <Input
          v-model:value="item.megaTitle"
          class="w-52"
          placeholder="面板标题（可选）"
        />
        <Input
          v-model:value="item.featuresTitle"
          class="w-52"
          placeholder="特性区标题（可选）"
        />
        <PathsInput v-model:value="item.activePaths" class="w-96" />
      </div>

      <div class="mb-3">
        <div class="mb-1 text-xs font-semibold text-gray-500">
          分栏（columns）
        </div>
        <NavColumnEditor :columns="ensureColumns(item)" />
      </div>

      <div>
        <div class="mb-1 text-xs font-semibold text-gray-500">
          特性区（features）
        </div>
        <NavFeatureList :features="ensureFeatures(item)" />
      </div>
    </CollapsePanel>
  </Collapse>
  <Button block class="mt-2" type="dashed" @click="addItem">新增菜单</Button>
</template>
