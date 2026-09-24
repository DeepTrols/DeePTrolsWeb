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
  RadioGroup,
  Select,
  Textarea,
} from 'ant-design-vue';

import { getComponentsApi } from '#/api/components';
import { createPageApi, getAdminPageApi, updatePageApi } from '#/api/pages';

import {
  parseJsonField,
  statusOptions,
  toJsonText,
} from '../content/shared/options';
import SectionsEditor from './components/SectionsEditor.vue';
import {
  createSection,
  customSectionOptions,
  sectionTypeOptions,
} from './sections';

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
// 结构化 / JSON 高级双模式：切结构化时先解析 JSON 草稿，失败则留在 JSON 模式
const sectionMode = ref<'json' | 'structured'>('structured');

// 组件管理（015.12）：新增区块下拉按启停过滤；拉取失败回退全量（不影响已编辑内容）
const disabledComponents = ref<string[]>([]);
const enabledSectionTypeOptions = computed(() =>
  sectionTypeOptions.filter(
    (option) => !disabledComponents.value.includes(option.value),
  ),
);
const enabledCustomSectionOptions = computed(() =>
  customSectionOptions.filter(
    (option) => !disabledComponents.value.includes(option.value),
  ),
);

const sectionsPlaceholder =
  '[{"type":"richText","blocks":[{"type":"paragraph","text":"正文"}]}]';

function handleModeChange() {
  if (sectionMode.value === 'json') {
    sectionsText.value = toJsonText(form.sections);
    return;
  }
  const parsed = parseJsonField(sectionsText.value) as null | PageSection[];
  if (!parsed) {
    message.error('JSON 草稿无法解析，已留在 JSON 模式');
    sectionMode.value = 'json';
    return;
  }
  form.sections = parsed;
}

onMounted(async () => {
  try {
    const payload = await getComponentsApi();
    disabledComponents.value = payload.disabled;
  } catch {
    // 拉取失败回退全量组件
  }
  if (!isEdit.value) {
    form.sections = [createSection('richText')];
    sectionsText.value = toJsonText(form.sections);
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
  const sections =
    sectionMode.value === 'json'
      ? (parseJsonField(sectionsText.value) as null | PageSection[])
      : form.sections;
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
        <RadioGroup
          v-model:value="sectionMode"
          class="mb-2"
          option-type="button"
          :options="[
            { label: '结构化', value: 'structured' },
            { label: 'JSON', value: 'json' },
          ]"
          @change="handleModeChange"
        />
        <SectionsEditor
          v-if="sectionMode === 'structured'"
          v-model:sections="form.sections"
          :custom-section-options="enabledCustomSectionOptions"
          :section-type-options="enabledSectionTypeOptions"
        />
        <Textarea
          v-else
          v-model:value="sectionsText"
          class="font-mono"
          :placeholder="sectionsPlaceholder"
          :rows="14"
        />
        <div class="mt-1 text-xs text-gray-400">
          支持 hero / metrics / featureGrid / cta / richText / logoStrip /
          imageBanner / custom 区块；服务端 zod 兜底校验
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
