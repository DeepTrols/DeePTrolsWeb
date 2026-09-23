<script lang="ts" setup>
import type { FooterColumn, FooterLink, FooterMenu } from '#/api/menus';

import { Button, Input, Switch, Textarea } from 'ant-design-vue';

import { del, moveItem as mv } from '../shared';

const menu = defineModel<FooterMenu>('menu', { required: true });

function addColumn() {
  menu.value.columns.push({ groups: [[]], title: '新栏目' });
}

function addGroup(column: FooterColumn) {
  column.groups.push([]);
}

function addLink(group: FooterLink[]) {
  group.push({ href: '/', label: '新链接' });
}

function addSocial() {
  menu.value.socials.push({ label: '新社交', path: '' });
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="(column, ci) in menu.columns"
      :key="ci"
      class="rounded border border-solid border-gray-300 p-3"
    >
      <div class="flex flex-wrap items-center gap-2">
        <Input
          v-model:value="column.title"
          class="w-52"
          placeholder="栏目标题"
        />
        <Button size="small" @click="mv(menu.columns, ci, -1)">上移</Button>
        <Button size="small" @click="mv(menu.columns, ci, 1)">下移</Button>
        <Button danger size="small" @click="del(menu.columns, ci)">删除</Button>
      </div>

      <div
        v-for="(group, gi) in column.groups"
        :key="gi"
        class="mt-2 rounded border border-dashed border-gray-200 p-2"
      >
        <div class="mb-1 flex items-center gap-2">
          <span class="text-xs text-gray-500">组 {{ gi + 1 }}</span>
          <Button size="small" @click="mv(column.groups, gi, -1)">上移</Button>
          <Button size="small" @click="mv(column.groups, gi, 1)">下移</Button>
          <Button danger @click="del(column.groups, gi)">删除</Button>
        </div>
        <div
          v-for="(link, li) in group"
          :key="li"
          class="mb-1 flex flex-wrap items-center gap-2"
        >
          <Input v-model:value="link.label" class="w-40" placeholder="名称" />
          <Input v-model:value="link.href" class="w-56" placeholder="/path" />
          <span class="flex items-center gap-1 text-xs text-gray-500">
            外链箭头
            <Switch v-model:checked="link.arrow" size="small" />
          </span>
          <Button size="small" @click="mv(group, li, -1)">上移</Button>
          <Button size="small" @click="mv(group, li, 1)">下移</Button>
          <Button danger size="small" @click="del(group, li)">删除</Button>
        </div>
        <Button block type="dashed" @click="addLink(group)">新增链接</Button>
      </div>
      <Button block type="dashed" @click="addGroup(column)">新增组</Button>
    </div>
    <Button block type="dashed" @click="addColumn">新增栏目</Button>

    <div class="rounded border border-solid border-gray-300 p-3">
      <div class="mb-2 text-xs font-semibold text-gray-500">
        社交媒体（socials）
      </div>
      <div
        v-for="(social, si) in menu.socials"
        :key="si"
        class="mb-2 rounded border border-dashed border-gray-200 p-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <Input v-model:value="social.label" class="w-40" placeholder="名称" />
          <Input
            v-model:value="social.href"
            class="w-64"
            placeholder="链接（留空为纯图标按钮）"
          />
          <Button size="small" @click="mv(menu.socials, si, -1)">上移</Button>
          <Button size="small" @click="mv(menu.socials, si, 1)">下移</Button>
          <Button danger @click="del(menu.socials, si)">删除</Button>
        </div>
        <Textarea
          v-model:value="social.path"
          class="mt-2"
          placeholder="SVG path（d 属性）"
          :rows="2"
        />
      </div>
      <Button block type="dashed" @click="addSocial">新增社交</Button>
    </div>
  </div>
</template>
