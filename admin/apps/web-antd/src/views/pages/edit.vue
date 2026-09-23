<script lang="ts" setup>
import type { PageInput, PageSection } from '#/api/pages';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  message,
  Select,
  Textarea,
} from 'ant-design-vue';

import { createPageApi, getAdminPageApi, updatePageApi } from '#/api/pages';

import {
  parseJsonField,
  statusOptions,
  toJsonText,
} from '../content/shared/options';

defineOptions({ name: 'PageEdit' });

const route = useRoute();
const router = useRouter();
// slug 含斜杠（/solutions/x），走 query 传参避免路径参数编码问题
const pageSlug = computed(() => {
  const raw = route.query.slug;
  return typeof raw === 'string' && raw ? raw : null;
});
const isEdit = computed(() => pageSlug.value !== null);

const loading = ref(false);
const saving = ref(false);

const form = reactive<PageInput>({
  sections: [],
  seoDescription: '',
  slug: '',
  sortOrder: 0,
  status: 'draft',
  title: '',
});
const sectionsText = ref('');

const sectionsPlaceholder =
  '[{"type":"richText","blocks":[{"type":"paragraph","text":"正文"}]}]';

onMounted(async () => {
  if (!isEdit.value) {
    sectionsText.value = toJsonText([
      {
        blocks: [{ text: '在此填写正文段落', type: 'paragraph' }],
        type: 'richText',
      },
    ]);
    return;
  }
  const slug = pageSlug.value;
  if (slug === null) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminPageApi(slug);
    Object.assign(form, payload);
    sectionsText.value = toJsonText(payload.sections);
  } finally {
    loading.value = false;
  }
});

async function save(publish = false) {
  const sections = parseJsonField(sectionsText.value) as null | PageSection[];
  if (!sections) {
    message.error('区块 sections JSON 格式错误（须为数组，可为空 []）');
    return;
  }
  const payload = {
    ...form,
    sections,
    status: publish ? ('published' as const) : form.status,
  };
  saving.value = true;
  try {
    if (isEdit.value) {
      const slug = pageSlug.value;
      if (slug === null) {
        return;
      }
      await updatePageApi(slug, {
        sections,
        seoDescription: form.seoDescription,
        sortOrder: form.sortOrder,
        status: payload.status,
        title: form.title,
      });
    } else {
      await createPageApi(payload);
    }
    message.success(publish ? '已发布' : '已保存');
    router.push('/pages');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="p-4">
    <Form :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
      <FormItem label="页面路径" required>
        <Input
          v-model:value="form.slug"
          :disabled="isEdit"
          placeholder="/solutions/smart-retail（含前导斜杠，创建后不可改）"
        />
        <div class="mt-1 text-xs text-gray-400">
          小写字母/数字/连字符；代码路由与 /api /admin /cases /demo /news
          /uploads 前缀为保留路径
        </div>
      </FormItem>
      <FormItem label="页面标题" required>
        <Input
          v-model:value="form.title"
          :maxlength="500"
          placeholder="页面 H1 与浏览器标题"
        />
      </FormItem>
      <FormItem label="SEO 描述">
        <Textarea
          v-model:value="form.seoDescription"
          :maxlength="500"
          :rows="2"
        />
      </FormItem>
      <FormItem label="排序" required>
        <InputNumber v-model:value="form.sortOrder" :min="0" />
      </FormItem>
      <FormItem label="状态">
        <Select
          v-model:value="form.status"
          :options="statusOptions"
          style="max-width: 200px"
        />
      </FormItem>
      <FormItem label="区块 sections">
        <Textarea
          v-model:value="sectionsText"
          class="font-mono"
          :placeholder="sectionsPlaceholder"
          :rows="14"
        />
        <div class="mt-1 text-xs text-gray-400">
          Phase C 仅支持 richText 区块：blocks 为 ArticleBlock[] JSON（heading /
          paragraph / list / quote / image / divider）
        </div>
      </FormItem>
      <FormItem :wrapper-col="{ offset: 3, span: 16 }">
        <Button
          :loading="saving"
          class="mr-2"
          type="primary"
          @click="save(false)"
        >
          保存
        </Button>
        <Button :loading="saving" class="mr-2" @click="save(true)">
          保存并发布
        </Button>
        <Button @click="router.push('/pages')">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
