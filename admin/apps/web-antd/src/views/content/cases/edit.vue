<script lang="ts" setup>
import type { CaseInput, SolutionKey } from '#/api/content';

import { computed, onActivated, onMounted, reactive, ref } from 'vue';
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

import { createCaseApi, getAdminCaseApi, updateCaseApi } from '#/api/content';

import BlocksEditor from '../shared/BlocksEditor.vue';
import ImageField from '../shared/ImageField.vue';
import {
  parseJsonField,
  solutionKeyOptions,
  statusOptions,
  toJsonText,
  useCategoryOptions,
} from '../shared/options';

defineOptions({ name: 'ContentCaseEdit' });

// 015.16：行业分类 options 动态化（分类管理维护），失败回退静态 solutionKeyOptions
const industryOptions = useCategoryOptions('solution', solutionKeyOptions);

const route = useRoute();
const router = useRouter();
const caseSlug = computed(() => {
  const raw = route.params.slug;
  return typeof raw === 'string' && raw ? raw : null;
});
const isEdit = computed(() => caseSlug.value !== null);

const loading = ref(false);
const saving = ref(false);

const form = reactive<
  Omit<CaseInput, 'solutionKey'> & { solutionKey?: SolutionKey }
>({
  blocks: [],
  categoryKey: 'data-infrastructure',
  detailTitle: '',
  featured: false,
  heroImage: '',
  image: '',
  relatedProducts: [],
  slug: '',
  solutionKey: undefined,
  sortOrder: 0,
  status: 'draft',
  summary: '',
  title: '',
});
const blocksValue = ref<null | unknown[]>(null);
const relatedProductsText = ref('');
const relatedProductsPlaceholder =
  '[{"name":"DGP","desc":"...","href":"/products/dgp"}]';

async function loadRecord() {
  if (!isEdit.value) {
    return;
  }
  const slug = caseSlug.value;
  if (slug === null) {
    return;
  }
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminCaseApi(slug);
    Object.assign(form, payload);
    blocksValue.value = payload.blocks;
    relatedProductsText.value = toJsonText(payload.relatedProducts);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (!isEdit.value) {
    relatedProductsText.value = '[]';
    return;
  }
  await loadRecord();
});

// keep-alive 页签再次激活时重取最新记录，避免保存时用旧数据静默覆盖他人修改；
// 首次激活紧随 onMounted 触发，跳过以免双重拉取
let activatedOnce = false;
onActivated(() => {
  if (activatedOnce) {
    void loadRecord();
  } else {
    activatedOnce = true;
  }
});

async function save(publish = false) {
  if (blocksValue.value === null) {
    message.error('正文为空或包含不支持的元素，请检查编辑器内容');
    return;
  }
  const relatedProducts = parseJsonField(relatedProductsText.value);
  if (!relatedProducts) {
    message.error('相关产品 JSON 格式错误（须为数组，可为空 []）');
    return;
  }
  const payload = {
    ...form,
    blocks: blocksValue.value,
    relatedProducts,
    solutionKey: form.solutionKey ?? null,
    status: publish ? ('published' as const) : form.status,
  };
  saving.value = true;
  try {
    if (isEdit.value) {
      const { slug, ...rest } = payload;
      await updateCaseApi(slug, rest);
    } else {
      await createCaseApi(payload);
    }
    message.success(publish ? '已发布' : '已保存');
    router.push('/content/cases');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="p-4">
    <Form :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
      <FormItem label="Slug" required>
        <Input
          v-model:value="form.slug"
          :disabled="isEdit"
          placeholder="acme-smart-factory（小写字母/数字/连字符，创建后不可改）"
        />
      </FormItem>
      <FormItem label="列表标题" required>
        <Input
          v-model:value="form.title"
          :maxlength="500"
          placeholder="案例卡片标题"
        />
      </FormItem>
      <FormItem label="列表摘要" required>
        <Textarea v-model:value="form.summary" :rows="3" />
      </FormItem>
      <FormItem label="列表封面" required>
        <ImageField v-model:value="form.image" />
      </FormItem>
      <FormItem label="方案分类">
        <Select
          v-model:value="form.solutionKey"
          allow-clear
          :options="industryOptions"
          style="max-width: 240px"
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
      <FormItem label="详情标题" required>
        <Input
          v-model:value="form.detailTitle"
          :maxlength="500"
          placeholder="详情页 H1"
        />
      </FormItem>
      <FormItem label="详情分类" required>
        <Select
          v-model:value="form.categoryKey"
          :options="industryOptions"
          style="max-width: 240px"
        />
      </FormItem>
      <FormItem label="详情头图" required>
        <ImageField v-model:value="form.heroImage" />
      </FormItem>
      <FormItem label="正文" required>
        <BlocksEditor v-model:blocks="blocksValue" />
      </FormItem>
      <FormItem label="相关产品">
        <Textarea
          v-model:value="relatedProductsText"
          class="font-mono"
          :rows="5"
          :placeholder="relatedProductsPlaceholder"
        />
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
        <Button @click="router.push('/content/cases')">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
