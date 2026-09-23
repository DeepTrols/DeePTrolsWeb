<script lang="ts" setup>
import type { NavLink } from '#/api/menus';

import { Button, Input, Select, Switch } from 'ant-design-vue';

import { NAV_ICON_OPTIONS } from '#/api/menus';

import { moveItem as mv } from '../shared';
import PathsInput from './PathsInput.vue';

const links = defineModel<NavLink[]>('links', { required: true });

function addLink() {
  links.value.push({ href: '/', label: '新链接' });
}

function removeLink(i: number) {
  links.value.splice(i, 1);
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(link, i) in links"
      :key="i"
      class="rounded border border-solid border-gray-200 p-2"
    >
      <div class="flex flex-wrap items-center gap-2">
        <Input v-model:value="link.label" class="w-40" placeholder="名称" />
        <Input v-model:value="link.href" class="w-56" placeholder="/path" />
        <Select
          v-model:value="link.icon"
          allow-clear
          class="w-44"
          :options="NAV_ICON_OPTIONS"
          placeholder="图标（可选）"
        />
        <span class="flex items-center gap-1 text-xs text-gray-500">
          hot
          <Switch v-model:checked="link.hot" size="small" />
        </span>
        <Button size="small" @click="mv(links, i, -1)">上移</Button>
        <Button size="small" @click="mv(links, i, 1)">下移</Button>
        <Button danger size="small" @click="removeLink(i)">删除</Button>
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <Input
          v-model:value="link.description"
          class="w-72"
          placeholder="描述（可选）"
        />
        <PathsInput v-model:value="link.activePaths" class="w-96" />
      </div>
    </div>
    <Button block type="dashed" @click="addLink">新增链接</Button>
  </div>
</template>
