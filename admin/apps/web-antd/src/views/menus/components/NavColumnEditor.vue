<script lang="ts" setup>
import type { NavColumn, NavLink } from '#/api/menus';

import { Button, Input } from 'ant-design-vue';

import { del, moveItem as mv } from '../shared';
import NavLinkList from './NavLinkList.vue';
import PathsInput from './PathsInput.vue';

defineOptions({ name: 'NavColumnEditor' });

withDefaults(defineProps<{ allowGroups?: boolean; columns: NavColumn[] }>(), {
  allowGroups: true,
});

function addColumn(columns: NavColumn[]) {
  columns.push({ links: [], title: '新分组' });
}

function ensureLinks(column: NavColumn): NavLink[] {
  column.links ??= [];
  return column.links;
}

function ensureGroups(column: NavColumn): NavColumn[] {
  column.groups ??= [];
  return column.groups;
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(column, i) in columns"
      :key="i"
      class="rounded border border-solid border-gray-300 p-3"
    >
      <div class="flex flex-wrap items-center gap-2">
        <Input
          v-model:value="column.title"
          class="w-52"
          placeholder="分组标题"
        />
        <Input
          v-model:value="column.href"
          class="w-56"
          placeholder="标题链接（可选）"
        />
        <Button size="small" @click="mv(columns, i, -1)">上移</Button>
        <Button size="small" @click="mv(columns, i, 1)">下移</Button>
        <Button danger size="small" @click="del(columns, i)">删除</Button>
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <Input
          v-model:value="column.subtitle"
          class="w-52"
          placeholder="副标题（可选）"
        />
        <Input
          v-model:value="column.description"
          class="w-72"
          placeholder="描述（可选）"
        />
        <PathsInput v-model:value="column.activePaths" class="w-96" />
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <Input
          v-model:value="column.footerLabel"
          class="w-52"
          placeholder="底部文案（可选）"
        />
        <Input
          v-model:value="column.footerHref"
          class="w-56"
          placeholder="底部链接（可选）"
        />
      </div>

      <div class="mt-3">
        <div class="mb-1 text-xs font-semibold text-gray-500">链接</div>
        <NavLinkList :links="ensureLinks(column)" />
      </div>

      <div v-if="allowGroups" class="mt-3">
        <div class="mb-1 text-xs font-semibold text-gray-500">
          子分组（groups）
        </div>
        <NavColumnEditor
          :allow-groups="false"
          :columns="ensureGroups(column)"
        />
      </div>
    </div>
    <Button block type="dashed" @click="addColumn(columns)">新增分组</Button>
  </div>
</template>
