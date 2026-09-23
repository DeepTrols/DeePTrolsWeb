<script lang="ts" setup>
import type { FooterMenu, MenuKey, NavItem } from '#/api/menus';

import { onMounted, ref } from 'vue';

import { Button, message, Spin, TabPane, Tabs, Tag } from 'ant-design-vue';

import { getMenuApi, saveMenuApi } from '#/api/menus';

import FooterMenuEditor from './components/FooterMenuEditor.vue';
import HeaderMenuEditor from './components/HeaderMenuEditor.vue';

defineOptions({ name: 'MenuEditor' });

const activeKey = ref<MenuKey>('header');
const loading = ref(false);
const saving = ref(false);
const updatedAt = ref<null | string>(null);
const source = ref<'db' | 'static'>('static');

const headerItems = ref<NavItem[]>([]);
const footerMenu = ref<FooterMenu>({ columns: [], socials: [] });
const loaded = new Set<MenuKey>();

async function load(key: MenuKey) {
  loading.value = true;
  try {
    const payload = await getMenuApi(key);
    if (key === 'header') {
      headerItems.value = payload.items as NavItem[];
    } else {
      footerMenu.value = payload.items as FooterMenu;
    }
    updatedAt.value = payload.updatedAt;
    source.value = payload.source;
    loaded.add(key);
  } finally {
    loading.value = false;
  }
}

function handleTabChange(key: number | string) {
  const menuKey = key as MenuKey;
  activeKey.value = menuKey;
  if (!loaded.has(menuKey)) {
    load(menuKey);
  }
}

async function save() {
  const key = activeKey.value;
  saving.value = true;
  try {
    await saveMenuApi(
      key,
      key === 'header' ? headerItems.value : footerMenu.value,
    );
    message.success('已保存，前台菜单即时生效');
    await load(key);
  } catch {
    message.error('保存失败：请检查必填项与图标名');
  } finally {
    saving.value = false;
  }
}

onMounted(() => load('header'));
</script>

<template>
  <div class="p-4">
    <div class="mb-3 flex items-center gap-3">
      <Button type="primary" :loading="saving" @click="save">保存</Button>
      <Tag :color="source === 'db' ? 'green' : 'orange'">
        {{ source === 'db' ? '数据库' : '静态快照（保存后入库）' }}
      </Tag>
      <span v-if="updatedAt" class="text-xs text-gray-400">
        更新于 {{ new Date(updatedAt).toLocaleString() }}
      </span>
    </div>
    <Spin :spinning="loading">
      <Tabs :active-key="activeKey" @change="handleTabChange">
        <TabPane key="header" tab="主导航（header）">
          <HeaderMenuEditor v-model:items="headerItems" />
        </TabPane>
        <TabPane key="footer" tab="页脚（footer）">
          <FooterMenuEditor v-model:menu="footerMenu" />
        </TabPane>
      </Tabs>
    </Spin>
  </div>
</template>
