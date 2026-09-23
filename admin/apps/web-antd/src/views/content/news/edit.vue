<script lang="ts" setup>
import type { NewsInput } from '#/api/content';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Button,
  Form,
  FormItem,
  Input,
  message,
  Select,
  Textarea,
} from 'ant-design-vue';

import { createNewsApi, getAdminNewsApi, updateNewsApi } from '#/api/content';

import ImageField from '../shared/ImageField.vue';
import {
  newsCategoryOptions,
  parseJsonField,
  statusOptions,
  toJsonText,
} from '../shared/options';

defineOptions({ name: 'ContentNewsEdit' });

const route = useRoute();
const router = useRouter();
const newsId = computed(() => {
  const raw = Number(route.params.id);
  return Number.isInteger(raw) && raw > 0 ? raw : null;
});
const isEdit = computed(() => newsId.value !== null);

const loading = ref(false);
const saving = ref(false);

const form = reactive<NewsInput>({
  blocks: [],
  category: 'company',
  coverImage: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  status: 'draft',
  summary: '',
  title: '',
});
const blocksText = ref('');
const blocksPlaceholder = '[{"type":"paragraph","text":"..."}]';

onMounted(async () => {
  if (!isEdit.value) {
    blocksText.value = toJsonText([
      { text: '在此填写正文段落', type: 'paragraph' },
    ]);
    return;
  }
  const id = newsId.value;
  if (id === null) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminNewsApi(id);
    Object.assign(form, {
      category: payload.category,
      coverImage: payload.coverImage,
      publishedAt: payload.publishedAt,
      status: payload.status,
      summary: payload.summary,
      title: payload.title,
    });
    blocksText.value = toJsonText(payload.blocks);
  } finally {
    loading.value = false;
  }
});

async function save(publish = false) {
  const blocks = parseJsonField(blocksText.value);
  if (!blocks || blocks.length === 0) {
    message.error('正文 blocks JSON 格式错误（须为非空数组）');
    return;
  }
  const payload: NewsInput = {
    ...form,
    blocks,
    status: publish ? 'published' : form.status,
  };
  saving.value = true;
  try {
    const id = newsId.value;
    await (id === null ? createNewsApi(payload) : updateNewsApi(id, payload));
    message.success(publish ? '已发布' : '已保存');
    router.push('/content/news');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div v-loading="loading" class="p-4">
    <Form :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
      <FormItem label="标题" required>
        <Input
          v-model:value="form.title"
          :maxlength="500"
          placeholder="新闻标题"
        />
      </FormItem>
      <FormItem label="摘要" required>
        <Textarea
          v-model:value="form.summary"
          :rows="3"
          placeholder="列表页展示的摘要"
        />
      </FormItem>
      <FormItem label="封面图" required>
        <ImageField v-model:value="form.coverImage" />
      </FormItem>
      <FormItem label="分类" required>
        <Select v-model:value="form.category" :options="newsCategoryOptions" />
      </FormItem>
      <FormItem label="发布日期" required>
        <Input
          v-model:value="form.publishedAt"
          placeholder="YYYY-MM-DD"
          style="max-width: 200px"
        />
      </FormItem>
      <FormItem label="状态">
        <Select
          v-model:value="form.status"
          :options="statusOptions"
          style="max-width: 200px"
        />
      </FormItem>
      <FormItem label="正文 blocks" required>
        <Textarea
          v-model:value="blocksText"
          class="font-mono"
          :rows="16"
          :placeholder="blocksPlaceholder"
        />
        <div class="mt-1 text-xs text-gray-400">
          ArticleBlock[] JSON：heading / paragraph / list / quote / image /
          divider，保存时服务端做判别联合校验
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
        <Button @click="router.push('/content/news')">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>
