<script lang="ts" setup>
import type { NewsInput } from '#/api/content';

import { computed, onActivated, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Button,
  Form,
  FormItem,
  Input,
  message,
  Select,
  Switch,
  Textarea,
} from 'ant-design-vue';

import { createNewsApi, getAdminNewsApi, updateNewsApi } from '#/api/content';

import BlocksEditor from '../shared/BlocksEditor.vue';
import ImageField from '../shared/ImageField.vue';
import { newsCategoryOptions, statusOptions } from '../shared/options';

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
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  status: 'draft',
  summary: '',
  title: '',
});
const blocksValue = ref<null | unknown[]>(null);

async function loadRecord() {
  if (!isEdit.value) {
    return;
  }
  const id = newsId.value;
  if (id === null) {
    return;
  }
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    const payload = await getAdminNewsApi(id);
    Object.assign(form, {
      category: payload.category,
      coverImage: payload.coverImage,
      featured: payload.featured,
      publishedAt: payload.publishedAt,
      status: payload.status,
      summary: payload.summary,
      title: payload.title,
    });
    blocksValue.value = payload.blocks;
  } finally {
    loading.value = false;
  }
}

onMounted(loadRecord);

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
  const payload: NewsInput = {
    ...form,
    blocks: blocksValue.value,
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
      <FormItem label="推荐到首页">
        <Switch v-model:checked="form.featured" />
        <span class="ml-2 text-xs text-gray-400">
          推荐且已发布的新闻优先进入首页「创新、洞察与新闻」（最多 4 条）
        </span>
      </FormItem>
      <FormItem label="正文" required>
        <BlocksEditor v-model:blocks="blocksValue" />
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
